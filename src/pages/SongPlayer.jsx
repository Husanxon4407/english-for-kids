import { useEffect, useRef, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import { Bobo } from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import StarCounter from '../components/StarCounter.jsx'
import GameComplete from '../components/GameComplete.jsx'
import RoundButton from '../components/RoundButton.jsx'
import { NoteIcon, PauseIcon, PlayIcon } from '../components/Icons.jsx'
import { useProgress } from '../lib/progress.jsx'
import { isMuted, stop as stopSpeaking } from '../lib/audio.js'
import { pop } from '../lib/sfx.js'
import { songItem } from '../data/songs.js'

const SONG_STARS = 2

// The pictures on screen at `time`: the last cue that has started.
function picturesAt(cues, time) {
  let current = cues[0]
  for (const cue of cues) {
    if (cue[0] <= time) current = cue
    else break
  }
  return current[1]
}

/**
 * Plays a recorded, sung song. As the words are sung their pictures appear
 * and dance, and Bobo dances along. One big button pauses and plays.
 */
export default function SongPlayer({ song, onBack, onHome }) {
  const { addStars, recordActivity } = useProgress()
  const audioRef = useRef(null)
  const [round, setRound] = useState(0)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [taps, setTaps] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    stopSpeaking()
    const audio = new Audio(import.meta.env.BASE_URL + song.file)
    audio.preload = 'auto'
    audio.muted = isMuted()
    audioRef.current = audio

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnd = () => {
      addStars(SONG_STARS)
      recordActivity(`song:${song.id}`)
      setDone(true)
    }
    audio.addEventListener('playing', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('waiting', onPause)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    // If the browser refuses to start on its own, the big button is waiting.
    audio.play().catch(() => setPlaying(false))
    const clock = setInterval(() => setTime(audio.currentTime), 120)

    return () => {
      clearInterval(clock)
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }
  }, [song, round])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }

  function again() {
    setTime(0)
    setDone(false)
    setRound((r) => r + 1)
  }

  if (done) return <GameComplete stars={SONG_STARS} onAgain={again} onBack={onBack} />

  const ids = picturesAt(song.cues, time)
  const many = ids.length > 3
  const dance = playing ? { animation: 'wl-dance 0.9s ease-in-out infinite' } : undefined

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
      </TopBar>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-4 px-4 pb-6 sm:gap-5">
        <div
          className="relative flex min-h-[15rem] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[2.5rem] border-8 border-white px-3 pb-4 pt-9 shadow-xl sm:min-h-[21rem] sm:flex-row sm:gap-6 sm:px-6 sm:pt-10"
          style={{ background: `linear-gradient(180deg, ${song.color}55, ${song.color}cc)` }}
        >
          {[6, 28, 70, 90].map((left, i) => (
            <span
              key={left}
              className="pointer-events-none absolute text-white/80"
              style={{
                left: `${left}%`,
                top: `${4 + (i % 2) * 7}%`,
                animation: playing ? `wl-float ${2.4 + i * 0.5}s ease-in-out ${i * 0.3}s infinite` : undefined,
              }}
            >
              <NoteIcon className="h-7 w-7 sm:h-9 sm:w-9" />
            </span>
          ))}

          <div className="w-24 shrink-0 sm:w-40" style={dance}>
            <Bobo talking={playing} waving className="h-auto w-full drop-shadow-lg" />
          </div>

          {/* The pictures for the words being sung right now. */}
          <div key={ids.join('-')} className={`flex flex-wrap items-center justify-center ${many ? 'gap-2' : 'gap-3 sm:gap-4'}`}>
            {ids.map((id, i) => {
              const item = songItem(id)
              return (
                <button
                  key={id}
                  type="button"
                  aria-label={item.word}
                  onClick={() => {
                    pop()
                    setTaps((n) => n + 1)
                  }}
                  className={`animate-bounce-in rounded-3xl bg-white p-1.5 shadow-lg sm:p-2 ${
                    ids.length === 1 ? 'w-40 sm:w-60' : many ? 'w-[17%] min-w-14 sm:w-24' : 'w-24 sm:w-40'
                  }`}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div key={taps} className={`aspect-square rounded-2xl p-1 ${taps ? 'animate-wiggle' : ''}`} style={{ backgroundColor: item.color }}>
                    <ItemArt id={id} className="h-full w-full" style={dance && { ...dance, animationDelay: `${i * 0.12}s` }} />
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex w-full max-w-xl items-center gap-4">
          <RoundButton label={playing ? 'Pause' : 'Play'} color="green" size="md" onClick={toggle} pulsing={!playing}>
            {playing ? <PauseIcon className="h-10 w-10 sm:h-12 sm:w-12" /> : <PlayIcon className="ml-1 h-10 w-10 sm:h-12 sm:w-12" />}
          </RoundButton>
          <div className="h-5 flex-1 overflow-hidden rounded-full border-4 border-white bg-white/60 shadow-inner" aria-hidden="true">
            <div
              className="h-full rounded-full transition-[width] duration-200"
              style={{ width: `${duration ? Math.min(100, (time / duration) * 100) : 0}%`, backgroundColor: song.color }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
