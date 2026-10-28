// Records every line Bobo says. Bobo speaks with Ana, Microsoft's child voice,
// through the Azure Speech service (key in .env.local, see lib/azure.mjs): clear
// and crisp, and a child's voice suits a little mascot. The older local voice
// (Kokoro, runs offline) sounded muffled and is kept only as an option.
//
//   npm run voice                 record new or changed lines
//   npm run voice -- --force      re-record everything
//   npm run voice -- --voice=en-US-AnaNeural --rate=0% --pitch=0%
//   npm run voice -- --engine=kokoro --voice=af_heart --speed=0.9
//   npm run voice -- --list        just print the lines
//
// Output: public/audio/voice/*.mp3 and src/data/voice-manifest.json.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { toMp3, trimSilence } from './lib/audio-file.mjs'
import { act, recipe } from './lib/acting.mjs'
import { azureSpeak, readAzureKey } from './lib/azure.mjs'
import { worlds } from '../src/data/worlds.js'
import { PRAISE, SCRIPT, voiceKey } from '../src/data/script.js'
import { stories } from '../src/data/stories.js'
import { songs } from '../src/data/songs.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(root, 'public', 'audio', 'voice')
const MANIFEST = path.join(root, 'src', 'data', 'voice-manifest.json')

// Story sentences already recorded with the expressive online voice
// (`npm run voice:story`) are kept as they are.
const STORY_MANIFEST = path.join(root, 'src', 'data', 'voice-story.json')
const storyVoice = fs.existsSync(STORY_MANIFEST) ? JSON.parse(fs.readFileSync(STORY_MANIFEST, 'utf8')).lines : {}
const hasStoryVoice = (text) => {
  const file = storyVoice[voiceKey(text)]
  return Boolean(file) && fs.existsSync(path.join(root, 'public', file))
}

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  }),
)
const ENGINE = args.engine || 'azure'
const KOKORO = ENGINE === 'kokoro'
const VOICE = args.voice || (KOKORO ? 'af_heart' : 'en-US-AnaNeural')
const SPEED = Number(args.speed || 0.9) // Kokoro only: a little slower than adult speech
const RATE = args.rate || '0%' // Azure only
const PITCH = args.pitch || '0%'
const FORCE = Boolean(args.force)

// ---------------------------------------------------------------------------
// 1. Collect every line the app can say.
// Story sentences are acted (see lib/acting.mjs): line -> its pieces and moods.
const acted = new Map()

function collectLines() {
  const lines = new Set()
  const add = (x) => {
    if (!x) return
    if (Array.isArray(x)) x.forEach(add)
    else if (typeof x === 'object') Object.values(x).forEach(add)
    else if (typeof x === 'string') lines.add(x)
  }

  for (const [key, value] of Object.entries(SCRIPT)) {
    if (typeof value !== 'function') add(value)
    else if (key === 'comingSoon') worlds.filter((w) => !w.items).forEach((w) => add(value(w.name)))
    else if (key === 'starsEarned') for (let n = 1; n <= 12; n++) add(value(n))
  }
  add(PRAISE)

  for (const world of worlds) {
    add(`${world.name}!`)
    if (!world.items) continue
    add([world.intro, world.learnDone])
    for (const item of world.items) {
      add([SCRIPT.word(item), SCRIPT.canYouSay(item), item.phrase, item.prompt, item.thanks, item.sound])
      if (item.sound) add(SCRIPT.says(item))
    }
  }

  for (const story of stories) {
    add(SCRIPT.title(story))
    for (const beat of story.beats) {
      add(beat.line)
      if (beat.say) acted.set(beat.line, beat.say)
    }
  }
  for (const song of songs) {
    add(SCRIPT.title(song))
  }
  return [...lines]
}

// ---------------------------------------------------------------------------
// 2. File names.
function fileNameFor(text) {
  const slug = voiceKey(text)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
  const how = KOKORO ? (acted.has(text) ? recipe(acted.get(text)) : SPEED) : `${RATE}|${PITCH}|trimmed`
  const hash = createHash('sha1').update(`${VOICE}|${how}|${voiceKey(text)}`).digest('hex').slice(0, 8)
  return `${slug || 'line'}-${hash}.mp3`
}

// ---------------------------------------------------------------------------
// 3. Generate.
const lines = collectLines()
if (args.list) {
  lines.forEach((l) => console.log(l))
  process.exit(0)
}
fs.mkdirSync(OUT_DIR, { recursive: true })

const manifest = KOKORO ? { voice: VOICE, speed: SPEED, lines: {} } : { voice: VOICE, rate: RATE, pitch: PITCH, lines: {} }
const todo = []
for (const text of lines) {
  if (hasStoryVoice(text)) {
    manifest.lines[voiceKey(text)] = storyVoice[voiceKey(text)]
    continue
  }
  const file = `audio/voice/${fileNameFor(text)}`
  manifest.lines[voiceKey(text)] = file
  if (FORCE || !fs.existsSync(path.join(root, 'public', file))) todo.push({ text, file })
}

console.log(`${lines.length} lines, ${todo.length} to record with voice "${VOICE}".`)

if (todo.length && !KOKORO) {
  const azure = readAzureKey(root)
  let done = 0
  for (const { text, file } of todo) {
    fs.writeFileSync(path.join(root, 'public', file), await azureSpeak(text, { voice: VOICE, rate: RATE, pitch: PITCH, ...azure }))
    done++
    console.log(`[${done}/${todo.length}] ${text}`)
    await new Promise((resolve) => setTimeout(resolve, 150)) // stay inside the free tier's rate limit
  }
} else if (todo.length) {
  console.log('Loading voice model (first run downloads it)...')
  const { KokoroTTS } = await import('kokoro-js')
  const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'cpu' })
  let done = 0
  let rate = 24000
  const speakPiece = async (text, { voice = VOICE, speed = SPEED } = {}) => {
    const audio = await tts.generate(text, { voice, speed })
    rate = audio.sampling_rate
    return trimSilence(audio.audio, rate)
  }
  for (const { text, file } of todo) {
    const samples = acted.has(text) ? await act(acted.get(text), { speakPiece, rate, voice: VOICE }) : await speakPiece(text)
    fs.writeFileSync(path.join(root, 'public', file), toMp3(samples, rate))
    done++
    console.log(`[${done}/${todo.length}] ${text}`)
  }
}

// Remove recordings that no longer belong to any line.
const keep = new Set(Object.values(manifest.lines).map((f) => path.basename(f)))
for (const f of fs.readdirSync(OUT_DIR)) {
  if (f.endsWith('.mp3') && !keep.has(f)) fs.unlinkSync(path.join(OUT_DIR, f))
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Done. Manifest written (${Object.keys(manifest.lines).length} lines).`)
