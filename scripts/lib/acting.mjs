// Story acting. The voice model reads every sentence in one even tone, so a
// story sentence is recorded in short pieces instead, each with a mood, and
// the pieces are shaped and joined:
//
//   say: [['Oh no!', 'worried'], ['Where is the dog?', 'asking'], ['The dog is hiding!', 'surprised']]
//
// A mood is how fast the piece is spoken, how high the voice is, how loud it
// is and how long the pause after it lasts. Turn these numbers up or down to
// change how a mood sounds, then run `npm run voice`.
//   speed  1 = the model's normal pace (the rest of the app uses 0.9)
//   pitch  1 = the voice as it is; 1.1 is a little higher, 0.9 a little lower
//   gap    seconds of silence after the piece
//   gain   loudness (1 = unchanged)
//   voice  another speaker (optional)
export const MOODS = {
  // The storyteller.
  calm: { speed: 0.9, pitch: 1, gap: 0.3 },
  happy: { speed: 0.95, pitch: 1.05, gap: 0.28 },
  excited: { speed: 1.03, pitch: 1.09, gap: 0.25 },
  surprised: { speed: 0.98, pitch: 1.11, gap: 0.32 },
  worried: { speed: 0.92, pitch: 1.1, gap: 0.55 },
  asking: { speed: 0.88, pitch: 1.05, gap: 0.45 },
  soft: { speed: 0.74, pitch: 0.95, gap: 0.55, gain: 0.78 },
  big: { speed: 0.8, pitch: 0.93, gap: 0.4, gain: 1.15 },
  // Characters: funny voices are the point here, so the pitch moves more.
  // (Checked with speech recognition: much beyond these the words blur.)
  bobo: { speed: 0.95, pitch: 1.14, gap: 0.3 },
  tiny: { speed: 1, pitch: 1.2, gap: 0.35 },
  funny: { speed: 1.08, pitch: 1.42, gap: 0.35 },
  low: { speed: 0.84, pitch: 0.87, gap: 0.35, gain: 1.15 },
}

/** Raise or lower the voice by playing the samples faster or slower. */
function repitch(samples, pitch) {
  if (pitch === 1) return samples
  const out = new Float32Array(Math.floor(samples.length / pitch))
  for (let i = 0; i < out.length; i++) {
    const at = i * pitch
    const a = Math.floor(at)
    const b = Math.min(samples.length - 1, a + 1)
    out[i] = samples[a] + (samples[b] - samples[a]) * (at - a)
  }
  return out
}

// A few milliseconds of fade at both ends, so joined pieces never click.
function fadeEdges(samples, rate) {
  const n = Math.min(Math.round(rate * 0.008), samples.length >> 1)
  for (let i = 0; i < n; i++) {
    samples[i] *= i / n
    samples[samples.length - 1 - i] *= i / n
  }
  return samples
}

/**
 * Record one acted sentence. `speakPiece(text, { voice, speed })` must return
 * trimmed samples from the voice model.
 * @returns {Promise<Float32Array>} the whole sentence, pieces joined by pauses
 */
export async function act(say, { speakPiece, rate, voice }) {
  const parts = []
  for (const [i, [text, moodName = 'calm']] of say.entries()) {
    const mood = MOODS[moodName]
    if (!mood) throw new Error(`Unknown mood "${moodName}" for "${text}"`)
    const pitch = mood.pitch ?? 1
    // Playing faster to raise the pitch also shortens the piece, so it is
    // spoken that much slower to begin with.
    const raw = await speakPiece(text, { voice: mood.voice || voice, speed: mood.speed / pitch })
    const shaped = fadeEdges(repitch(raw, pitch), rate)
    const gain = mood.gain ?? 1
    if (gain !== 1) for (let j = 0; j < shaped.length; j++) shaped[j] = Math.max(-1, Math.min(1, shaped[j] * gain))
    parts.push(shaped)
    if (i < say.length - 1) parts.push(new Float32Array(Math.round(rate * mood.gap)))
  }
  const whole = new Float32Array(parts.reduce((n, p) => n + p.length, 0))
  let at = 0
  for (const p of parts) {
    whole.set(p, at)
    at += p.length
  }
  return whole
}

/** A short fingerprint of how a sentence is acted, so a changed mood re-records it. */
export function recipe(say) {
  return JSON.stringify(say.map(([text, mood = 'calm']) => [text, MOODS[mood]]))
}
