import RoundButton from './RoundButton.jsx'
import QuickSwitches from './QuickSwitches.jsx'
import { BackIcon, HomeIcon } from './Icons.jsx'

/**
 * Header with large back / home buttons so a child never gets stuck, and the
 * Uzbek and music switches. `music={false}` hides the music switch (in Song
 * Time the song itself is the music).
 */
export default function TopBar({ onBack, onHome, music = true, children }) {
  return (
    <header className="flex items-center gap-2 px-3 pt-4 phone:gap-1.5 tiny:gap-1 tiny:px-2 sm:gap-3 sm:px-6 sm:pt-6 short:pt-2">
      {onBack && (
        <RoundButton label="Back" onClick={onBack}>
          <BackIcon className="h-8 w-8" />
        </RoundButton>
      )}
      {onHome && (
        <RoundButton label="Home" onClick={onHome}>
          <HomeIcon className="h-8 w-8" />
        </RoundButton>
      )}
      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 phone:gap-1.5 tiny:gap-1 sm:gap-3">
        <QuickSwitches music={music} />
        {children}
      </div>
    </header>
  )
}
