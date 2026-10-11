// Difficulty modes from the plan. These are flexible settings, not age rules:
// either child can use either mode.
export const DIFFICULTY = {
  explorer: {
    name: 'Explorer',
    description: 'Two pictures to choose from. Match 2 at a time, 3 memory pairs, 4-piece puzzles, 3 balloons.',
    choices: 2,
    pairs: 2,
    memoryPairs: 3,
    puzzleGrid: 2,
    quizChoices: 3,
    balloons: 3,
  },
  super: {
    name: 'Super Explorer',
    description: 'Four pictures to choose from. Match 3 at a time, 6 memory pairs, 9-piece puzzles, 4 balloons.',
    choices: 4,
    pairs: 3,
    memoryPairs: 6,
    puzzleGrid: 3,
    quizChoices: 4,
    balloons: 4,
  },
}

export function getDifficulty(name) {
  return DIFFICULTY[name] || DIFFICULTY.explorer
}

export const VOICE_SPEED = { slow: 0.65, normal: 0.8 }

// Star challenge medals. Every result earns one — the weakest is still a win.
export const MEDAL_RANK = { bronze: 1, silver: 2, gold: 3 }

export function medalFor(correct, total) {
  if (correct === total) return 'gold'
  return correct >= total * 0.6 ? 'silver' : 'bronze'
}
