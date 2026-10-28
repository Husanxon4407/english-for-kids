// Shared helper for recording with Microsoft's neural voices through the
// official Azure Speech service. The key comes from the environment or from
// .env.local (ignored by git):
//
//   AZURE_SPEECH_KEY=your-key
//   AZURE_SPEECH_REGION=westeurope
import fs from 'node:fs'
import path from 'node:path'

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
export async function azureSpeak(text, { voice, lang = 'en-US', rate = '0%', pitch = '0%', key, region }) {
  const ssml = `<speak version="1.0" xml:lang="${lang}"><voice name="${voice}"><prosody rate="${rate}" pitch="${pitch}">${escapeXml(text)}</prosody></voice></speak>`
  // The free tier answers 429 when asked too quickly: wait and try again.
  for (let attempt = 1; ; attempt++) {
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
    if (response.ok) return Buffer.from(await response.arrayBuffer())
    if (response.status !== 429 || attempt >= 8) {
      const hint = response.status === 401 ? ' (check AZURE_SPEECH_KEY and AZURE_SPEECH_REGION)' : ''
      throw new Error(`Azure Speech answered ${response.status} ${response.statusText}${hint}`)
    }
    await new Promise((resolve) => setTimeout(resolve, 2000 * attempt))
  }
}
