// Records every line Bobo says with a natural neural voice (Kokoro, Apache-2.0,
// runs locally — nothing is sent to an online service).
//
//   npm run voice                 record new or changed lines
//   npm run voice -- --force      re-record everything
//   npm run voice -- --voice=af_bella --speed=0.9
//   npm run voice -- --list        just print the lines
//
// Output: public/audio/voice/*.mp3 and src/data/voice-manifest.json.
// The first run downloads the voice model (~90 MB) and caches it.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { KokoroTTS } from 'kokoro-js'
import { toMp3, trimSilence } from './lib/audio-file.mjs'
import { worlds } from '../src/data/worlds.js'
import { PRAISE, SCRIPT, voiceKey } from '../src/data/script.js'
import { stories } from '../src/data/stories.js'
import { songs } from '../src/data/songs.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(root, 'public', 'audio', 'voice')
const MANIFEST = path.join(root, 'src', 'data', 'voice-manifest.json')

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  }),
)
const VOICE = args.voice || 'af_heart' // warm, friendly American English
const SPEED = Number(args.speed || 0.9) // a little slower than adult speech
const FORCE = Boolean(args.force)

// ---------------------------------------------------------------------------
// 1. Collect every line the app can say.
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
    for (const scene of [...story.scenes, story.ending]) add([scene.lines, scene.prompt, scene.reward])
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
  const hash = createHash('sha1').update(`${VOICE}|${SPEED}|${voiceKey(text)}`).digest('hex').slice(0, 8)
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

const manifest = { voice: VOICE, speed: SPEED, lines: {} }
const todo = []
for (const text of lines) {
  const file = `audio/voice/${fileNameFor(text)}`
  manifest.lines[voiceKey(text)] = file
  if (FORCE || !fs.existsSync(path.join(root, 'public', file))) todo.push({ text, file })
}

console.log(`${lines.length} lines, ${todo.length} to record with voice "${VOICE}" at speed ${SPEED}.`)

if (todo.length) {
  console.log('Loading voice model (first run downloads it)...')
  const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'cpu' })
  let done = 0
  for (const { text, file } of todo) {
    const audio = await tts.generate(text, { voice: VOICE, speed: SPEED })
    const trimmed = trimSilence(audio.audio, audio.sampling_rate)
    fs.writeFileSync(path.join(root, 'public', file), toMp3(trimmed, audio.sampling_rate))
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
