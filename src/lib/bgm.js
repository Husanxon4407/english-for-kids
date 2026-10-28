// Soft background music. One tune loops quietly at a time; it fades in and
// out, and drops lower ("ducks") whenever Bobo speaks so every word stays
// clear. The tunes are instrumentals from Pixabay Music (Pixabay Content
// License): see MUSIC_CREDITS.
const TRACKS = {
  // Under the told stories: gentle and dreamy. It belongs to the story, so the
  // music switch (which is for the background music) leaves it playing.
  story: { file: 'music/bgm-story.mp3', level: 0.08, always: true },
  // On the map and in the games: light and playful.
  play: { file: 'music/bgm-play.mp3', level: 0.06 },
}

export const MUSIC_CREDITS = [
  { title: 'Fairy Toes', artist: 'geoffharvey', url: 'https://pixabay.com/music/fantasy-dreamy-childrens-fairy-toes-374611/' },
  { title: 'Twinkling Toes', artist: 'LP-Studio-music', url: 'https://pixabay.com/music/happy-childrens-tunes-twinkling-toes-283788/' },
]

// While Bobo speaks the music plays at this share of its level.
const DUCK = 0.25
// Wait a moment after a line before coming back up, so the music does not
// pump up and down between the lines of one sentence.
const UNDUCK_AFTER = 700
const STEP_MS = 50
const FADE_STEPS = 16

let soundOn = true // all sound (the grown-ups' switch)
let musicOn = true // the background music switch
let wanted = null // name of the tune that should be playing
let playing = null // { name, audio }
let speaking = false
let unduck = null
let fader = null

// When the site first opens, the music waits until Bobo's first lines have
// downloaded and he has finished speaking: on a slow connection the (much
// bigger) music file would otherwise hold up his voice. Never longer than
// MAX_HOLD, and only once.
const MAX_HOLD = 10000
// The voice must stay quiet this long before the music comes in, so the next
// screen's clips (fetched right after a line ends) get their turn too.
const SETTLE_MS = 1500
let held = true
let holdTimer = null
let settleTimer = null
let fetchingVoice = false

function releaseMusic() {
  if (!held) return
  held = false
  clearTimeout(holdTimer)
  clearTimeout(settleTimer)
  start()
}

function checkRelease() {
  if (!held) return
  clearTimeout(settleTimer)
  settleTimer = setTimeout(() => {
    if (!fetchingVoice && !speaking) releaseMusic()
  }, SETTLE_MS)
}

/** Called by the voice while it is downloading clips ahead. */
export function setFetchingVoice(value) {
  fetchingVoice = value
  checkRelease()
}

// Whether a tune may play with the switches as they are.
const allowed = (name) => soundOn && (musicOn || TRACKS[name].always)

function targetVolume() {
  if (!playing || playing.name !== wanted || !allowed(playing.name)) return 0
  return TRACKS[playing.name].level * (speaking ? DUCK : 1)
}

// Move the volume towards its target in small steps; stop the tune when it
// has faded out, then start the wanted one.
function fade() {
  if (fader) return
  fader = setInterval(() => {
    if (!playing) {
      clearInterval(fader)
      fader = null
      start()
      return
    }
    const target = targetVolume()
    const { audio } = playing
    const step = TRACKS[playing.name].level / FADE_STEPS
    const next = Math.abs(target - audio.volume) <= step ? target : audio.volume + Math.sign(target - audio.volume) * step
    audio.volume = Math.max(0, Math.min(1, next))
    if (audio.volume !== target) return
    if (target === 0) {
      audio.pause()
      playing = null
      return // the next tick starts the wanted tune, if any
    }
    clearInterval(fader)
    fader = null
  }, STEP_MS)
}

function start() {
  if (playing || !wanted || !allowed(wanted) || typeof Audio === 'undefined') return
  if (held) {
    if (!holdTimer) holdTimer = setTimeout(releaseMusic, MAX_HOLD)
    checkRelease()
    return
  }
  const audio = new Audio(import.meta.env.BASE_URL + TRACKS[wanted].file)
  audio.loop = true
  audio.volume = 0
  playing = { name: wanted, audio }
  audio.play().then(fade, () => {
    // Browsers refuse sound before the first touch: try again on that touch.
    if (playing?.audio === audio) playing = null
    window.addEventListener('pointerdown', start, { once: true })
  })
}

/** Choose the tune for the current screen: 'story', 'play', or null for silence. */
export function playMusic(name) {
  wanted = name
  if (playing) fade()
  else start()
}

/** The sound switch and the background music switch. */
export function setMusicEnabled(sound, music) {
  soundOn = sound
  musicOn = music
  if (playing) fade()
  else start()
}

/** Called by the voice: duck while a line is spoken, come back shortly after. */
export function setSpeaking(value) {
  clearTimeout(unduck)
  if (value) {
    speaking = true
    if (playing) fade()
  } else {
    unduck = setTimeout(() => {
      speaking = false
      if (playing) fade()
      checkRelease()
    }, UNDUCK_AFTER)
  }
}
