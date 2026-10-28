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
const VEG_COLORS = ['tomato', 'carrot', 'corn', 'pepper', 'broccoli', 'peas']
const SEA_FRIENDS = ['whale', 'dolphin', 'turtle', 'octopus']
const SCHOOL_THINGS = ['bag', 'book', 'pencil', 'crayon']

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
  {
    id: 'wheels',
    title: 'The Wheels on the Bus',
    file: 'music/wheels.mp3',
    cover: 'bus',
    color: '#facc15',
    world: 'vehicles',
    stage: 'road',
    credit: { artist: 'matthewmikemusic', url: 'https://pixabay.com/music/happy-childrens-tunes-wheels-on-the-bus-male-vocals-60-seconds-371022/' },
    cues: [
      [0, ['bus']],
      [3, ['bus'], { bobo: 'spin' }], // "the wheels on the bus go round and round"
      [15.5, ['bus', 'brother', 'sister'], { bobo: 'jump' }], // "the kids on the bus go up and down"
      [26.5, ['bus', 'dad'], { bobo: 'wave' }], // "the driver on the bus says move on back"
      [37.5, ['bus', 'rain'], { bobo: 'sway' }], // "the wipers on the bus go swish, swish, swish"
      [48, ['bus'], { bobo: 'spin' }], // "the wheels on the bus go round and round"
      [55, ['bus', 'car', 'taxi', 'truck'], { bobo: 'wave' }], // "all through the town"
    ],
  },
  {
    id: 'whatican',
    title: 'What I Can Do',
    file: 'music/whatican.mp3',
    cover: 'jump',
    color: '#f97316',
    world: 'actions',
    stage: 'party',
    credit: { artist: 'AiCanvas', url: 'https://pixabay.com/music/happy-childrens-tunes-what-i-can-do-301853/' },
    cues: [
      [0, ['walk', 'jump', 'swim', 'climb']],
      [6, ['walk'], { bobo: 'sway' }], // "I can walk, walk"
      [12.5, ['walk'], { bobo: 'nod' }], // "I can bob"
      [16, ['jump'], { bobo: 'jump' }], // "I can jump, jump"
      [19.5, ['jump', 'dance'], { bobo: 'spin' }], // "I can turn, turn"
      [26, ['swim'], { bobo: 'sway' }], // "I can swim, swim"
      [29.5, ['swim', 'boat'], { bobo: 'wave' }], // "I can paddle like I'm in a boat"
      [31.5, ['climb'], { bobo: 'up' }], // "I can climb, climb to reach the top"
      [36, ['walk', 'jump', 'swim', 'climb'], { bobo: 'clap' }], // "look at what I can do"
      [41, ['climb'], { bobo: 'up' }],
      [48, ['walk', 'jump', 'swim', 'climb', 'dance']],
      [59, ['walk'], { bobo: 'sway' }],
      [62, ['walk'], { bobo: 'nod' }],
      [66, ['jump'], { bobo: 'jump' }],
      [69.5, ['jump', 'dance'], { bobo: 'spin' }],
      [76, ['swim'], { bobo: 'sway' }],
      [78.5, ['swim', 'boat'], { bobo: 'wave' }],
      [81.5, ['climb'], { bobo: 'up' }],
      [85.5, ['walk', 'jump', 'swim', 'climb'], { bobo: 'clap' }],
      [90.5, ['climb'], { bobo: 'up' }],
      [95, ['walk', 'jump', 'swim', 'climb'], { bobo: 'wave' }],
    ],
  },
  {
    id: 'ants',
    title: 'Ants',
    file: 'music/ants.mp3',
    cover: 'ant',
    color: '#a3e635',
    world: 'bugs',
    stage: 'garden',
    credit: { artist: 'AiCanvas', url: 'https://pixabay.com/music/pop-ants-313006/' },
    cues: [
      [0, ['ant', 'bee', 'ladybug', 'butterfly']],
      [4.5, ['ant'], { bobo: 'nod' }], // "can you see the tiny ants?"
      [8, ['ant'], { bobo: 'jump' }], // "marching in their polka dot pants"
      [11, ['ant', 'boots'], { bobo: 'sway' }], // "in teeny tiny boots"
      [19.5, ['ant'], { bobo: 'up' }], // "ants crawling up the wall"
      [21, ['five', 'six', 'seven', 'eight'], { bobo: 'nod' }], // "five, six, seven, eight"
      [25, ['ant', 'spider', 'beetle']],
      [30, ['ant'], { bobo: 'nod' }],
      [36, ['one', 'two', 'three', 'four'], { bobo: 'clap' }], // "one, two, three, four"
      [38.5, ['ant'], { bobo: 'run' }], // "march across the kitchen floor"
      [41, ['five', 'six', 'seven', 'eight'], { bobo: 'clap' }],
      [43.5, ['ant', 'rain'], { bobo: 'shake' }], // "under the garden gate... rain is falling"
      [50, ['ant'], { bobo: 'run' }], // "now it's time to run, run, run"
      [57.5, ['ant', 'bee', 'ladybug', 'butterfly', 'snail', 'worm'], { bobo: 'wave' }],
    ],
  },
  {
    id: 'dinos',
    title: "Rockin' with the Dinosaurs",
    file: 'music/dinos.mp3',
    cover: 'trex',
    color: '#22c55e',
    world: 'dinos',
    stage: 'jungle',
    credit: { artist: 'AiCanvas', url: 'https://pixabay.com/music/happy-childrens-tunes-rockin-with-the-dinosaurs-354730/' },
    cues: [
      [0, ['dinosaur', 'trex', 'stegosaurus'], { bobo: 'shake' }], // "the ground is shaking"
      [4.5, ['dinosaur'], { bobo: 'jump' }], // "the dinos came to party"
      [9, ['trex'], { bobo: 'nod' }], // "a rex on lead"
      [11.5, ['stegosaurus'], { bobo: 'clap' }], // "stegosaurus drumming"
      [15, ['pterodactyl'], { bobo: 'up' }], // "pterodactyl's flying"
      [19.5, ['dinosaur', 'trex', 'stegosaurus', 'pterodactyl'], { bobo: 'jump' }], // "rockin' with the dinosaurs"
      [22, ['dinosaur', 'trex', 'stegosaurus', 'pterodactyl'], { bobo: 'spin' }], // "do the dino twist"
      [24.5, ['footprint', 'fossil'], { bobo: 'jump' }], // "stomping on the fossil floor"
      [29, ['dinosaur', 'trex']],
      [39, ['trex', 'shoes'], { bobo: 'sway' }], // "T-rex strutting in his dancing shoes"
      [47.5, ['dinosaur', 'trex', 'triceratops', 'stegosaurus', 'pterodactyl'], { bobo: 'spin' }], // "spinning like a comet"
      [52.5, ['dinosaur'], { bobo: 'spin' }], // "twist like a top"
      [59, ['footprint'], { bobo: 'jump' }], // "stomp three times"
      [61.5, ['footprint'], { bobo: 'up' }], // "jump in the air"
      [64, ['dinosaur', 'trex'], { bobo: 'shake' }], // "wiggle"
      [71.5, ['pterodactyl'], { bobo: 'up' }], // "flying in the disco light"
      [75, ['volcano'], { bobo: 'jump' }], // "jumping in a lava glow"
      [79, ['trex'], { bobo: 'shake' }], // "roar with the dino show"
      [84, ['one', 'two', 'three'], { bobo: 'clap' }], // "a one, two, three"
      [89.5, ['dinosaur', 'trex', 'stegosaurus', 'pterodactyl'], { bobo: 'wave' }], // "good night"
      [93, ['dinosaur', 'trex', 'triceratops', 'stegosaurus', 'pterodactyl', 'egg']],
    ],
  },
  {
    id: 'lunchbox',
    title: 'My Lunch Box',
    file: 'music/lunchbox.mp3',
    cover: 'carrot',
    color: '#4ade80',
    world: 'veggies',
    stage: 'kitchen',
    credit: { artist: 'AiCanvas', url: 'https://pixabay.com/music/happy-childrens-tunes-my-lunch-box-238699/' },
    cues: [
      [0, ['carrot', 'apple', 'tomato', 'corn']],
      [3, ['carrot', 'apple', 'tomato', 'corn'], { bobo: 'up' }], // "open up this treasure box"
      [11.5, ['apple'], { bobo: 'nod' }], // "apple slices if I'm lucky"
      [15.5, VEG_COLORS, { bobo: 'spin' }], // "all the colours in my sight"
      [20.5, ['carrot', 'apple'], { bobo: 'sway' }], // "lunchbox, my midday thrill"
      [26, ['carrot'], { bobo: 'jump' }], // "with every bite"
      [33, ['carrot', 'apple', 'tomato'], { bobo: 'clap' }], // "lunchbox joy"
      [38.5, ['apple'], { bobo: 'nod' }], // "an apple plus a sandwich"
      [41, ['carrot'], { bobo: 'jump' }], // "some carrot sticks and cheese"
      [44, ['carrot', 'apple', 'tomato', 'corn']],
      [51, ['carrot', 'apple', 'tomato', 'corn'], { bobo: 'sway' }], // "my four-leaf clover"
      [56, ['carrot', 'tomato', 'potato', 'corn', 'cucumber', 'onion'], { bobo: 'clap' }], // "Monday through to Friday"
      [65.5, ['apple'], { bobo: 'nod' }],
      [69, VEG_COLORS, { bobo: 'spin' }],
      [74, ['carrot', 'apple'], { bobo: 'sway' }],
      [84, ['carrot', 'apple', 'tomato'], { bobo: 'clap' }],
      [89.5, ['apple'], { bobo: 'nod' }],
      [92.5, ['carrot'], { bobo: 'jump' }],
      [96, ['carrot', 'apple', 'tomato', 'corn']],
      [106, ['carrot', 'apple', 'tomato', 'corn'], { bobo: 'sway' }],
      [120, ['apple'], { bobo: 'nod' }],
      [122.5, ['carrot'], { bobo: 'jump' }],
      [127, ['carrot', 'apple', 'tomato', 'corn']],
      [138, ['carrot', 'tomato', 'potato', 'corn', 'cucumber', 'onion'], { bobo: 'clap' }],
      [150, ['carrot', 'apple', 'tomato', 'corn'], { bobo: 'sway' }],
      [160, ['carrot', 'tomato', 'potato', 'corn', 'cucumber', 'onion'], { bobo: 'clap' }],
      [172, ['carrot', 'apple', 'tomato', 'corn'], { bobo: 'wave' }],
    ],
  },
  {
    id: 'waterbaby',
    title: "I'm a Water Baby",
    file: 'music/waterbaby.mp3',
    cover: 'dolphin',
    color: '#2dd4bf',
    world: 'sea',
    stage: 'underwater',
    credit: { artist: 'AiCanvas', url: 'https://pixabay.com/music/happy-childrens-tunes-im-a-water-baby-fun-mix-315161/' },
    cues: [
      [0, SEA_FRIENDS, { bobo: 'sway' }], // "I'm a water baby"
      [9, ['swim', 'dolphin'], { bobo: 'sway' }], // "watch me swim around"
      [16, ['swim', 'fish'], { bobo: 'sway' }], // "I like to swim, it really cools me down"
      [20, ['dolphin', 'turtle', 'whale'], { bobo: 'spin' }], // "let's get into the pool and swim around"
      [26, SEA_FRIENDS, { bobo: 'clap' }], // "I'm a water baby"
      [34, ['swim'], { bobo: 'sway' }],
      [38.5, ['mom'], { bobo: 'wave' }], // "that my mother bought me"
      [42.5, ['swim'], { bobo: 'nod' }], // "I know how to swim"
      [51, ['swim'], { bobo: 'up' }], // "floaties, they can really help"
      [55.5, ['dad'], { bobo: 'nod' }], // "my dad can tell"
      [58, SEA_FRIENDS, { bobo: 'clap' }],
      [67, ['swim', 'dolphin'], { bobo: 'sway' }], // "backstroke and freestyle"
      [73.5, ['swim', 'boat'], { bobo: 'wave' }], // "I know how to paddle"
      [78.5, ['mom', 'dad'], { bobo: 'jump' }], // "come on mum and dad... jump on it"
      [88, SEA_FRIENDS],
      [92, SEA_FRIENDS, { bobo: 'clap' }],
      [99.5, ['swim', 'dolphin', 'whale'], { bobo: 'spin' }], // "let's swim around"
      [104, ['whale', 'shark', 'octopus', 'crab', 'starfish', 'jellyfish', 'turtle', 'seahorse'], { bobo: 'wave' }],
    ],
  },
  {
    id: 'happy',
    title: 'What Makes Me Happy',
    file: 'music/happy.mp3',
    cover: 'happy',
    color: '#fb7185',
    world: 'feelings',
    stage: 'dots',
    credit: { artist: 'AiCanvas', url: 'https://pixabay.com/music/pop-what-makes-me-happy-296247/' },
    cues: [
      [0, ['happy', 'excited']],
      [6, ['happy'], { bobo: 'jump' }], // "what makes me happy"
      [8.5, ['happy', 'sing'], { bobo: 'sway' }], // "is when I sing a song"
      [12, ['happy'], { bobo: 'clap' }], // "what else can make me happy"
      [19.5, ['drum'], { bobo: 'nod' }], // "the piano or the drums"
      [24, ['drum', 'sing'], { bobo: 'sway' }], // "the guitar, violin"
      [29, ['drum'], { bobo: 'up' }], // "the trumpet"
      [36, ['happy', 'excited', 'surprised']],
      [49.5, ['happy'], { bobo: 'jump' }],
      [52.5, ['happy', 'sing'], { bobo: 'sway' }],
      [56.5, ['happy'], { bobo: 'clap' }],
      [64, ['drum'], { bobo: 'nod' }],
      [76, ['drum', 'sing'], { bobo: 'up' }],
      [82, ['happy', 'excited', 'surprised', 'shy']],
      [110, ['happy', 'sing'], { bobo: 'wave' }],
    ],
  },
  {
    id: 'schoolyard',
    title: 'Schoolyard Fun',
    file: 'music/schoolyard.mp3',
    cover: 'bag',
    color: '#3b82f6',
    world: 'school',
    stage: 'balloons',
    credit: { artist: 'AiCanvas', url: 'https://pixabay.com/music/happy-childrens-tunes-schoolyard-fun-350340/' },
    cues: [
      [0, SCHOOL_THINGS],
      [8, ['bag', 'book'], { bobo: 'wave' }], // "ring the bell, the day is done"
      [11, SCHOOL_THINGS, { bobo: 'jump' }], // "time for schoolyard fun... hopscotch"
      [16.5, SCHOOL_THINGS, { bobo: 'clap' }], // "you're gonna laugh a lot"
      [19.5, SCHOOL_THINGS], // "come and play"
      [24, ['dance', 'jump'], { bobo: 'jump' }], // "dancing feet, jump in the circle"
      [28.5, ['star'], { bobo: 'up' }], // "sprinkle stars all around"
      [33, SCHOOL_THINGS, { bobo: 'spin' }], // "lighting up this playground"
      [40.5, ['book'], { bobo: 'nod' }], // "picture books and story time"
      [44, ['book', 'paint'], { bobo: 'sway' }],
      [52, SCHOOL_THINGS],
      [57.5, ['crayon', 'paint'], { bobo: 'spin' }], // "colours bright, a classroom"
      [66, ['balloon'], { bobo: 'up' }], // "get the balloons in the sky"
      [69, ['balloon'], { bobo: 'wave' }], // "wave your hands"
      [75.5, ['happy'], { bobo: 'jump' }], // "happiness gets you every time"
      [80, ['star'], { bobo: 'clap' }], // "a shining party star"
      [85, SCHOOL_THINGS],
      [95, SCHOOL_THINGS, { bobo: 'wave' }],
    ],
  },
  {
    id: 'shoes',
    title: 'Groove in My Shoes',
    file: 'music/shoes.mp3',
    cover: 'shoes',
    color: '#f472b6',
    world: 'clothes',
    stage: 'party',
    credit: { artist: 'lilex', url: 'https://pixabay.com/music/happy-childrens-tunes-groove-in-my-shoes-425506/' },
    cues: [
      [0, ['hat', 'shoes', 'socks', 'shirt'], { bobo: 'sway' }],
      [17, ['hat'], { bobo: 'nod' }], // "got my hat"
      [19, ['hat', 'shoes'], { bobo: 'jump' }], // "my shiny shoes, dancing"
      [25, ['shoes', 'drum'], { bobo: 'nod' }], // "every step's a tiny drum"
      [31, ['shoes'], { bobo: 'jump' }], // "boom, bada-boom!"
      [35, ['shoes'], { bobo: 'clap' }], // "clap your hands, don't be shy"
      [40.5, ['shoes'], { bobo: 'spin' }], // "groove in my shoes"
      [45, ['shoes'], { bobo: 'sway' }], // "swing left, swing right"
      [50, ['shoes'], { bobo: 'jump' }], // "jump in the feet"
      [53, ['shoes', 'moon'], { bobo: 'up' }], // "we're over the moon"
      [57.5, ['shoes'], { bobo: 'spin' }],
      [64, ['socks'], { bobo: 'sway' }], // "sunny socks, they glow so bright"
      [68.5, ['shoes'], { bobo: 'nod' }], // "rainbow laces"
      [75, ['hat', 'shoes', 'socks', 'shirt', 'dress', 'coat'], { bobo: 'spin' }], // "every move is a silly rhyme"
      [83, ['shoes'], { bobo: 'jump' }], // "who's got the groove?"
      [88, ['hat', 'shoes', 'socks', 'shirt'], { bobo: 'clap' }], // "what do we say? Hooray!"
      [95, ['shoes'], { bobo: 'spin' }],
      [101, ['shoes', 'sun'], { bobo: 'up' }], // "turn up the sunshine"
      [105, ['hat', 'shoes', 'socks', 'shirt', 'dress', 'coat']],
      [120, ['hat', 'shoes', 'socks'], { bobo: 'wave' }],
    ],
  },
  {
    id: 'googoo',
    title: 'Do the Goo Goo Drop',
    file: 'music/googoo.mp3',
    cover: 'baby',
    color: '#e879f9',
    world: 'family',
    stage: 'party',
    credit: { artist: 'AiCanvas', url: 'https://pixabay.com/music/happy-childrens-tunes-do-the-goo-goo-drop-beehive-mix-children-436656/' },
    cues: [
      [0, ['baby', 'mom', 'dad']],
      [5, ['baby'], { bobo: 'shake' }], // "shake your rattle and pop"
      [12.5, ['baby'], { bobo: 'jump' }],
      [18, ['baby', 'sister', 'brother'], { bobo: 'shake' }], // "every baby's got a rattle to shake"
      [21, ['blocks'], { bobo: 'clap' }], // "clack the blocks"
      [24, ['baby', 'family'], { bobo: 'jump' }], // "shout yeah, yeah"
      [29.5, ['cup'], { bobo: 'nod' }], // "sip the cup"
      [33, ['baby'], { bobo: 'spin' }], // "milk splash, baby rock"
      [40, ['baby', 'mom', 'dad'], { bobo: 'up' }], // "can you do the goo goo drop?"
      [45, ['baby'], { bobo: 'sway' }], // "wiggle around"
      [47.5, ['letter-a', 'letter-b', 'letter-c'], { bobo: 'jump' }], // "dance on the letters"
      [49.5, ['balloon'], { bobo: 'up' }], // "watch 'em go higher"
      [53, ['baby'], { bobo: 'no' }], // "you don't need your pacifier"
      [58, ['shoes'], { bobo: 'spin' }], // "twist to the shoe-shoe"
      [62.5, ['family', 'baby', 'grandma', 'grandpa']],
      [70, ['family'], { bobo: 'wave' }],
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
