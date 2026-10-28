// Shared helper for recording with Microsoft's neural voices through the
// official Azure Speech service. The key comes from the environment or from
// .env.local (ignored by git):
//
//   AZURE_SPEECH_KEY=your-key
//   AZURE_SPEECH_REGION=westeurope
import fs from 'node:fs'
import path from 'node:path'
import { toMp3, trimSilence } from './audio-file.mjs'

const RATE = 24000

export function readAzureKey(root) {
  const env = { ...process.env }
  const file = path.join(root, '.env.local')
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/)
      if (match && !env[match[1]]) env[match[1]] = match[2].replace(/^["']|["']$/g, '')
    }
  }
  if (!env.AZURE_SPEECH_KEY || !env.AZURE_SPEECH_REGION) {
    console.error('\nNo Speech key found. Add AZURE_SPEECH_KEY and AZURE_SPEECH_REGION to .env.local.')
    process.exit(1)
  }
  return { key: env.AZURE_SPEECH_KEY, region: env.AZURE_SPEECH_REGION }
}

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** One line as an MP3, in `voice` at `rate` / `pitch` (like '+5%'). */
export function azureSpeak(text, { voice, lang = 'en-US', rate = '0%', pitch = '0%', key, region }) {
  const ssml = `<speak version="1.0" xml:lang="${lang}"><voice name="${voice}"><prosody rate="${rate}" pitch="${pitch}">${escapeXml(text)}</prosody></voice></speak>`
  return azureSsmlToMp3(ssml, { key, region })
}

/**
 * Speak an SSML document and return it as an MP3 with the silence around the
 * words trimmed. Azure pads short lines to almost two seconds; untrimmed, that
 * second of silence after every line made Bobo sound late. The trimming is
 * the same as for the local voice: a little air before and after the words.
 */
export async function azureSsmlToMp3(ssml, { key, region }) {
  const pcm = await requestPcm(ssml, { key, region })
  const samples = new Float32Array(pcm.length / 2)
  for (let i = 0; i < samples.length; i++) samples[i] = pcm.readInt16LE(i * 2) / 0x8000
  return toMp3(trimSilence(samples, RATE), RATE, 96)
}

async function requestPcm(ssml, { key, region }) {
  // The free tier answers 429 when asked too quickly, and a long run can lose
  // the connection now and then: wait and try again.
  for (let attempt = 1; ; attempt++) {
    let response
    try {
      response = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'raw-24khz-16bit-mono-pcm',
          'User-Agent': 'wordland-voice',
        },
        body: ssml,
      })
      if (response.ok) return Buffer.from(await response.arrayBuffer())
    } catch (error) {
      if (attempt >= 8) throw error
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt))
      continue
    }
    if (response.status !== 429 || attempt >= 8) {
      const hint = response.status === 401 ? ' (check AZURE_SPEECH_KEY and AZURE_SPEECH_REGION)' : ''
      throw new Error(`Azure Speech answered ${response.status} ${response.statusText}${hint}`)
    }
    await new Promise((resolve) => setTimeout(resolve, 2000 * attempt))
  }
}
