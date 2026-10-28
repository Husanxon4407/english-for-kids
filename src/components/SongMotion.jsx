// How things move in Song Time, so every picture acts like what it is:
// birds flap, cows nod, cars drive, the sun glows, fruit falls from the trees.
import ItemArt from './ItemArt.jsx'

const GROUPS = {
  // Their own move on their picture card.
  flap: ['bird', 'kite', 'owl', 'duck', 'butterfly'],
  nod: ['cow', 'horse', 'goat', 'lamb', 'elephant', 'zebra'],
  wiggle: ['cat', 'fish', 'monkey', 'whale', 'teddy', 'doll'],
  beat: ['heart', 'lion', 'hands', 'feet'],
  turn: ['circle', 'square', 'triangle', 'diamond', 'oval', 'rectangle', 'orange', 'yoyo'],
  glow: ['star', 'sun', 'moon', 'rainbow', 'lamp', 'lightning'],
  drive: ['car', 'train', 'van', 'bus'],
  jump: ['dog', 'ball', 'jump', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
}
const CARD_MOVE = {
  flap: 'wl-flap 0.45s ease-in-out infinite',
  nod: 'wl-nod 0.9s ease-in-out infinite',
  wiggle: 'wl-wiggle 0.5s ease-in-out infinite',
  beat: 'wl-beat 0.9s ease-in-out infinite',
  turn: 'wl-spin-around 2.4s ease-in-out infinite',
  glow: 'wl-glow 1.6s ease-in-out infinite',
  drive: 'wl-drive 0.8s ease-in-out infinite',
  jump: 'wl-joy 0.9s ease-in-out infinite',
}
const groupOf = (id) => Object.keys(GROUPS).find((g) => GROUPS[g].includes(id))

/** The move a picture card makes while the song plays. */
export function cardMove(id, delay = 0) {
  const group = groupOf(id)
  return `${group ? CARD_MOVE[group] : 'wl-dance 0.9s ease-in-out infinite'} ${delay}s`
}

// How copies of the sung word travel across the stage behind the cards.
const WALKERS = ['cat', 'dog', 'cow', 'duck', 'lion', 'horse', 'elephant', 'monkey', 'zebra', 'goat', 'lamb', 'car', 'train', 'van', 'ball', 'teddy', 'doll']
const FLYERS = ['bird', 'kite', 'owl', 'cloud', 'butterfly', 'fish', 'whale']
const FALLERS = ['rain', 'apple', 'banana', 'orange', 'strawberry', 'grapes', 'pear', 'cherry', 'lemon', 'pineapple', 'watermelon', 'umbrella', 'egg']
const TWINKLERS = ['star', 'sun', 'moon', 'diamond', 'lightning', 'rainbow']

function travel(id) {
  if (WALKERS.includes(id)) return 'walk'
  if (FLYERS.includes(id)) return 'fly'
  if (FALLERS.includes(id)) return 'fall'
  if (TWINKLERS.includes(id)) return 'twinkle'
  return 'rise'
}

// Spread copies over the width of the stage, in percent.
const spread = (i) => 6 + ((i * 37) % 88)

/**
 * Copies of what is being sung, crossing the stage behind the cards: animals
 * walk along the ground, kites and birds fly over, fruit falls, balloons and
 * letters float up, stars twinkle.
 */
export function Parade({ ids, playing }) {
  const shown = [...new Set(ids)].slice(0, 2)
  const state = playing ? 'running' : 'paused'
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {shown.flatMap((id, k) => {
        const way = travel(id)
        const count = way === 'twinkle' ? 6 : 4
        return Array.from({ length: count }, (_, i) => {
          const n = i + k * count
          const size = way === 'walk' ? 11 : 7 + (n % 3) * 2
          const seconds = way === 'walk' ? 9 + (n % 3) * 2 : way === 'fly' ? 8 + (n % 3) * 2 : 5 + (n % 4)
          const start = -((n * seconds) / count) // spread them out along the way
          let place
          let inner
          if (way === 'walk') {
            place = { bottom: `${3 + (n % 2) * 5}%`, animation: `wl-cross ${seconds}s linear ${start}s infinite` }
            inner = 'wl-walk 0.5s ease-in-out infinite'
          } else if (way === 'fly') {
            place = { top: `${8 + ((n * 23) % 34)}%`, animation: `wl-cross ${seconds}s linear ${start}s infinite` }
            inner = 'wl-flap 0.5s ease-in-out infinite'
          } else if (way === 'fall') {
            place = { left: `${spread(n)}%`, animation: `wl-fall ${seconds}s linear ${start}s infinite` }
            inner = 'wl-spin 3s linear infinite'
          } else if (way === 'twinkle') {
            place = { left: `${spread(n)}%`, top: `${6 + ((n * 29) % 70)}%` }
            inner = `wl-twinkle 1.8s ease-in-out ${(n % 5) * 0.35}s infinite`
          } else {
            place = { left: `${spread(n)}%`, animation: `wl-float-up ${seconds + 2}s linear ${start}s infinite` }
            inner = 'wl-sway 2.4s ease-in-out infinite'
          }
          return (
            <div key={`${id}-${n}`} className="absolute opacity-80" style={{ width: `${size}%`, ...place, animationPlayState: state }}>
              <div style={{ animation: inner, animationPlayState: state }}>
                <ItemArt id={id} className="h-auto w-full drop-shadow" />
              </div>
            </div>
          )
        })
      })}
    </div>
  )
}

// What Bobo does along with the words: a cue can ask for one of these.
const BOBO_MOVES = {
  dance: 'wl-dance 0.9s ease-in-out infinite',
  sway: 'wl-sway 1.2s ease-in-out infinite',
  jump: 'wl-joy 0.8s ease-in-out infinite',
  spin: 'wl-spin-around 1.4s ease-in-out infinite',
  run: 'wl-run 0.25s ease-in-out infinite',
  nod: 'wl-nod 0.7s ease-in-out infinite',
  shake: 'wl-shiver 0.2s linear infinite',
  no: 'wl-no 1s ease-in-out infinite',
  clap: 'wl-hop 0.5s ease-in-out infinite',
  up: 'wl-hop 0.8s ease-in-out infinite',
  wave: 'wl-sway 1.6s ease-in-out infinite',
}

/** Bobo's body move and arms for a cue's `bobo` action (default: dancing). */
export function boboAction(action = 'dance') {
  return {
    animation: BOBO_MOVES[action] || BOBO_MOVES.dance,
    arms: action === 'up' || action === 'clap' ? action : undefined,
    waving: action === 'wave' || !BOBO_MOVES[action] || action === 'dance',
  }
}
