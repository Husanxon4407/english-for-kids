// Simple, descriptive progress states from the plan. These are practical
// product states, not formal assessments — never "weak" or "behind".

export const WORD_STATES = {
  new: { label: 'New', hint: 'Not practiced yet.', className: 'bg-slate-100 text-slate-600' },
  practicing: {
    label: 'Practicing',
    hint: 'Seen it; recognizing it is still growing.',
    className: 'bg-amber-100 text-amber-800',
  },
  recognized: {
    label: 'Recognized',
    hint: 'Found it right away the last 3 times it was asked.',
    className: 'bg-lime-100 text-lime-800',
  },
}

// How many first-try answers in a row count as "recognized".
const RECOGNIZED_STREAK = 3

export function wordState(word) {
  if (!word || (word.seen === 0 && word.correct === 0 && word.wrong === 0)) return 'new'
  const recent = word.recent || []
  const lastFew = recent.slice(-RECOGNIZED_STREAK)
  if (lastFew.length === RECOGNIZED_STREAK && lastFew.every(Boolean)) return 'recognized'
  return 'practicing'
}

const DAY = 24 * 60 * 60 * 1000

/** A short, friendly note for the grown-up about what was practiced. */
export function parentNote(items, words) {
  const byState = { new: [], practicing: [], recognized: [] }
  for (const item of items) byState[wordState(words[item.id])].push(item.word)
  const recentlyPracticed = items.filter((i) => words[i.id]?.lastSeen > Date.now() - DAY).map((i) => i.word)

  if (byState.new.length === items.length) {
    return {
      headline: 'Nothing practiced yet.',
      lines: ['Start with “Learn the words” in Animal Kingdom, then try “Listen and tap”.'],
    }
  }

  const lines = []
  if (recentlyPracticed.length) lines.push(`In the last day: ${list(recentlyPracticed)}.`)
  if (byState.recognized.length) lines.push(`Recognized right away: ${list(byState.recognized)}.`)
  if (byState.practicing.length) lines.push(`Still practicing: ${list(byState.practicing)} — a few more rounds of “Listen and tap” will help.`)
  if (byState.new.length) lines.push(`Not met yet: ${list(byState.new)}.`)

  const headline =
    byState.recognized.length === items.length
      ? 'All words recognized! Try checking them tomorrow to see if they stick.'
      : `${byState.recognized.length} of ${items.length} words recognized so far.`
  return { headline, lines }
}

function list(words) {
  if (words.length <= 1) return words.join('')
  return `${words.slice(0, -1).join(', ')} and ${words.at(-1)}`
}
