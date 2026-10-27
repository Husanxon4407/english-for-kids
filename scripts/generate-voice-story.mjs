// Records the stories with an expressive neural voice from the Azure Speech
// service, so the telling has real feeling: cheerful, excited, whispering...
//
//   npm run voice:story              record new or changed story sentences
//   npm run voice:story -- --force   re-record all of them
//   npm run voice:story -- --list    just print the sentences
//   npm run voice:story -- --voice=en-US-AriaNeural
//
// Needs a Speech key in .env.local (ignored by git):
//   AZURE_SPEECH_KEY=your-key
//   AZURE_SPEECH_REGION=westeurope
//
// Every story sentence is already split into pieces with a mood (`say` in
// src/data/stories.js). Here each mood becomes one of the voice's speaking
// styles. Output: public/audio/voice/story-*.mp3, listed in
// src/data/voice-story.json and in the main voice manifest. `npm run voice`
// keeps these recordings and does not record those sentences again.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { stories } from '../src/data/stories.js'
import { voiceKey } from '../src/data/script.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(root, 'public', 'audio', 'voice')
const STORY_MANIFEST = path.join(root, 'src', 'data', 'voice-story.json')
const MANIFEST = path.join(root, 'src', 'data', 'voice-manifest.json')

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  }),
)
const VOICE = args.voice || 'en-US-JennyNeural' // warm, with many speaking styles
const FORCE = Boolean(args.force)

// How each mood is spoken. `style` and `degree` (0.01 to 2, how strongly) are
// the voice's own acting; rate, pitch and volume shape it further; `gap` is
// the pause after the piece in milliseconds. Change a number, run the script
// again, and only the sentences that use that mood are re-recorded.
const STYLES = {
  // The storyteller.
  calm: { style: 'friendly', rate: '-10%', gap: 300 },
  happy: { style: 'cheerful', degree: 1.3, rate: '-6%', gap: 280 },
  excited: { style: 'excited', degree: 1.5, rate: '-2%', gap: 250 },
  surprised: { style: 'excited', degree: 1.8, rate: '-4%', pitch: '+6%', gap: 320 },
  worried: { style: 'sad', degree: 0.8, rate: '-12%', pitch: '+4%', gap: 500 },
  asking: { style: 'friendly', rate: '-10%', pitch: '+5%', gap: 450 },
  soft: { style: 'whispering', rate: '-22%', gap: 550 },
  big: { style: 'excited', degree: 1.2, rate: '-18%', pitch: '-8%', volume: '+15%', gap: 400 },
  // Characters: the same voice, clearly higher or lower.
  bobo: { style: 'cheerful', degree: 1.5, pitch: '+14%', gap: 300 },
  tiny: { style: 'cheerful', degree: 1.2, pitch: '+26%', gap: 350 },
  funny: { style: 'excited', degree: 1.6, rate: '+4%', pitch: '+36%', gap: 350 },
  low: { style: 'excited', degree: 1.2, rate: '-12%', pitch: '-18%', gap: 350 },
}

// Keys come from the environment or from .env.local — never from the code.
function readEnv() {
  const env = { ...process.env }
  const file = path.join(root, '.env.local')
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/)
      if (match && !env[match[1]]) env[match[1]] = match[2].replace(/^["']|["']$/g, '')
    }
  }
  return env
}

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function ssmlFor(say) {
  const pieces = say.map(([text, mood = 'calm'], i) => {
    const how = STYLES[mood]
    if (!how) throw new Error(`Unknown mood "${mood}" for "${text}"`)
    const prosody = ['rate', 'pitch', 'volume'].filter((k) => how[k]).map((k) => ` ${k}="${how[k]}"`).join('')
    const spoken = prosody ? `<prosody${prosody}>${escapeXml(text)}</prosody>` : escapeXml(text)
    const degree = how.degree ? ` styledegree="${how.degree}"` : ''
    const pause = i < say.length - 1 ? `<break time="${how.gap}ms"/>` : ''
    return `<mstts:express-as style="${how.style}"${degree}>${spoken}</mstts:express-as>${pause}`
  })
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US"><voice name="${VOICE}">${pieces.join('')}</voice></speak>`
}

async function synthesize(...args) {
  // The free tier answers 429 when asked too quickly: wait and try again.
  for (let attempt = 1; ; attempt++) {
    try {
      return await synthesizeOnce(...args)
    } catch (error) {
      if (!error.retry || attempt >= 8) throw error
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt))
    }
  }
}

async function synthesizeOnce(ssml, { key, region }) {
  const response = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-96kbitrate-mono-mp3',
      'User-Agent': 'wordland-voice',
    },
    body: ssml,
  })
  if (!response.ok) {
    if (response.status === 429) throw Object.assign(new Error('Azure Speech answered 429 Too Many Requests'), { retry: true })
    const hint = response.status === 401 ? ' (check AZURE_SPEECH_KEY and AZURE_SPEECH_REGION)' : ''
    throw new Error(`Azure Speech answered ${response.status} ${response.statusText}${hint}`)
  }
  return Buffer.from(await response.arrayBuffer())
}

const beats = stories.flatMap((story) => story.beats).filter((beat) => beat.say)
if (args.list) {
  beats.forEach((beat) => console.log(beat.line))
  process.exit(0)
}

function fileNameFor(beat) {
  const slug = voiceKey(beat.line)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 36)
  const hash = createHash('sha1').update(`${VOICE}|${ssmlFor(beat.say)}`).digest('hex').slice(0, 8)
  return `story-${slug}-${hash}.mp3`
}

const storyLines = {}
const todo = []
for (const beat of beats) {
  const file = `audio/voice/${fileNameFor(beat)}`
  storyLines[voiceKey(beat.line)] = file
  if (FORCE || !fs.existsSync(path.join(root, 'public', file))) todo.push({ beat, file })
}

console.log(`${beats.length} story sentences, ${todo.length} to record with "${VOICE}".`)

if (todo.length) {
  const env = readEnv()
  const key = env.AZURE_SPEECH_KEY
  const region = env.AZURE_SPEECH_REGION
  if (!key || !region) {
    console.error('\nNo Speech key found. Add AZURE_SPEECH_KEY and AZURE_SPEECH_REGION to .env.local (see the top of this file).')
    process.exit(1)
  }
  fs.mkdirSync(OUT_DIR, { recursive: true })
  let done = 0
  for (const { beat, file } of todo) {
    fs.writeFileSync(path.join(root, 'public', file), await synthesize(ssmlFor(beat.say), { key, region }))
    done++
    console.log(`[${done}/${todo.length}] ${beat.line}`)
    await new Promise((resolve) => setTimeout(resolve, 150)) // stay well inside the free tier's rate limit
  }
}

// Remove story recordings that no longer belong to any sentence. Only files
// this script made before are touched: "story-time-....mp3" is Bobo's own clip.
const keep = new Set(Object.values(storyLines))
const before = fs.existsSync(STORY_MANIFEST) ? Object.values(JSON.parse(fs.readFileSync(STORY_MANIFEST, 'utf8')).lines) : []
for (const file of before) {
  const full = path.join(root, 'public', file)
  if (!keep.has(file) && fs.existsSync(full)) fs.unlinkSync(full)
}

fs.writeFileSync(STORY_MANIFEST, JSON.stringify({ voice: VOICE, lines: storyLines }, null, 2) + '\n')

// Point the app at the new recordings straight away.
const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))
Object.assign(manifest.lines, storyLines)
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Done. ${Object.keys(storyLines).length} story sentences now use "${VOICE}".`)
