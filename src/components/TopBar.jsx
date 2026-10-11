import RoundButton from './RoundButton.jsx'
import { BackIcon, HomeIcon } from './Icons.jsx'

/** Header with large back / home buttons so a child never gets stuck. */
export default function TopBar({ onBack, onHome, children }) {
  return (
    <header className="flex items-center gap-3 px-4 pt-4 sm:px-6 sm:pt-6 short:pt-2">
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
      <div className="flex min-w-0 flex-1 items-center justify-end gap-3">{children}</div>
    </header>
  )
}
