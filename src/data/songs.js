// Song Time: real, sung recordings (in public/music/) from Pixabay Music,
// used under the Pixabay Content License. See `credit` for each artist.
//
// `cues` say which pictures are on screen while the song plays:
// [seconds, [item ids], { bobo }]. The times follow the words as they are
// sung, and `bobo` is what Bobo does then (see components/SongMotion.jsx):
// 'up', 'clap', 'sway', 'jump', 'spin', 'run', 'nod', 'shake', 'no' or
// 'wave'. Without it he dances.
import { getItem } from './worlds.js'

const LETTER_COLORS = ['#fee2e2', '#ffedd5', '#fef9c3', '#dcfce7', '#dbeafe', '#ede9fe', '#fce7f3']

// Pictures that only songs use: the alphabet and the words the alphabet
// song sings. (A word that a world teaches is taken from the world instead.)
const SONG_WORDS = [
  ['egg', 'egg', '#fef3c7'], ['fish', 'fish', '#cffafe'], ['goat', 'goat', '#dcfce7'], ['hat', 'hat', '#e0f2fe'],
  ['icecream', 'ice cream', '#fce7f3'], ['jump', 'jump', '#fef9c3'], ['kite', 'kite', '#e0f2fe'], ['lamb', 'lamb', '#dcfce7'],
  ['net', 'net', '#fef3c7'], ['owl', 'owl', '#ede9fe'], ['pet', 'pet', '#ffedd5'], ['queen', 'queen', '#fce7f3'],
  ['umbrella', 'umbrella', '#e0e7ff'], ['van', 'van', '#fef9c3'], ['whale', 'whale', '#cffafe'], ['xylophone', 'xylophone', '#f1f5f9'],
  ['yoyo', 'yo-yo', '#ffedd5'], ['zebra', 'zebra', '#dcfce7'], ['cup', 'cup', '#fef3c7'],
]
const EXTRA = new Map([
  ['rectangle', { id: 'rectangle', word: 'rectangle', color: '#ffedd5' }],
  ['oval', { id: 'oval', word: 'oval', color: '#ccfbf1' }],
  ...SONG_WORDS.map(([id, word, color]) => [id, { id, word, color }]),
  ...'abcdefghijklmnopqrstuvwxyz'.split('').map((letter, i) => [
    `letter-${letter}`,
    { id: `letter-${letter}`, word: letter.toUpperCase(), color: LETTER_COLORS[i % LETTER_COLORS.length] },
  ]),
])

/** Any picture a song can show, by id. */
export function songItem(id) {
  return getItem(id) || EXTRA.get(id)
}

const SHAPES = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond']
const ANIMALS = ['cat', 'dog', 'cow', 'duck', 'bird', 'lion']
const ZOO = ['elephant', 'zebra', 'monkey', 'lion']
const FRUIT = ['apple', 'banana', 'orange', 'strawberry', 'grapes', 'pear']
const BIG_FRUIT = ['cherry', 'strawberry', 'pineapple', 'watermelon']
const ONE_TO_SIX = ['one', 'two', 'three', 'four', 'five', 'six']
const SEVEN_TO_TEN = ['seven', 'eight', 'nine', 'ten']

const HOME = ['bed', 'chair', 'table', 'door', 'window', 'lamp']
const COLORS = ['red', 'orange-color', 'yellow', 'green', 'blue', 'purple']

// What Bobo does when a word of the alphabet song is sung.
const ALPHABET_MOVES = { jump: 'jump', kite: 'run', rain: 'shake', train: 'run', van: 'run', moon: 'sway', whale: 'sway', queen: 'wave' }

// "A is for apple, B is for ball...": when each letter starts, and the
// picture of the word that is sung for it.
const ALPHABET = [
  ['a', 9.6, 'apple'], ['b', 11.4, 'ball'], ['c', 13.2, 'cat'], ['d', 14.8, 'doll'],
  ['e', 17.6, 'egg'], ['f', 19.6, 'fish'], ['g', 21.6, 'goat'], ['h', 23.5, 'hat'],
  ['i', 26.4, 'icecream'], ['j', 28.6, 'jump'], ['k', 30.6, 'kite'], ['l', 32.5, 'lamb'],
  ['m', 36.0, 'moon'], ['n', 38.2, 'net'], ['o', 40.2, 'owl'], ['p', 42.1, 'pet'],
  ['q', 44.6, 'queen'], ['r', 47.0, 'rain'], ['s', 49.4, 'sun'], ['t', 51.2, 'train'],
  ['u', 54.0, 'umbrella'], ['v', 55.8, 'van'], ['w', 57.4, 'whale'], ['x', 59.2, 'xylophone'],
  ['y', 62.0, 'yoyo'], ['z', 64.4, 'zebra'],
].map(([letter, at, picture]) => [at, [`letter-${letter}`, picture], { bobo: ALPHABET_MOVES[picture] }])

