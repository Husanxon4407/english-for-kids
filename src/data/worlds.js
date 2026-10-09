import { animals } from './animals.js'
import { fruits } from './fruits.js'
import { colors } from './colors.js'
import { toys } from './toys.js'

// The world map. Worlds with `items` are playable; the rest show as
// "coming soon" so the map already hints at the bigger adventure.
export const worlds = [
  {
    id: 'animals',
    name: 'Animal Kingdom',
    intro: "Welcome to Animal Kingdom! Let's meet the animals!",
    learnDone: ['Well done!', 'You met all the animals!'],
    color: '#8fd16a',
    items: animals,
    matchStyle: 'shadow',
    // Optional real-world play suggested to grown-ups (not homework).
    tryAtHome: [
      'Take turns being an animal: one person moves or makes the sound, the other says the word.',
      'Look at a picture book together and point: “Where is the dog?”',
      'Find toy animals at home and name them in English together.',
    ],
  },
  {
    id: 'fruits',
    name: 'Fruit Garden',
    intro: "Welcome to Fruit Garden! I'm hungry! Let's find some fruit!",
    learnDone: ['Yummy!', 'You know all the fruit!'],
    color: '#f87171',
    items: fruits,
    matchStyle: 'shadow',
    tryAtHome: [
      'At snack time, find a real apple or banana and say the word together.',
      'Play shop: “Give me a banana!” — then say “Thank you!”',
      'Say “I like apples!” and ask: “What do you like?”',
    ],
  },
  {
    id: 'colors',
    name: 'Rainbow Land',
    intro: "Welcome to Rainbow Land! Let's find the colors!",
    learnDone: ['Beautiful!', 'You know all the colors!'],
    color: '#a78bfa',
    items: colors,
    matchStyle: 'color',
    tryAtHome: [
      'Color hunt: “Find something blue!” — then swap roles.',
      'Sort toys or socks into color piles and name each pile.',
      'While drawing, ask for crayons by color: “Red, please!”',
    ],
  },
  {
    id: 'toys',
    name: 'Toy Town',
    intro: "Welcome to Toy Town! Let's play with the toys!",
    learnDone: ['Hooray!', 'You know all the toys!'],
    color: '#fbbf24',
    items: toys,
    matchStyle: 'shadow',
    tryAtHome: [
      'Hide a toy and ask: “Where is the ball?” Clap when it’s found.',
      'Put toys in a box and pull them out one by one: “It’s a car!”',
      'Combine with colors: “Give me the red ball.”',
    ],
  },
  { id: 'home', name: 'My Little Home', color: '#60a5fa' },
  { id: 'island', name: 'Adventure Island', color: '#2dd4bf' },
]

export function getWorld(id) {
  return worlds.find((w) => w.id === id)
}
