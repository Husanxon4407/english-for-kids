// Song Time: real, sung recordings (in public/music/) from Pixabay Music,
// used under the Pixabay Content License. See `credit` for each artist.
//
// `cues` say which pictures are on screen while the song plays:
// [seconds, [item ids]]. The times follow the words as they are sung.
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
const FRUIT = ['apple', 'banana', 'orange', 'strawberry', 'grapes', 'pear']
const ONE_TO_SIX = ['one', 'two', 'three', 'four', 'five', 'six']
const SEVEN_TO_TEN = ['seven', 'eight', 'nine', 'ten']

const HOME = ['bed', 'chair', 'table', 'door', 'window', 'lamp']
const COLORS = ['red', 'orange-color', 'yellow', 'green', 'blue', 'purple']

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
].map(([letter, at, picture]) => [at, [`letter-${letter}`, picture]])

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
      [0, ['star']],
      [23, ['diamond']],
      [30, ['star']],
      [44.5, ['sun']],
      [55, ['star']],
      [65, ['moon']],
      [70, ['star']],
      [91, ['moon']],
      [98, ['star']],
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
      [0, ['one', 'two', 'three']],
      [12, ['four', 'five', 'six']],
      [24.5, ONE_TO_SIX],
      [44.5, ['seven']],
      [54.5, SEVEN_TO_TEN],
      [64.5, ONE_TO_SIX],
      [69, SEVEN_TO_TEN],
      [75, [...ONE_TO_SIX, ...SEVEN_TO_TEN]],
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
      [67, ['letter-a', 'letter-b', 'letter-c']],
      [78, ['letter-y', 'yoyo']],
      [82, ['letter-z', 'zebra']],
      [85, ['letter-a', 'letter-b', 'letter-c']],
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
      [0, SHAPES],
      [9, ['circle']],
      [14.5, ['circle', 'ball']],
      [19, ['rectangle']],
      [24.5, ['rectangle', 'door']],
      [30, SHAPES],
      [41, ['square']],
      [51, ['oval']],
      [56.5, SHAPES],
      [71.5, ['star']],
      [77, ['heart']],
      [82, SHAPES],
      [111, ['square']],
      [118.5, ['oval']],
      [122, SHAPES],
      [130.5, ['star']],
      [137, ['heart']],
      [143.5, ['diamond']],
      [147, ['star', 'heart']],
      [154, ['diamond']],
      [158, SHAPES],
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
      [5.5, ['cat']],
      [11.5, ['dog']],
      [17.5, ANIMALS],
      [31.5, ['cow']],
      [35.5, ANIMALS],
      [63.5, ['bird']],
      [69.5, ANIMALS],
      [74.5, ['lion']],
      [78.5, ANIMALS],
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
      [11.5, ['apple']],
      [14.5, FRUIT],
      [28.5, ['strawberry']],
      [30.5, ['pear']],
      [32.5, FRUIT],
      [51, ['apple']],
      [54, FRUIT],
      [66, ['orange']],
      [69, ['banana']],
      [72.5, FRUIT],
      [76, ['grapes']],
      [78.5, FRUIT],
      [93.5, ['orange']],
      [96.5, ['banana']],
      [100, FRUIT],
      [103, ['grapes']],
      [106, FRUIT],
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
      [0, ['rainbow']],
      [14, ['rainbow', 'cloud']],
      [20, ['rainbow']],
      [24, COLORS],
      [27.5, ['umbrella']],
      [33, ['rainbow']],
      [46, ['rainbow', 'cloud']],
      [49, ['sun']],
      [55, ['rainbow']],
      [64, COLORS],
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
      [0, ['kite']],
      [19, ['kite', 'cloud']],
      [30, ['kite']],
      [60, ['kite', 'ball', 'car', 'train']],
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
      [7.5, ['chair']],
      [10.5, ['table']],
      [13, ['chair', 'table', 'cup']],
      [19.5, HOME],
      [37.5, ['cup']],
      [47, ['cup', 'table']],
      [61, HOME],
      [64, ['apple', 'banana', 'orange']],
      [66.5, ['cup']],
      [73, ['lamp']],
      [79, ['chair', 'table']],
      [84.5, ['door']],
      [93, HOME],
      [103, ['star', 'moon']],
      [107, HOME],
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
      [28, ['hands', 'one', 'two', 'three']],
      [31, ['hands']],
      [51, ['hands', 'feet', 'eyes', 'ears']],
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
