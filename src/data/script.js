// Everything Bobo says lives here (plus the word lists in this folder), so the
// voice generator can record every line. After changing any text, run:
//   npm run voice

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

/** Lookup key for a recorded line: case, quotes and spacing don't matter. */
export const voiceKey = (text) =>
  text
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/…/g, '...')
    .replace(/\s+/g, ' ')
    .trim()

export const PRAISE = ['Great job!', 'Well done!', 'Super!', 'Yes!', 'Fantastic!', 'You did it!', 'Wow!', 'Good listening!']

export const SCRIPT = {
  homeGreeting: ["Hello! I'm Bobo!", "Let's learn English together!", 'Tap the green button to play!'],
  homeBubble: "Hello! I'm Bobo!",
  letsPlay: "Let's play!",
  mapPrompt: 'Where shall we go?',
  comingSoon: (name) => `${name} is coming soon!`,
  bye: 'Bye-bye!',

  activities: {
    learn: 'Learn the words!',
    listen: 'Listen and tap!',
    match: "Let's match!",
    memory: 'Memory game!',
    puzzle: 'Puzzle time!',
    quiz: 'Star challenge!',
    balloon: 'Pop the balloon!',
  },

  // Learn a word
  whatsThis: "What's this?",
  word: (item) => `${capitalize(item.word)}!`,
  says: (item) => `The ${item.word} says...`,
  canYouSay: (item) => `Can you say ${item.word}?`,
  great: 'Great!',
  learnFinished: "Now, let's play a game!",

  // Listen and Tap
  listenIntro: 'Listen and tap!',
  tryAgain: ["Let's try again.", 'Listen carefully.'],

  // Matching
  matchIntro: {
    shadow: ["Let's match!", 'Put each picture on its shadow.'],
    color: ["Let's match!", 'Put each paint on its star.'],
  },
  matchMore: 'More! Match them!',
  matchWrong: ['Hmm, not that one.', 'Try again!'],
  matchTapFirst: {
    shadow: 'Tap a picture first. Then tap its shadow!',
    color: 'Tap a paint first. Then tap its star!',
  },

  // Memory cards
  memoryIntro: ['Memory game!', 'Find two the same!'],

  // Puzzle
  puzzleIntro: ['Puzzle time!', 'Fix the picture!'],

  // Balloon game
  balloonIntro: ['Pop the balloon!', 'Listen and pop!'],

  // Star challenge: one try per word, a medal at the end — never a bad result.
  quizIntro: ['Star challenge!', 'Listen and tap!'],
  quizLook: 'Look!',
  medal: {
    gold: 'You won a gold medal!',
    silver: 'You won a silver medal!',
    bronze: 'You won a bronze medal!',
  },

  // Story time and song time
  storyTime: 'Story time!',
  storyPick: 'Pick a story!',
  songTime: 'Song time!',
  songPick: 'Pick a song!',
  title: (entry) => `${entry.title}!`,

  // End of a game
  hooray: 'Hooray!',
  starsEarned: (n) => `You got ${n} ${n === 1 ? 'star' : 'stars'}!`,

  // Review (words from all worlds that need practice)
  practice: "Let's practice our words!",
  practiceIntro: 'Practice time! Listen and tap!',

  testVoice: "Hello! I'm Bobo. Find the dog!",
}

/** What Bobo says after a correct answer in Listen and Tap. */
export function correctLines(item, praise) {
  return item.thanks ? [item.thanks] : [praise, item.phrase]
}
