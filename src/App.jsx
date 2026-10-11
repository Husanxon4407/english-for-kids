import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import WorldMap from './pages/WorldMap.jsx'
import World from './pages/World.jsx'
import LearnWord from './pages/LearnWord.jsx'
import ListenAndTap from './games/ListenAndTap.jsx'
import MatchGame from './games/MatchGame.jsx'
import MemoryGame from './games/MemoryGame.jsx'
import PuzzleGame from './games/PuzzleGame.jsx'
import StarQuiz from './games/StarQuiz.jsx'
import BalloonGame from './games/BalloonGame.jsx'
import ParentCorner from './pages/ParentCorner.jsx'
import Shelf from './pages/Shelf.jsx'
import StoryPlayer from './pages/StoryPlayer.jsx'
import SongPlayer from './pages/SongPlayer.jsx'
import { BookIcon, NoteIcon } from './components/Icons.jsx'
import { getStory, stories } from './data/stories.js'
import { getSong, songForWorld, songs } from './data/songs.js'
import { useUzbek } from './lib/uzbek.js'
import GrownUpsGate from './components/GrownUpsGate.jsx'
import { getWorld } from './data/worlds.js'
import { SCRIPT } from './data/script.js'
import { pickReviewItems, worldOf } from './lib/review.js'
import { useProgress } from './lib/progress.jsx'
import { setMuted, setRate } from './lib/audio.js'
import { playMusic, setMusicEnabled } from './lib/bgm.js'
import { VOICE_SPEED } from './lib/settings.js'

// A Listen-and-Tap round across worlds, built once when it starts. Wrong
// choices come from each word's own world.
function makeReviewWorld(words) {
  return {
    id: 'review',
    isReview: true,
    items: pickReviewItems(words),
    introLine: SCRIPT.practiceIntro,
    poolFor: (item) => worldOf(item.id).items,
  }
}

// Simple in-memory navigation — no URLs for children to get lost in.
export default function App() {
  const [nav, setNav] = useState({ screen: 'home' })
  const go = (screen, params = {}) => setNav({ screen, ...params })
  const home = () => go('home')
  const world = nav.worldId ? getWorld(nav.worldId) : null
  const { progress } = useProgress()
  const { settings } = progress
  const uz = useUzbek()

  // Apply the grown-up's sound settings.
  useEffect(() => {
    setMuted(!settings.sound)
    setRate(VOICE_SPEED[settings.voiceSpeed] || VOICE_SPEED.normal)
  }, [settings.sound, settings.voiceSpeed])

  // Soft music: a gentle tune under the stories, a playful one on the map and
  // in the games, and none during songs or in the grown-ups' pages.
  useEffect(() => {
    setMusicEnabled(settings.sound && settings.music)
  }, [settings.sound, settings.music])
  useEffect(() => {
    const quiet = ['song', 'gate', 'parent'].includes(nav.screen)
    playMusic(quiet ? null : nav.screen === 'story' ? 'story' : 'play')
  }, [nav.screen])

  switch (nav.screen) {
    case 'map':
      return (
        <WorldMap
          onHome={home}
          onOpenWorld={(worldId) => go('world', { worldId })}
          onPractice={() => go('review', { reviewWorld: makeReviewWorld(progress.words) })}
          onStories={() => go('stories')}
          onSongs={() => go('songs')}
        />
      )
    case 'world':
      return (
        <World
          key={nav.welcome ? 'done' : 'intro'}
          world={world}
          welcome={nav.welcome}
          onBack={() => go('map')}
          onHome={home}
          onLearn={(index) => go('learn', { worldId: world.id, index })}
          onPlay={(game) =>
            game === 'song' ? go('song', { songId: songForWorld(world.id).id, worldId: world.id }) : go(game, { worldId: world.id })
          }
        />
      )
    case 'listen':
      return <ListenAndTap world={world} onBack={() => go('world', { worldId: world.id })} onHome={home} />
    case 'match':
      return <MatchGame world={world} onBack={() => go('world', { worldId: world.id })} onHome={home} />
    case 'memory':
      return <MemoryGame world={world} onBack={() => go('world', { worldId: world.id })} onHome={home} />
    case 'puzzle':
      return <PuzzleGame world={world} onBack={() => go('world', { worldId: world.id })} onHome={home} />
    case 'balloon':
      return <BalloonGame world={world} onBack={() => go('world', { worldId: world.id })} onHome={home} />
    case 'quiz':
      return <StarQuiz world={world} onBack={() => go('world', { worldId: world.id })} onHome={home} />
    case 'learn':
      return (
        <LearnWord
          world={world}
          startIndex={nav.index}
          onBack={() => go('world', { worldId: world.id })}
          onHome={home}
          onFinish={() => go('world', { worldId: world.id, welcome: true })}
        />
      )
    case 'review':
      return (
        <ListenAndTap
          world={nav.reviewWorld}
          onBack={() => go('map')}
          onHome={home}
        />
      )
    case 'stories':
      return (
        <Shelf
          key="stories"
          entries={stories}
          kind="story"
          prompt={[SCRIPT.storyPick, ...uz.line('stories')]}
          badge={<BookIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
          onBack={() => go('map')}
          onHome={home}
          onOpen={(storyId) => go('story', { storyId })}
        />
      )
    case 'story':
      return <StoryPlayer story={getStory(nav.storyId)} onBack={() => go('stories')} onHome={home} />
    case 'songs':
      return (
        <Shelf
          key="songs"
          entries={songs}
          kind="song"
          prompt={[SCRIPT.songPick, ...uz.line('songs')]}
          badge={<NoteIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
          onBack={() => go('map')}
          onHome={home}
          onOpen={(songId) => go('song', { songId })}
        />
      )
    case 'song':
      // A song opened from a world's card goes back to that world.
      return (
        <SongPlayer
          song={getSong(nav.songId)}
          onBack={() => (nav.worldId ? go('world', { worldId: nav.worldId }) : go('songs'))}
          onHome={home}
        />
      )
    case 'gate':
      return <GrownUpsGate onPass={() => go('parent')} onCancel={home} />
    case 'parent':
      return <ParentCorner onBack={home} />
    default:
      return <Home onPlay={() => go('map')} onGrownUps={() => go('gate')} />
  }
}
