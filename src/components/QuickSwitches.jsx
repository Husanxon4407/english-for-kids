// Two small switches in the top bar of every screen, so nobody has to go to
// the grown-ups' corner: the Uzbek helper (a little flag) and the background
// music (a note). Bright means on; grey and crossed out means off.
import { useProgress } from '../lib/progress.jsx'
import { UZBEK_AVAILABLE, useUzbek } from '../lib/uzbek.js'
import { say, stop } from '../lib/audio.js'
import { pop } from '../lib/sfx.js'
import { UZ_LINES } from '../data/uzbek.js'
import uzManifest from '../data/voice-manifest-uz.json'
import { NoteIcon } from './Icons.jsx'

// The flag of Uzbekistan, simplified to stay clear at button size.
function UzFlag({ className }) {
  return (
    <svg viewBox="0 0 30 30" className={className} aria-hidden="true">
      <clipPath id="uz-flag-round">
        <circle cx="15" cy="15" r="15" />
      </clipPath>
      <g clipPath="url(#uz-flag-round)">
        <rect width="30" height="10" fill="#1eb5e8" />
        <rect y="10" width="30" height="10" fill="#fff" />
        <rect y="20" width="30" height="10" fill="#1eb53a" />
        <rect y="9.3" width="30" height="1.2" fill="#ce1126" />
        <rect y="19.5" width="30" height="1.2" fill="#ce1126" />
        <circle cx="8" cy="5" r="3.2" fill="#fff" />
        <circle cx="9.3" cy="5" r="2.8" fill="#1eb5e8" />
        {[13, 16, 19].map((x) => (
          <circle key={x} cx={x} cy="5" r="0.9" fill="#fff" />
        ))}
      </g>
    </svg>
  )
}

// A diagonal line across a switch that is off.
function Crossed() {
  return (
    <svg viewBox="0 0 30 30" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <path d="M6 24 24 6" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const BUTTON =
  'relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-md transition-all active:translate-y-0.5 phone:h-10 phone:w-10 tiny:h-9 tiny:w-9 sm:h-14 sm:w-14 short:h-11 short:w-11'

export default function QuickSwitches({ music = true }) {
  const { progress, setSetting } = useProgress()
  const uz = useUzbek()
  const { sound, music: musicOn } = progress.settings

  // Turning the helper on says so in Uzbek, so it is clear what the flag does.
  function toggleUzbek() {
    pop()
    setSetting('helper', uz.on ? 'off' : 'uz')
    if (uz.on) return stop()
    const file = uzManifest.lines?.[UZ_LINES.helperOn]
    if (file) say('', { src: import.meta.env.BASE_URL + file })
  }

  function toggleMusic() {
    pop()
    setSetting('music', !musicOn)
  }

  return (
    <>
      {UZBEK_AVAILABLE && (
        <button
          type="button"
          onClick={toggleUzbek}
          aria-pressed={uz.on}
          aria-label="O‘zbekcha yordam"
          title="O‘zbekcha yordam"
          className={`${BUTTON} p-1.5 ${uz.on ? 'bg-white ring-4 ring-lime-400' : 'bg-white/70'}`}
        >
          <UzFlag className={`h-full w-full transition-[filter,opacity] ${uz.on ? '' : 'opacity-50'}`} />
          {!uz.on && <Crossed />}
        </button>
      )}
      {music && sound && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-pressed={musicOn}
          aria-label="Music"
          title="Music"
          className={`${BUTTON} ${musicOn ? 'bg-pink-400 text-white ring-4 ring-pink-200' : 'bg-white/70 text-slate-400'}`}
        >
          <NoteIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          {!musicOn && <Crossed />}
        </button>
      )}
    </>
  )
}
