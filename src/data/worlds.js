import { animals } from './animals.js'
import { fruits } from './fruits.js'
import { colors } from './colors.js'
import { toys } from './toys.js'
import { home } from './home.js'
import { body } from './body.js'
import { numbers } from './numbers.js'
import { shapes } from './shapes.js'
import { sky } from './sky.js'

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
  {
    id: 'home',
    name: 'My Little Home',
    intro: "Welcome to My Little Home! Let's look around!",
    learnDone: ['Wow!', 'You know the whole house!'],
    color: '#60a5fa',
    items: home,
    matchStyle: 'shadow',
    tryAtHome: [
      'Walk around the house and touch things together: “Door!” “Bed!”',
      'Play “Find the chair!” — the child runs to it, then gives you a turn.',
      'At bedtime, say good night to the room: “Good night, lamp!”',
    ],
  },
  {
    id: 'body',
    name: 'My Body',
    intro: "Welcome to My Body! Let's move together!",
    learnDone: ['Great job!', 'You know your body!'],
    color: '#f472b6',
    items: body,
    matchStyle: 'shadow',
    tryAtHome: [
      'Play “Touch your nose!” — go faster and faster until everyone laughs.',
      'Let the child be the leader and give you the instructions.',
      'While washing hands or faces, name each part together.',
    ],
  },
  {
    id: 'numbers',
    name: 'Number Hill',
    intro: "Welcome to Number Hill! Let's count the stars!",
    learnDone: ['Fantastic!', 'You can count to ten!'],
    color: '#fb923c',
    items: numbers,
    matchStyle: 'shadow',
    tryAtHome: [
      'Count stairs, spoons or toys out loud together, up to ten.',
      '“Bring me three toys!” — count them together when they arrive.',
      'Hold up fingers and ask: “How many?”',
    ],
  },
  {
    id: 'shapes',
    name: 'Shape Castle',
    intro: "Welcome to Shape Castle! Let's meet the shapes!",
    learnDone: ['Super!', 'You know all the shapes!'],
    color: '#818cf8',
    items: shapes,
    matchStyle: 'shadow',
    tryAtHome: [
      'Shape hunt: find a circle in the kitchen — a plate, a lid, a clock.',
      'Draw big shapes together and name them as you go.',
      'Cut a sandwich into a square or a triangle and ask which one it is.',
    ],
  },
  {
    id: 'sky',
    name: 'Sunny Sky',
    intro: "Welcome to Sunny Sky! Let's look up!",
    learnDone: ['Beautiful!', 'You know the sky!'],
    color: '#38bdf8',
    items: sky,
    matchStyle: 'shadow',
    tryAtHome: [
      'Look out of the window each morning: “Sun? Rain? Cloud?”',
      'At night, find the moon together and say “Good night, moon!”',
      'Draw today’s weather and name it.',
    ],
  },
  { id: 'island', name: 'Adventure Island', color: '#2dd4bf' },
]

export function getWorld(id) {
  return worlds.find((w) => w.id === id)
}

const ITEMS = new Map(worlds.filter((w) => w.items).flatMap((w) => w.items.map((item) => [item.id, item])))

/** Any vocabulary item from any world, by id (stories and songs mix worlds). */
export function getItem(id) {
  return ITEMS.get(id)
}
