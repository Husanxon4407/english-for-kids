// Listening to a child say a word, for the Parrot game. It uses the browser's
// own speech recognition: on the device where the browser can (nothing is
// sent anywhere), otherwise the browser's online service (Google in Chrome,
// Apple in Safari) — but only if the grown-ups allow that.
//
// Children's voices are hard for these systems, so the check is kind: a word
// that is close enough counts (see `saidWord`).

const Recognition = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null
const LANG = 'en-US'

let onDevice = null // cached answer of `canListenOnDevice`

/** Whether this browser can recognise English speech without sending it away. */
export async function canListenOnDevice() {
  if (onDevice !== null) return onDevice
  onDevice = false
  try {
    if (Recognition?.available) {
      onDevice = (await Recognition.available({ langs: [LANG], processLocally: true })) === 'available'
    }
  } catch {
    onDevice = false
  }
  return onDevice
}

/**
 * How the Parrot game can hear the child: 'device' (recognised on the device),
 * 'online' (recognised by the browser's service), or null (no recognition:
 * the parrot just records and repeats).
 */
export async function listeningMode({ allowOnline }) {
  if (!Recognition) return null
  if (await canListenOnDevice()) return 'device'
  return allowOnline ? 'online' : null
}

/**
 * Listen for one short answer. Resolves { heard: [what it may have been], error }
 * where error is the browser's code ('not-allowed', 'no-speech', ...) or null.
 */
export function listenOnce({ mode, timeout = 6000 }) {
  return new Promise((resolve) => {
    const recognition = new Recognition()
    recognition.lang = LANG
    recognition.interimResults = false
    recognition.continuous = false
    recognition.maxAlternatives = 5
    if (mode === 'device') recognition.processLocally = true
    const heard = []
    let error = null
    recognition.onresult = (event) => {
      for (const result of event.results) for (const alternative of result) heard.push(alternative.transcript)
    }
    recognition.onerror = (event) => {
      error = event.error
    }
    recognition.onend = () => {
      clearTimeout(timer)
      resolve({ heard, error })
    }
    const timer = setTimeout(() => {
      try {
        recognition.stop()
      } catch {
        // already stopped
      }
    }, timeout)
    try {
      recognition.start()
    } catch {
      clearTimeout(timer)
      resolve({ heard, error: 'start-failed' })
    }
  })
}

// Words the recogniser often writes another way.
const SAME_AS = {
  one: ['1', 'won'],
  two: ['2', 'to', 'too'],
  three: ['3'],
  four: ['4', 'for', 'fore'],
  five: ['5'],
  six: ['6'],
  seven: ['7'],
  eight: ['8', 'ate'],
  nine: ['9'],
  ten: ['10'],
  pear: ['pair', 'pare'],
  bee: ['be', 'b'],
  sun: ['son'],
  eyes: ['ice', 'is'],
  shy: ['chai'],
}

const words = (text) => text.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean)

// Spell a word roughly the way it sounds, so "Kat" matches "cat" and
// "try sara tops" matches "triceratops".
const sound = (word) =>
  word
    .replace(/ph/g, 'f')
    .replace(/ck/g, 'k')
    .replace(/[cq]/g, 'k')
    .replace(/x/g, 'ks')
    .replace(/y/g, 'i')
    .replace(/z/g, 's')
    .replace(/(.)\1+/g, '$1')

function distance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0]
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const keep = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = keep
    }
  }
  return row[b.length]
}

// Close enough for a child: short words may differ by one sound if they start
// the same; longer words by about one sound in four.
function close(heardWord, targetWord) {
  const [heard, target] = [sound(heardWord), sound(targetWord)]
  if (heard === target || heard === `${target}s` || heard === `${target}es` || `${heard}s` === target) return true
  if (target.length <= 3) return heard[0] === target[0] && distance(heard, target) <= 1
  return distance(heard, target) <= Math.max(1, Math.floor(target.length / 4))
}

/** Whether any of the things the recogniser heard is (close to) `word`. */
export function saidWord(heard, word) {
  const target = words(word)
  const joined = target.join('')
  return heard.some((phrase) => {
    const said = words(phrase)
    if (said.join('').includes(joined)) return true // "t rex" for "T-rex", "ice cream"
    if (close(said.join(''), joined)) return true // "try sara tops" for "triceratops"
    if (target.length > 1) return false
    const alike = SAME_AS[joined] || []
    return said.some((w) => close(w, joined) || alike.includes(w))
  })
}
