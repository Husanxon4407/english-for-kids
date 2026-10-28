// Shared helpers for the voice generators: trim silence, encode to MP3.
import { Mp3Encoder } from '@breezystack/lamejs'

export function trimSilence(samples, rate) {
  const threshold = 0.01
  let start = 0
  let end = samples.length - 1
  while (start < end && Math.abs(samples[start]) < threshold) start++
  while (end > start && Math.abs(samples[end]) < threshold) end--
  const before = Math.round(rate * 0.04)
  const after = Math.round(rate * 0.12)
  return samples.subarray(Math.max(0, start - before), Math.min(samples.length, end + after))
}

export function toMp3(samples, rate, kbps = 64) {
  const pcm = new Int16Array(samples.length)
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]))
    pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff
  }
  const encoder = new Mp3Encoder(1, rate, kbps)
  const chunks = []
  for (let i = 0; i < pcm.length; i += 1152) {
    const out = encoder.encodeBuffer(pcm.subarray(i, i + 1152))
    if (out.length) chunks.push(Buffer.from(out))
  }
  const end = encoder.flush()
  if (end.length) chunks.push(Buffer.from(end))
  return Buffer.concat(chunks)
}
