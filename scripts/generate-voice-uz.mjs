// Records the Uzbek helper lines with Microsoft's neural Uzbek voice through
// the official Azure Speech service.
//
//   npm run voice:uz                 record new or changed lines
//   npm run voice:uz -- --force      re-record everything
//   npm run voice:uz -- --voice=uz-UZ-SardorNeural   the male voice
//   npm run voice:uz -- --list       just print the lines
//
// It needs a Speech key. Put these two lines in a file called `.env.local`
// in the project folder (the file is ignored by git, so the key stays private):
//
//   AZURE_SPEECH_KEY=your-key
//   AZURE_SPEECH_REGION=westeurope
//
// Output: public/audio/uz/*.mp3 and src/data/voice-manifest-uz.json.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { UZ_LINES, UZ_WORDS } from '../src/data/uzbek.js'
import { stories } from '../src/data/stories.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(root, 'public', 'audio', 'uz')
const MANIFEST = path.join(root, 'src', 'data', 'voice-manifest-uz.json')

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  }),
)
const VOICE = args.voice || 'uz-UZ-MadinaNeural' // warm female voice
const RATE = args.rate || '-12%' // a little slower than adult speech
const FORCE = Boolean(args.force)

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

const lines = [
  ...new Set([
    ...Object.values(UZ_WORDS),
    ...Object.values(UZ_LINES),
    ...stories.flatMap((story) => [story.uz, ...story.beats.map((beat) => beat.uz)]).filter(Boolean),
  ]),
].filter(Boolean)

if (args.list) {
  lines.forEach((l) => console.log(l))
  process.exit(0)
}

function fileNameFor(text) {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
  const hash = createHash('sha1').update(`${VOICE}|${RATE}|${text}`).digest('hex').slice(0, 8)
  return `${slug || 'line'}-${hash}.mp3`
}

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

async function synthesize(text, { key, region }) {
  // The service expects the modern apostrophe-like letter in o‘ and g‘.
  const spoken = text.replace(/([og])'/gi, '$1‘')
  const ssml = `<speak version="1.0" xml:lang="uz-UZ"><voice name="${VOICE}"><prosody rate="${RATE}">${escapeXml(spoken)}</prosody></voice></speak>`
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
    const hint = response.status === 401 ? ' (check AZURE_SPEECH_KEY and AZURE_SPEECH_REGION)' : ''
    throw new Error(`Azure Speech answered ${response.status} ${response.statusText}${hint}`)
  }
  return Buffer.from(await response.arrayBuffer())
}

const manifest = { voice: VOICE, rate: RATE, lines: {} }
const todo = []
for (const text of lines) {
  const file = `audio/uz/${fileNameFor(text)}`
  manifest.lines[text] = file
  if (FORCE || !fs.existsSync(path.join(root, 'public', file))) todo.push({ text, file })
}

console.log(`${lines.length} Uzbek lines, ${todo.length} to record with "${VOICE}".`)

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
  for (const { text, file } of todo) {
    fs.writeFileSync(path.join(root, 'public', file), await synthesize(text, { key, region }))
    done++
    console.log(`[${done}/${todo.length}] ${text}`)
    await new Promise((resolve) => setTimeout(resolve, 150)) // stay well inside the free tier's rate limit
  }
}

// Remove recordings that no longer belong to any line.
fs.mkdirSync(OUT_DIR, { recursive: true })
const keep = new Set(Object.values(manifest.lines).map((f) => path.basename(f)))
for (const f of fs.readdirSync(OUT_DIR)) {
  if (f.endsWith('.mp3') && !keep.has(f)) fs.unlinkSync(path.join(OUT_DIR, f))
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Done. Manifest written (${Object.keys(manifest.lines).length} lines).`)
