import { useState } from 'react'
import RoundButton from '../components/RoundButton.jsx'
import ItemArt from '../components/ItemArt.jsx'
import { BackIcon, StarIcon } from '../components/Icons.jsx'
import { AVATARS, useProgress } from '../lib/progress.jsx'
import { DIFFICULTY } from '../lib/settings.js'
import { WORD_STATES, parentNote, wordState } from '../lib/wordState.js'
import { wordsDueCount } from '../lib/review.js'
import { say } from '../lib/audio.js'
import { worlds } from '../data/worlds.js'
import { songs } from '../data/songs.js'
import { MUSIC_CREDITS } from '../lib/bgm.js'
import { UZBEK_AVAILABLE } from '../lib/uzbek.js'
import { saveSongs, useOffline } from '../lib/offline.js'
import { SCRIPT } from '../data/script.js'

const MAX_PROFILES = 4
const playable = worlds.filter((w) => w.items)

function Card({ title, children }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
      {title && <h2 className="mb-4 text-xl font-extrabold text-slate-700">{title}</h2>}
      {children}
    </section>
  )
}

function Choice({ selected, onClick, children, className = '' }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`rounded-2xl border-2 px-4 py-3 text-left transition-colors ${
        selected ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-white hover:border-slate-300'
      } ${className}`}
    >
      {children}
    </button>
  )
}

function Avatar({ id, className = 'h-12 w-12' }) {
  return (
    <span className={`inline-block shrink-0 rounded-full bg-amber-50 p-1 ring-2 ring-white ${className}`}>
      <ItemArt id={id} className="h-full w-full" />
    </span>
  )
}

function timeAgo(ts) {
  if (!ts) return 'not yet'
  const days = Math.floor((Date.now() - ts) / (24 * 60 * 60 * 1000))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  return `${days} days ago`
}

