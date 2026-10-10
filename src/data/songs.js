// Song Time: real, sung recordings (in public/music/) from Pixabay Music,
// used under the Pixabay Content License. See `credit` for each artist.
//
// `cues` say which pictures are on screen while the song plays:
// [seconds, [item ids]]. The times follow the words as they are sung.
import { getItem } from './worlds.js'
import { songNumbers } from './numbers.js'

const LETTER_COLORS = ['#fee2e2', '#ffedd5', '#fef9c3', '#dcfce7', '#dbeafe', '#ede9fe', '#fce7f3']

// Pictures that only songs use: the numbers seven to ten, two more shapes
// and the alphabet.
const EXTRA = new Map([
  ...songNumbers.map((n) => [n.id, n]),
  ['rectangle', { id: 'rectangle', word: 'rectangle', color: '#ffedd5' }],
  ['oval', { id: 'oval', word: 'oval', color: '#ccfbf1' }],
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

// "A is for apple, B is for ball...": when each letter starts, and the
// picture for the words the worlds already teach.
const ALPHABET = [
  ['a', 9.6, 'apple'], ['b', 11.4, 'ball'], ['c', 13.2, 'cat'], ['d', 14.8, 'doll'],
  ['e', 17.6], ['f', 19.6], ['g', 21.6], ['h', 23.5],
  ['i', 26.4], ['j', 28.6], ['k', 30.6], ['l', 32.5],
  ['m', 36.0, 'moon'], ['n', 38.2], ['o', 40.2], ['p', 42.1],
  ['q', 44.6], ['r', 47.0, 'rain'], ['s', 49.4, 'sun'], ['t', 51.2, 'train'],
  ['u', 54.0], ['v', 55.8], ['w', 57.4], ['x', 59.2], ['y', 62.0], ['z', 64.4],
].map(([letter, at, picture]) => [at, picture ? [`letter-${letter}`, picture] : [`letter-${letter}`]])

export const songs = [
  {
    id: 'twinkle',
    title: 'Twinkle, Twinkle, Little Star',
    file: 'music/twinkle.mp3',
    cover: 'star',
    color: '#818cf8',
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
    credit: { artist: 'principle345', url: 'https://pixabay.com/music/happy-childrens-tunes-alphabet-song-333891/' },
    cues: [[0, ['letter-a', 'letter-b', 'letter-c']], ...ALPHABET, [67, ['letter-a', 'letter-b', 'letter-c']]],
  },
  {
    id: 'shapes',
    title: 'The Shapes Song',
    file: 'music/shapes.mp3',
    cover: 'heart',
    color: '#a78bfa',
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
]

export function getSong(id) {
  return songs.find((s) => s.id === id)
}
