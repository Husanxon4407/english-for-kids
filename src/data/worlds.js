import { animals } from './animals.js'
import { fruits } from './fruits.js'
import { colors } from './colors.js'
import { toys } from './toys.js'
import { home } from './home.js'
import { body } from './body.js'
import { numbers } from './numbers.js'
import { shapes } from './shapes.js'
import { sky } from './sky.js'
import { clothes } from './clothes.js'
import { veggies } from './veggies.js'
import { vehicles } from './vehicles.js'
import { sea } from './sea.js'
import { bugs } from './bugs.js'
import { feelings } from './feelings.js'
import { actions } from './actions.js'
import { family } from './family.js'
import { school } from './school.js'
import { dinos } from './dinos.js'

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
  {
    id: 'clothes',
    name: 'Clothes Closet',
    intro: "Welcome to Clothes Closet! Let's get dressed!",
    learnDone: ['Looking good!', 'You know all the clothes!'],
    color: '#f472b6',
    items: clothes,
    matchStyle: 'shadow',
    tryAtHome: [
      'While getting dressed, name each thing as it goes on: “Socks! Shoes!”',
      'Play “Put on your hat!” with real clothes, then swap roles.',
      'Sort the laundry together and name each piece.',
    ],
  },
  {
    id: 'veggies',
    name: 'Veggie Patch',
    intro: "Welcome to Veggie Patch! Let's pick some vegetables!",
    learnDone: ['Crunchy!', 'You know all the vegetables!'],
    color: '#4ade80',
    items: veggies,
    matchStyle: 'shadow',
    tryAtHome: [
      'In the kitchen or at the market, point and ask: “What is it?” — “A carrot!”',
      'At dinner, find a vegetable on the plate and say it in English.',
      'Play shop with vegetables: “A tomato, please!” — “Thank you!”',
    ],
  },
  {
    id: 'vehicles',
    name: 'Go Go Wheels',
    intro: "Welcome to Go Go Wheels! Let's go for a ride!",
    learnDone: ['Beep beep!', 'You know all the things that go!'],
    color: '#facc15',
    items: vehicles,
    matchStyle: 'shadow',
    tryAtHome: [
      'On a walk or a ride, spot and name what goes by: “A bus!” “A bike!”',
      'Make the sounds together: the bus says “Beep beep!”',
      'Line up toy cars and say what each one is.',
    ],
  },
  {
    id: 'sea',
    name: 'Under the Sea',
    intro: "Welcome to Under the Sea! Let's swim with the sea animals!",
    learnDone: ['Splash!', 'You know all the sea animals!'],
    color: '#2dd4bf',
    items: sea,
    matchStyle: 'shadow',
    tryAtHome: [
      'At bath time, pretend to be a fish, a crab or an octopus and name it.',
      'Draw the sea together and add a creature each: “A turtle!”',
      'Walk sideways like a crab and say “Crab!”',
    ],
  },
  {
    id: 'bugs',
    name: 'Bug Garden',
    intro: "Welcome to Bug Garden! Let's find the little bugs!",
    learnDone: ['Buzz buzz!', 'You know all the bugs!'],
    color: '#a3e635',
    items: bugs,
    matchStyle: 'shadow',
    tryAtHome: [
      'Go on a bug hunt outside and whisper the names you find: “Ant!”',
      'Move like the bugs: buzz like a bee, wiggle like a worm.',
      'Look at a picture book and count the bugs together.',
    ],
  },
  {
    id: 'feelings',
    name: 'Feelings Village',
    intro: "Welcome to Feelings Village! How do you feel today?",
    learnDone: ['Wonderful!', 'You know all the feelings!'],
    color: '#fb7185',
    items: feelings,
    // Faces have the same round shadow, so they match onto a faded picture.
    matchStyle: 'faded',
    tryAtHome: [
      'Make a face together — happy, sad, surprised — and guess the word.',
      'At bedtime, ask: “Were you happy today? Were you sleepy?”',
      'Point to faces in a picture book: “Is he sad or happy?”',
    ],
  },
  {
    id: 'actions',
    name: 'Action Park',
    intro: "Welcome to Action Park! Let's move!",
    learnDone: ['Phew!', 'You know all the actions!'],
    color: '#f97316',
    items: actions,
    matchStyle: 'shadow',
    tryAtHome: [
      'Play “Simon says”: “Jump! Clap! Walk!” — then let the child give the orders.',
      'At the playground, say what you do: “I can climb!” “I can run!”',
      'Dance to a song and stop when the music stops.',
    ],
  },
  {
    id: 'family',
    name: 'My Family',
    intro: "Welcome to My Family! Let's meet everyone!",
    learnDone: ['Lovely!', 'You know the whole family!'],
    color: '#e879f9',
    items: family,
    matchStyle: 'faded',
    tryAtHome: [
      'Look at family photos and name everyone: “This is my grandma!”',
      'On a video call, say hello in English: “Hello, grandpa!”',
      'Draw your family together and label each person.',
    ],
  },
  {
    id: 'school',
    name: 'School Bag',
    intro: "Welcome to School Bag! Let's open the bag!",
    learnDone: ['Ready for school!', 'You know everything in the bag!'],
    color: '#3b82f6',
    items: school,
    // Pencil, pen and crayon cast the same shadow.
    matchStyle: 'faded',
    tryAtHome: [
      'Pack a bag together: “Pencil — in! Book — in!”',
      'While drawing, ask for things in English: “Crayon, please!”',
      'Hide a pencil and ask: “Where is the pencil?”',
    ],
  },
  {
    id: 'dinos',
    name: 'Dino Valley',
    intro: "Welcome to Dino Valley! Stomp stomp! Let's find the dinosaurs!",
    learnDone: ['Roar!', 'You know all the dinosaurs!'],
    color: '#22c55e',
    items: dinos,
    matchStyle: 'shadow',
    tryAtHome: [
      'Stomp like a T-rex and roar, then fly like a pterodactyl.',
      'Play with toy dinosaurs and name each one.',
      'Bury a toy in sand or rice and dig for a “fossil”.',
    ],
  },
]

export function getWorld(id) {
  return worlds.find((w) => w.id === id)
}

const ITEMS = new Map(worlds.filter((w) => w.items).flatMap((w) => w.items.map((item) => [item.id, item])))

/** Any vocabulary item from any world, by id (stories and songs mix worlds). */
export function getItem(id) {
  return ITEMS.get(id)
}