// --- Who is playing? --------------------------------------------------------
function Profiles() {
  const { profiles, activeProfile, switchProfile, addProfile, updateProfile, removeProfile } = useProgress()
  const [editing, setEditing] = useState(null)
  const [confirmRemove, setConfirmRemove] = useState(null)

  return (
    <Card title="Who is playing?">
      <div role="radiogroup" aria-label="Child profile" className="grid gap-3 sm:grid-cols-2">
        {profiles.map((p) => (
          <Choice
            key={p.id}
            selected={p.id === activeProfile.id}
            onClick={() => switchProfile(p.id)}
            className="flex items-center gap-3"
          >
            <Avatar id={p.avatar} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-lg font-bold">{p.label}</span>
              <span className="block text-sm text-slate-500">
                {p.id === activeProfile.id ? 'Playing now' : 'Tap to switch'}
              </span>
            </span>
          </Choice>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setEditing(editing === activeProfile.id ? null : activeProfile.id)}
          className="rounded-xl bg-slate-100 px-4 py-2 font-bold hover:bg-slate-200"
        >
          {editing === activeProfile.id ? 'Done' : `Edit ${activeProfile.label}`}
        </button>
        {profiles.length < MAX_PROFILES && (
          <button
            type="button"
            onClick={addProfile}
            className="rounded-xl bg-sky-100 px-4 py-2 font-bold text-sky-800 hover:bg-sky-200"
          >
            + Add a child
          </button>
        )}
      </div>

      {editing === activeProfile.id && (
        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
          <label className="block font-bold" htmlFor="profile-label">
            Nickname
          </label>
          <input
            id="profile-label"
            value={activeProfile.label}
            maxLength={20}
            onChange={(e) => updateProfile(activeProfile.id, { label: e.target.value })}
            onBlur={(e) => !e.target.value.trim() && updateProfile(activeProfile.id, { label: 'Child' })}
            className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-lg focus:border-sky-500 focus:outline-none"
          />
          <p className="mt-1 text-sm text-slate-500">Only stored on this device. A nickname or initial is enough.</p>

          <p className="mt-4 font-bold">Picture</p>
          <p className="text-sm text-slate-500">Children recognize their picture, so they know whose turn it is.</p>
          <div role="radiogroup" aria-label="Picture" className="mt-2 flex flex-wrap gap-2">
            {AVATARS.map((a) => (
              <button
                key={a}
                type="button"
                role="radio"
                aria-checked={activeProfile.avatar === a}
                aria-label={a}
                onClick={() => updateProfile(activeProfile.id, { avatar: a })}
                className={`rounded-full p-0.5 ${activeProfile.avatar === a ? 'ring-4 ring-sky-500' : 'ring-2 ring-transparent hover:ring-slate-300'}`}
              >
                <Avatar id={a} />
              </button>
            ))}
          </div>

          {profiles.length > 1 && (
            <div className="mt-5">
              {confirmRemove === activeProfile.id ? (
                <div className="flex flex-wrap items-center gap-3">
                  <span>Remove {activeProfile.label} and all their progress?</span>
                  <button
                    type="button"
                    onClick={() => {
                      removeProfile(activeProfile.id)
                      setConfirmRemove(null)
                      setEditing(null)
                    }}
                    className="rounded-xl bg-rose-600 px-4 py-2 font-bold text-white hover:bg-rose-700"
                  >
                    Yes, remove
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmRemove(null)}
                    className="rounded-xl bg-slate-100 px-4 py-2 font-bold hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmRemove(activeProfile.id)}
                  className="text-sm font-bold text-rose-700 underline-offset-2 hover:underline"
                >
                  Remove this child…
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

// --- Progress ---------------------------------------------------------------
function Overview({ label, progress }) {
  const { words, stars } = progress
  const all = playable.flatMap((w) => w.items)
  const recognized = all.filter((i) => wordState(words[i.id]) === 'recognized').length
  const started = all.filter((i) => wordState(words[i.id]) !== 'new').length
  const due = wordsDueCount(words)
  return (
    <Card title={`${label}’s progress`}>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ['Stars', stars],
          ['Words met', `${started} / ${all.length}`],
          ['Recognized', recognized],
          ['Ready to practice', due],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-slate-50 p-3">
            <dt className="text-sm text-slate-500">{k}</dt>
            <dd className="flex items-center gap-1 text-2xl font-extrabold">
              {k === 'Stars' && <StarIcon className="h-6 w-6" />}
              {v}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-sm text-slate-500">
        {due > 0
          ? `The “Practice” button on the world map brings back the ${due === 1 ? 'word' : 'words'} that need it most.`
          : 'Once a few words are met, a “Practice” button appears on the world map to review them.'}
      </p>
    </Card>
  )
}

function WorldProgress({ world, progress }) {
  const { words, activities } = progress
  const note = parentNote(world.items, words)
  return (
    <>
      <Card title={`${world.name}: what we practiced`}>
        <p className="text-lg font-bold">{note.headline}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-relaxed">
          {note.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
          <span>Learn: {activities[`${world.id}:learn`] || 0}×</span>
          <span>Listen and tap: {activities[`${world.id}:listen`] || 0}×</span>
          <span>Match: {activities[`${world.id}:match`] || 0}×</span>
          <span>Memory: {activities[`${world.id}:memory`] || 0}×</span>
          <span>Puzzle: {activities[`${world.id}:puzzle`] || 0}×</span>
          <span>Balloons: {activities[`${world.id}:balloon`] || 0}×</span>
          <span>Feed Bobo: {activities[`${world.id}:feed`] || 0}×</span>
          <span>Peekaboo: {activities[`${world.id}:peekaboo`] || 0}×</span>
          <span>Parrot: {activities[`${world.id}:parrot`] || 0}×</span>
          <span>
            Star challenge: {activities[`${world.id}:quiz`] || 0}×
            {progress.medals[world.id] ? ` — best medal: ${progress.medals[world.id]}` : ''}
          </span>
        </div>

        <ul className="mt-4 divide-y divide-slate-100">
          {world.items.map((item) => {
            const w = words[item.id]
            const state = WORD_STATES[wordState(w)]
            const asked = w ? w.correct + w.wrong : 0
            return (
              <li key={item.id} className="flex items-center gap-4 py-3">
                <div className="h-14 w-14 shrink-0 rounded-2xl p-1" style={{ backgroundColor: item.color }}>
                  <ItemArt id={item.id} className="h-full w-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold">{item.word}</p>
                  <p className="text-sm text-slate-500">
                    {asked > 0 ? `Asked ${asked}× · right first time ${w.correct}×` : 'Not asked in a game yet'}
                    {' · '}last practiced {timeAgo(w?.lastSeen)}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${state.className}`}>
                  {state.label}
                </span>
              </li>
            )
          })}
        </ul>
        <dl className="mt-4 grid gap-2 rounded-2xl bg-slate-50 p-4 text-sm sm:grid-cols-3">
          {Object.values(WORD_STATES).map((s) => (
            <div key={s.label}>
              <dt className="font-bold">{s.label}</dt>
              <dd className="text-slate-500">{s.hint}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-slate-500">
          A game score is a hint, not proof. The best check is asking about a word on another day or in a different
          place.
        </p>
      </Card>

      {world.tryAtHome && (
        <Card title="Try at home (optional)">
          <ul className="list-disc space-y-1 pl-5 text-base leading-relaxed">
            {world.tryAtHome.map((idea) => (
              <li key={idea}>{idea}</li>
            ))}
          </ul>
        </Card>
      )}
    </>
  )
}

function MusicCredits() {
  return (
    <Card title="Music credits">
      <p className="text-sm text-slate-500">
        The songs and the background music are from Pixabay Music and are used under the Pixabay Content License. Thank you to the artists:
      </p>
      <ul className="mt-2 space-y-1 text-base">
        {[...songs.map((song) => ({ title: song.title, ...song.credit })), ...MUSIC_CREDITS].map((credit) => (
          <li key={credit.url}>
            <span className="font-bold">{credit.title}</span> — {credit.artist}{' '}
            <a className="text-sm text-sky-600 underline" href={credit.url} target="_blank" rel="noreferrer noopener">
              source
            </a>
          </li>
        ))}
      </ul>
    </Card>
  )
}

// Whether WordLand is saved on this device for playing without internet.
function OfflineStatus() {
  const offline = useOffline()
  const [savingSongs, setSavingSongs] = useState(false)
  const percent = offline.total ? Math.min(100, Math.round((offline.saved / offline.total) * 100)) : 0
  const songsMb = Math.round(offline.songsBytes / 1e6)
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      {offline.state === 'ready' && <p className="font-bold text-lime-700">✓ Ready to play without internet on this device.</p>}
      {offline.state === 'saving' && (
        <>
          <p className="font-bold">Saving WordLand on this device… {percent}%</p>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-sky-400 transition-[width]" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-1 text-sm text-slate-500">It keeps going in the background while your child plays.</p>
        </>
      )}
      {offline.state === 'idle' && <p className="text-sm text-slate-500">Not fully saved yet: WordLand saves itself while it is open with internet.</p>}
      {offline.state === 'unsupported' && <p className="text-sm text-slate-500">This browser cannot save WordLand for offline use.</p>}
      {offline.songsTotal > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <span>
            Songs saved: {offline.songsSaved} of {offline.songsTotal}
          </span>
          {offline.songsSaved < offline.songsTotal && (
            <button
              type="button"
              disabled={savingSongs}
              onClick={() => {
                setSavingSongs(true)
                saveSongs().finally(() => setSavingSongs(false))
              }}
              className="rounded-full bg-sky-500 px-4 py-1.5 font-bold text-white disabled:opacity-50"
            >
              {savingSongs ? 'Saving the songs…' : `Save all songs (${songsMb} MB)`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// --- Page -------------------------------------------------------------------
export default function ParentCorner({ onBack }) {
  const { progress, activeProfile, setSetting, resetProgress } = useProgress()
  const [confirmReset, setConfirmReset] = useState(false)
  const [worldId, setWorldId] = useState(playable[0].id)
  const { settings } = progress
  const label = activeProfile.label
  const world = playable.find((w) => w.id === worldId)

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-700 [user-select:text]">
      <header className="mx-auto flex max-w-3xl items-center gap-4 px-4 pt-4 sm:px-6 sm:pt-6">
        <RoundButton label="Back to the game" onClick={onBack}>
          <BackIcon className="h-8 w-8" />
        </RoundButton>
        <h1 className="text-2xl font-extrabold sm:text-3xl">Grown-ups’ corner</h1>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6 sm:px-6">
        <Profiles />
        <Overview label={label} progress={progress} />

        <div role="tablist" aria-label="World" className="flex flex-wrap gap-2">
          {playable.map((w) => (
            <button
              key={w.id}
              type="button"
              role="tab"
              aria-selected={w.id === worldId}
              onClick={() => setWorldId(w.id)}
              className={`rounded-full px-4 py-2 font-bold transition-colors ${
                w.id === worldId ? 'bg-slate-700 text-white' : 'bg-white text-slate-600 shadow-sm hover:bg-slate-100'
              }`}
            >
              {w.name}
            </button>
          ))}
        </div>
        <WorldProgress world={world} progress={progress} />

        <Card title={`Settings for ${label}`}>
          <h3 className="mb-2 font-bold">Difficulty</h3>
          <div role="radiogroup" aria-label="Difficulty" className="grid gap-3 sm:grid-cols-2">
            {Object.entries(DIFFICULTY).map(([key, mode]) => (
              <Choice key={key} selected={settings.difficulty === key} onClick={() => setSetting('difficulty', key)}>
                <span className="block font-bold">{mode.name}</span>
                <span className="block text-sm text-slate-500">{mode.description}</span>
              </Choice>
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Not tied to age — switch any time. Easier is fine whenever a child wants it.
          </p>

          {UZBEK_AVAILABLE && (
            <>
          <h3 className="mb-2 mt-6 font-bold">Language help</h3>
          <div role="radiogroup" aria-label="Language help" className="grid grid-cols-2 gap-3">
            <Choice selected={settings.helper !== 'uz'} onClick={() => setSetting('helper', 'off')}>
              <span className="block font-bold">English only</span>
              <span className="block text-sm text-slate-500">Bobo speaks only English.</span>
            </Choice>
            <Choice selected={settings.helper === 'uz'} onClick={() => setSetting('helper', 'uz')}>
              <span className="block font-bold">O‘zbekcha yordam</span>
              <span className="block text-sm text-slate-500">New words and instructions are also said in Uzbek.</span>
            </Choice>
          </div>
            </>
          )}

          <h3 className="mb-2 mt-6 font-bold">Sound</h3>
          <div role="radiogroup" aria-label="Sound" className="grid grid-cols-2 gap-3">
            <Choice selected={settings.sound} onClick={() => setSetting('sound', true)}>
              On
            </Choice>
            <Choice selected={!settings.sound} onClick={() => setSetting('sound', false)}>
              Off
            </Choice>
          </div>

          <h3 className="mb-2 mt-6 font-bold">Background music</h3>
          <div role="radiogroup" aria-label="Background music" className="grid grid-cols-2 gap-3">
            <Choice selected={settings.music} onClick={() => setSetting('music', true)}>
              On
            </Choice>
            <Choice selected={!settings.music} onClick={() => setSetting('music', false)}>
              Off
            </Choice>
          </div>

          <h3 className="mb-2 mt-6 font-bold">Play without internet</h3>
          <OfflineStatus />

          <h3 className="mb-2 mt-6 font-bold">Speaking check (Parrot game)</h3>
          <p className="mb-2 text-sm text-slate-500">
            In the Parrot game your child says each word into the microphone and Bobo checks it. Where this device can
            recognise speech by itself, nothing leaves the device. Otherwise the browser can send the short recording to
            its own service (Google in Chrome, Apple in Safari) to hear the word. WordLand never stores or keeps any recording.
          </p>
          <div role="radiogroup" aria-label="Speaking check" className="grid grid-cols-2 gap-3">
            <Choice selected={settings.speechOnline !== false} onClick={() => setSetting('speechOnline', true)}>
              <span className="block font-bold">On this device or online</span>
              <span className="block text-sm text-slate-500">Works on almost every phone and computer.</span>
            </Choice>
            <Choice selected={settings.speechOnline === false} onClick={() => setSetting('speechOnline', false)}>
              <span className="block font-bold">Only on this device</span>
              <span className="block text-sm text-slate-500">Nothing is sent. Where the device can't check, the parrot just repeats your child.</span>
            </Choice>
          </div>

          <h3 className="mb-2 mt-6 font-bold">Voice speed</h3>
          <div role="radiogroup" aria-label="Voice speed" className="grid grid-cols-2 gap-3">
            {[
              ['slow', 'Slow'],
              ['normal', 'Normal'],
            ].map(([key, text]) => (
              <Choice key={key} selected={settings.voiceSpeed === key} onClick={() => setSetting('voiceSpeed', key)}>
                {text}
              </Choice>
            ))}
          </div>
          <button
            type="button"
            onClick={() => say(SCRIPT.testVoice)}
            className="mt-3 rounded-xl bg-sky-100 px-4 py-2 font-bold text-sky-800 hover:bg-sky-200"
          >
            ▶ Test the voice
          </button>
        </Card>

        <Card title={`Reset ${label}’s progress`}>
          <p className="mb-3 text-base">Clears {label}’s stars and word progress. Settings and other children are kept.</p>
          {confirmReset ? (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  resetProgress()
                  setConfirmReset(false)
                }}
                className="rounded-xl bg-rose-600 px-4 py-2 font-bold text-white hover:bg-rose-700"
              >
                Yes, reset {label}
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="rounded-xl bg-slate-100 px-4 py-2 font-bold hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="rounded-xl bg-slate-100 px-4 py-2 font-bold hover:bg-slate-200"
            >
              Reset progress…
            </button>
          )}
        </Card>

        <p className="px-2 pb-4 text-sm text-slate-500">
          Privacy: WordLand saves progress only in this browser on this device. Nothing is uploaded, there are no
          accounts, ads or tracking, and no voice is recorded.
        </p>
        <MusicCredits />
      </main>
    </div>
  )
}
