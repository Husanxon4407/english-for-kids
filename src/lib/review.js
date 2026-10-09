// Personalized review: bring back words a child missed, is still practicing,
// or hasn't seen for a while — mixed with familiar words so it never feels
// like a test.
import { worlds } from '../data/worlds.js'
import { wordState } from './wordState.js'
import { shuffle } from './random.js'

const DAY = 24 * 60 * 60 * 1000

// Every playable item, remembering which world it belongs to.
const ALL_ITEMS = worlds.filter((w) => w.items).flatMap((w) => w.items.map((item) => ({ item, world: w })))
const WORLD_OF = new Map(ALL_ITEMS.map(({ item, world }) => [item.id, world]))

export const worldOf = (id) => WORLD_OF.get(id)

/** How much a word needs practice right now (higher = sooner). */
export function reviewScore(word, now = Date.now()) {
  if (!word) return 0
  const lastMissed = word.recent?.length > 0 && word.recent.at(-1) === false
  const days = word.lastSeen ? Math.min(7, (now - word.lastSeen) / DAY) : 7
  return (lastMissed ? 3 : 0) + (wordState(word) === 'practicing' ? 2 : 0) + days * 0.5
}

/** Words that have been introduced (seen or asked at least once). */
function introduced(words) {
  return ALL_ITEMS.filter(({ item }) => {
    const w = words[item.id]
    return w && (w.seen > 0 || w.correct + w.wrong > 0)
  })
}

export const MIN_REVIEW_WORDS = 4

/** Practice opens once a child has met a few words. */
export const canPractice = (words) => introduced(words).length >= MIN_REVIEW_WORDS

/**
 * Pick words for a review round across all worlds: the ones that need it most,
 * plus one or two familiar "easy wins".
 */
export function pickReviewItems(words, count = 6) {
  const pool = introduced(words)
  if (pool.length < MIN_REVIEW_WORDS) return []
  const ranked = shuffle(pool).sort((a, b) => reviewScore(words[b.item.id]) - reviewScore(words[a.item.id]))
  const easyWins = Math.min(2, Math.max(0, ranked.length - count + 2))
  const needy = ranked.slice(0, count - easyWins)
  const familiar = shuffle(ranked.slice(count - easyWins)).slice(0, easyWins)
  return shuffle([...needy, ...familiar].slice(0, count)).map(({ item }) => item)
}

/** How many words are waiting for review (shown to grown-ups). */
export function wordsDueCount(words) {
  return introduced(words).filter(({ item }) => reviewScore(words[item.id]) >= 2).length
}

/**
 * The order of target words for one Listen-and-Tap round in a world: every
 * word once, but up to two words the child just missed come back a second
 * time, replacing words they got right last time.
 */
export function planTargets(items, words) {
  const lastResult = (i) => words[i.id]?.recent?.at(-1)
  const needy = items
    .filter((i) => lastResult(i) === false)
    .sort((a, b) => reviewScore(words[b.id]) - reviewScore(words[a.id]))
    .slice(0, 2)
  // Easiest words first: recognized, then right last time with the lowest score.
  const known = shuffle(items.filter((i) => lastResult(i) === true)).sort(
    (a, b) =>
      (wordState(words[b.id]) === 'recognized') - (wordState(words[a.id]) === 'recognized') ||
      reviewScore(words[a.id]) - reviewScore(words[b.id]),
  )
  const dropped = new Set(known.slice(0, needy.length).map((i) => i.id))
  const targets = shuffle([...items.filter((i) => !dropped.has(i.id)), ...needy.slice(0, dropped.size)])
  // Avoid asking the same word twice in a row.
  for (let i = 1; i < targets.length; i++) {
    if (targets[i].id === targets[i - 1].id) {
      const j = targets.findIndex((t, k) => k > i && t.id !== targets[i].id)
      if (j > 0) [targets[i], targets[j]] = [targets[j], targets[i]]
    }
  }
  return targets
}
