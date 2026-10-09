// Difficulty modes from the plan. These are flexible settings, not age rules:
// either child can use either mode.
export const DIFFICULTY = {
  explorer: {
    name: 'Explorer',
    description: 'Two pictures to choose from. Match 2 animals at a time.',
    choices: 2,
    pairs: 2,
  },
  super: {
    name: 'Super Explorer',
    description: 'Four pictures to choose from. Match 3 animals at a time.',
    choices: 4,
    pairs: 3,
  },
}

export function getDifficulty(name) {
  return DIFFICULTY[name] || DIFFICULTY.explorer
}

export const VOICE_SPEED = { slow: 0.65, normal: 0.8 }