// `world` is the world whose card plays the song; `stage` is its backdrop
// (see components/SongStage.jsx).
export const songs = [
  {
    id: 'twinkle',
    title: 'Twinkle, Twinkle, Little Star',
    file: 'music/twinkle.mp3',
    cover: 'star',
    color: '#818cf8',
    world: 'sky',
    stage: 'night',
    credit: { artist: 'matthewmikemusic', url: 'https://pixabay.com/music/happy-childrens-tunes-twinkle-twinkle-213-233453/' },
    cues: [
      [0, ['star'], { bobo: 'sway' }],
      [17.5, ['star'], { bobo: 'up' }], // "up above the world so high"
      [23, ['diamond'], { bobo: 'spin' }],
      [30, ['star'], { bobo: 'sway' }],
      [44.5, ['sun'], { bobo: 'nod' }],
      [55, ['star'], { bobo: 'up' }], // "then you shine your little light"
      [65, ['moon'], { bobo: 'sway' }],
      [70, ['star'], { bobo: 'sway' }],
      [91, ['moon'], { bobo: 'nod' }],
      [98, ['star'], { bobo: 'up' }],
      [105, ['star', 'moon'], { bobo: 'sway' }],
      [122, ['star'], { bobo: 'wave' }],
    ],
  },
  {
    id: 'numbers',
    title: 'The Number Song',
    file: 'music/numbers.mp3',
    cover: 'three',
    color: '#fb923c',
    world: 'numbers',
    stage: 'balloons',
    credit: { artist: 'matthewmikemusic', url: 'https://pixabay.com/music/happy-childrens-tunes-the-number-song-233460/' },
    cues: [
      [0, ['one', 'two', 'three'], { bobo: 'clap' }],
      [5, ['one', 'two', 'three'], { bobo: 'jump' }],
      [12, ['four', 'five', 'six'], { bobo: 'clap' }],
      [17, ['four', 'five', 'six'], { bobo: 'jump' }],
      [24.5, ONE_TO_SIX, { bobo: 'nod' }],
      [29.5, [...ONE_TO_SIX, 'seven', 'eight'], { bobo: 'jump' }],
      [33, [...ONE_TO_SIX, ...SEVEN_TO_TEN], { bobo: 'sway' }], // "these are the numbers we all know"
      [38.5, [...ONE_TO_SIX, ...SEVEN_TO_TEN], { bobo: 'up' }], // "as we grow"
      [44.5, ['seven'], { bobo: 'spin' }],
      [54.5, SEVEN_TO_TEN, { bobo: 'clap' }],
      [64.5, ONE_TO_SIX, { bobo: 'nod' }],
      [69, SEVEN_TO_TEN, { bobo: 'clap' }],
      [75, [...ONE_TO_SIX, ...SEVEN_TO_TEN], { bobo: 'sway' }],
      [80, [...ONE_TO_SIX, ...SEVEN_TO_TEN], { bobo: 'up' }],
      [85, [...ONE_TO_SIX, ...SEVEN_TO_TEN]],
    ],
  },
  {
    id: 'alphabet',
    title: 'The Alphabet Song',
    file: 'music/alphabet.mp3',
    cover: 'apple',
    color: '#f87171',
    stage: 'sunburst',
    credit: { artist: 'principle345', url: 'https://pixabay.com/music/happy-childrens-tunes-alphabet-song-333891/' },
    cues: [
      [0, ['letter-a', 'letter-b', 'letter-c']],
      ...ALPHABET,
      [67, ['letter-a', 'letter-b', 'letter-c'], { bobo: 'clap' }], // "now you know your ABC"
      [72, ['letter-a', 'letter-b', 'letter-c']],
      [78, ['letter-y', 'yoyo'], { bobo: 'spin' }],
      [80.5, ['letter-z', 'zebra'], { bobo: 'jump' }],
      [84, ['letter-a', 'letter-b', 'letter-c'], { bobo: 'clap' }],
      [90, ['letter-a', 'letter-b', 'letter-c']],
      [105, ['letter-a', 'letter-b', 'letter-c'], { bobo: 'wave' }],
    ],
  },
  {
    id: 'shapes',
    title: 'The Shapes Song',
    file: 'music/shapes.mp3',
    cover: 'heart',
    color: '#a78bfa',
    world: 'shapes',
    stage: 'castle',
    credit: { artist: 'NicksNicky', url: 'https://pixabay.com/music/pop-different-shapes-270780/' },
    cues: [
      [0, SHAPES, { bobo: 'sway' }],
      [9, ['circle'], { bobo: 'spin' }], // "look at the circle, round and neat"
      [14.5, ['circle', 'ball'], { bobo: 'run' }], // "rolling fast down the street"
      [19, ['rectangle'], { bobo: 'nod' }],
      [24.5, ['rectangle', 'door'], { bobo: 'wave' }], // "like a door you step inside"
      [30, SHAPES],
      [35, SHAPES, { bobo: 'jump' }], // "let's go find them all"
      [41, ['square'], { bobo: 'nod' }],
      [51, ['oval'], { bobo: 'sway' }],
      [56.5, SHAPES, { bobo: 'clap' }],
      [71.5, ['star'], { bobo: 'up' }], // "twinkling high"
      [77, ['heart'], { bobo: 'sway' }],
      [82, SHAPES],
      [87.5, SHAPES, { bobo: 'jump' }],
      [100.5, SHAPES, { bobo: 'clap' }], // "shout hooray"
      [111, ['square'], { bobo: 'nod' }],
      [118.5, ['oval'], { bobo: 'sway' }],
      [122, SHAPES],
      [130.5, ['star'], { bobo: 'up' }],
      [137, ['heart'], { bobo: 'sway' }],
      [143.5, ['diamond'], { bobo: 'spin' }],
      [147, ['star', 'heart'], { bobo: 'up' }],
      [154, ['diamond'], { bobo: 'spin' }],
      [158, SHAPES],
      [165, SHAPES, { bobo: 'clap' }], // "shout hooray"
      [172.5, SHAPES, { bobo: 'jump' }],
      [184, SHAPES, { bobo: 'wave' }],
    ],
  },
  {
    id: 'animals',
    title: 'The Animal Song',
    file: 'music/animals.mp3',
    cover: 'lion',
    color: '#8fd16a',
    world: 'animals',
    stage: 'farm',
    credit: { artist: 'u_lw2amr44wh', url: 'https://pixabay.com/music/happy-childrens-tunes-animal-alphabet-fiesta-314103/' },
    cues: [
      [0, ANIMALS],
      [5.5, ['cat'], { bobo: 'sway' }], // "the cat goes meow"
      [11.5, ['dog'], { bobo: 'jump' }], // "the dog goes woof"
      [15, ANIMALS, { bobo: 'clap' }], // "let's shout it together"
      [20, ['elephant'], { bobo: 'nod' }],
      [24.5, ['zebra'], { bobo: 'jump' }],
      [26.5, [...ANIMALS, 'elephant', 'zebra'], { bobo: 'clap' }], // "we'll make it a game"
      [31.5, ['cow'], { bobo: 'nod' }], // "here comes a cow, moo"
      [35.5, ANIMALS],
      [40, ANIMALS, { bobo: 'jump' }], // "hop to the frog"
      [44, ANIMALS, { bobo: 'clap' }], // "say the names of the animals"
      [50, ['monkey'], { bobo: 'jump' }],
      [52.5, [...ZOO, 'cat', 'dog'], { bobo: 'clap' }],
      [59, ANIMALS, { bobo: 'up' }], // "from the garden to the skies"
      [63.5, ['bird'], { bobo: 'wave' }],
      [69.5, ANIMALS],
      [74.5, ['lion'], { bobo: 'shake' }], // "the lion gives a roar"
      [78.5, ANIMALS, { bobo: 'jump' }],
      [84, [...ANIMALS, ...ZOO.slice(0, 3)], { bobo: 'clap' }],
      [92, ANIMALS],
      [99, ANIMALS, { bobo: 'wave' }],
    ],
  },
  {
    id: 'fruit',
    title: 'Fruit Salad',
    file: 'music/fruit.mp3',
    cover: 'strawberry',
    color: '#f472b6',
    world: 'fruits',
    stage: 'orchard',
    credit: { artist: 'AiCanvas', url: 'https://pixabay.com/music/happy-childrens-tunes-fruit-salad-304350/' },
    cues: [
      [0, FRUIT],
      [5, FRUIT, { bobo: 'up' }], // "the bowl's getting higher"
      [11.5, ['apple'], { bobo: 'nod' }],
      [14.5, FRUIT, { bobo: 'sway' }],
      [21.5, ['cherry'], { bobo: 'jump' }],
      [24, FRUIT],
      [27.5, ['strawberry'], { bobo: 'spin' }], // "strawberry swirl"
      [30, ['pear'], { bobo: 'nod' }],
      [34.5, ['pineapple'], { bobo: 'jump' }],
      [36.5, ['watermelon'], { bobo: 'sway' }], // "watermelon swing"
      [38.5, BIG_FRUIT],
      [40.5, BIG_FRUIT, { bobo: 'spin' }], // "the roller coaster of taste"
      [46, FRUIT, { bobo: 'up' }],
      [51, ['apple'], { bobo: 'nod' }],
      [54, FRUIT, { bobo: 'sway' }],
      [59, FRUIT],
      [66, ['orange'], { bobo: 'up' }], // "an orange hot-air balloon"
      [69, ['banana'], { bobo: 'jump' }],
      [72.5, FRUIT],
      [76, ['grapes'], { bobo: 'nod' }],
      [78.5, FRUIT, { bobo: 'jump' }], // "someone's birthday"
      [81, FRUIT, { bobo: 'clap' }], // "hip hip hooray"
      [85, FRUIT],
      [93.5, ['orange'], { bobo: 'up' }],
      [96.5, ['banana'], { bobo: 'jump' }],
      [100, FRUIT],
      [103, ['grapes'], { bobo: 'nod' }],
      [106, FRUIT, { bobo: 'jump' }],
      [108.5, FRUIT, { bobo: 'clap' }],
      [114, [...new Set([...FRUIT, ...BIG_FRUIT])]],
      [122, FRUIT, { bobo: 'wave' }],
    ],
  },
  {
    id: 'rainbow',
    title: "Swingin' From A Rainbow",
    file: 'music/rainbow.mp3',
    cover: 'rainbow',
    color: '#38bdf8',
    world: 'colors',
    stage: 'rainbow',
    credit: { artist: 'AiCanvas', url: 'https://pixabay.com/music/happy-childrens-tunes-swingin-from-a-rainbow-bubble-mix-315565/' },
    cues: [
      [0, ['rainbow'], { bobo: 'sway' }],
      [10, ['rainbow'], { bobo: 'sway' }], // "swinging from a rainbow"
      [15, ['rainbow', 'cloud'], { bobo: 'up' }], // "hanging on to clouds"
      [20, ['rainbow'], { bobo: 'clap' }], // "we smile, we sing, we laugh"
      [23.5, COLORS, { bobo: 'jump' }], // "jumping over colours"
      [26.5, ['umbrella'], { bobo: 'sway' }], // "floating down... with our umbrella"
      [31, ['rainbow', 'umbrella'], { bobo: 'nod' }],
      [36, ['rainbow'], { bobo: 'jump' }], // "we pop, we skip, we dance"
      [39.5, COLORS, { bobo: 'spin' }],
      [43, ['rainbow', 'cloud'], { bobo: 'sway' }],
      [46, ['rainbow'], { bobo: 'up' }], // "we fly back up to the rainbow"
      [49.5, ['sun'], { bobo: 'wave' }], // "the sun shines brighter up there"
      [54, ['rainbow'], { bobo: 'sway' }], // "swing from a rainbow"
      [62, COLORS, { bobo: 'sway' }],
      [70, COLORS],
      [76, ['rainbow'], { bobo: 'wave' }],
    ],
  },
  {
    id: 'kite',
    title: 'My Kite',
    file: 'music/kite.mp3',
    cover: 'kite',
    color: '#fbbf24',
    world: 'toys',
    stage: 'windy',
    credit: { artist: 'AiCanvas', url: 'https://pixabay.com/music/pop-my-kite-319074/' },
    cues: [
      [0, ['kite'], { bobo: 'sway' }],
      [9, ['kite', 'wind'], { bobo: 'shake' }], // "the wind plots to steal my kite"
      [14, ['kite'], { bobo: 'run' }], // "it pulls it"
      [19, ['kite', 'cloud'], { bobo: 'up' }], // "takes it higher"
      [26, ['kite'], { bobo: 'nod' }], // "the kite is mine"
      [29.5, ['kite'], { bobo: 'sway' }], // "I steer it"
      [36, ['kite', 'wind'], { bobo: 'run' }], // "I'm running to and fro"
      [44, ['kite', 'cloud'], { bobo: 'spin' }], // "blow it around"
      [48.5, ['kite'], { bobo: 'no' }], // "no, you can't have it"
      [54, ['kite', 'wind'], { bobo: 'shake' }],
      [57.5, ['kite'], { bobo: 'nod' }], // "the only kite I've got"
      [61, ['kite', 'ball', 'car', 'train']],
      [95, ['kite'], { bobo: 'wave' }],
    ],
  },
  {
    id: 'kitchen',
    title: "The Kitchen's Come Alive",
    file: 'music/kitchen.mp3',
    cover: 'table',
    color: '#60a5fa',
    world: 'home',
    stage: 'kitchen',
    credit: { artist: 'AiCanvas', url: 'https://pixabay.com/music/happy-childrens-tunes-the-kitchens-come-alive-350733/' },
    cues: [
      [0, HOME],
      [7.5, ['chair'], { bobo: 'sway' }], // "the chairs did a shuffle"
      [10.5, ['table'], { bobo: 'spin' }], // "the tables spun round"
      [13, ['chair', 'table', 'cup'], { bobo: 'nod' }], // "tapped the rhythm"
      [19.5, HOME, { bobo: 'jump' }], // "the kitchen's come alive"
      [27, HOME, { bobo: 'clap' }], // "a party in the kitchen"
      [32, HOME],
      [37.5, ['cup'], { bobo: 'up' }], // "hit the ceiling"
      [47, ['cup', 'table'], { bobo: 'clap' }], // "the bowls gave a cheer"
      [51, ['cup', 'table'], { bobo: 'clap' }], // "pans did a clap"
      [55, ['door', 'cup'], { bobo: 'nod' }],
      [61, HOME, { bobo: 'jump' }],
      [64, ['apple', 'banana', 'orange'], { bobo: 'spin' }], // "the fruit do flips"
      [66.5, ['cup'], { bobo: 'shake' }], // "the glasses do a splash"
      [69, HOME],
      [73, ['lamp'], { bobo: 'nod' }], // "the light switch winks"
      [79, ['chair', 'table']], // "the floorboards boogie"
      [84.5, ['door'], { bobo: 'spin' }], // "the doorknob twirls"
      [88.5, HOME, { bobo: 'wave' }], // "the walls did a swaying hello"
      [93, HOME, { bobo: 'jump' }], // "full of joy"
      [103, ['star', 'moon'], { bobo: 'sway' }], // "this starry night"
      [107, HOME],
      [117, HOME],
      [126, HOME, { bobo: 'wave' }], // "bye bye"
    ],
  },
  {
    id: 'hands',
    title: 'My Hands',
    file: 'music/hands.mp3',
    cover: 'hands',
    color: '#f472b6',
    world: 'body',
    stage: 'dots',
    credit: { artist: 'AiCanvas', url: 'https://pixabay.com/music/happy-childrens-tunes-my-hands-children-313008/' },
    cues: [
      [0, ['hands']],
      [6, ['hands'], { bobo: 'clap' }], // "my hands go click"
      [10, ['hands'], { bobo: 'sway' }],
      [13.5, ['hands', 'arms'], { bobo: 'spin' }], // "rock and roll"
      [16, ['hands'], { bobo: 'clap' }], // "pop, pop, pop"
      [19, ['hands'], { bobo: 'nod' }], // "my hands go stop"
      [20.5, ['hands', 'arms'], { bobo: 'sway' }], // "side to side"
      [23.5, ['hands'], { bobo: 'wave' }], // "my hands can wave"
      [25.5, ['hands', 'arms'], { bobo: 'up' }], // "my hands go up and down"
      [28.5, ['hands', 'one', 'two', 'three'], { bobo: 'nod' }], // "my hands help me count"
      [31, ['hands'], { bobo: 'clap' }], // "pop, pop, pop"
      [34, ['hands'], { bobo: 'nod' }], // "stop"
      [36, ['hands'], { bobo: 'wave' }], // "my hands can paint"
      [38, ['hands'], { bobo: 'shake' }], // "my hands can shake"
      [41, ['hands', 'head'], { bobo: 'no' }], // "I don't know... no, no, no"
      [46.5, ['hands'], { bobo: 'clap' }], // "pop, pop, pop"
      [50, ['hands', 'feet', 'eyes', 'ears'], { bobo: 'jump' }],
      [54, ['hands', 'feet', 'eyes', 'ears'], { bobo: 'wave' }],
    ],
  },
]

export function getSong(id) {
  return songs.find((s) => s.id === id)
}

/** The song that belongs to a world's card, if it has one. */
export function songForWorld(worldId) {
  return songs.find((s) => s.world === worldId)
}
