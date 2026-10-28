// Small, consistent icon set (stroke-based, inherits currentColor).

function Icon({ children, className = 'h-8 w-8', strokeWidth = 2.6 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const HomeIcon = (p) => (
  <Icon {...p}>
    <path d="M3 11 12 3l9 8" />
    <path d="M5 10v10h5v-6h4v6h5V10" />
  </Icon>
)

export const BackIcon = (p) => (
  <Icon {...p}>
    <path d="M15 4 7 12l8 8" />
  </Icon>
)

export const NextIcon = (p) => (
  <Icon {...p}>
    <path d="m9 4 8 8-8 8" />
  </Icon>
)

export const SpeakerIcon = (p) => (
  <Icon {...p}>
    <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
    <path d="M16.5 8.5a5 5 0 0 1 0 7" />
    <path d="M19 6a8.5 8.5 0 0 1 0 12" />
  </Icon>
)

export const MicIcon = (p) => (
  <Icon {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <path d="M12 17.5V21M8.5 21h7" />
  </Icon>
)

export const PlayIcon = (p) => (
  <Icon {...p}>
    <path d="M7 4.5v15l13-7.5z" fill="currentColor" />
  </Icon>
)

export const PauseIcon = (p) => (
  <Icon {...p}>
    <rect x="6" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" />
    <rect x="14" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" />
  </Icon>
)

export const NoteIcon = (p) => (
  <Icon {...p}>
    <path d="M9 18V5l11-2v13" />
    <circle cx="6" cy="18" r="3" fill="currentColor" />
    <circle cx="17" cy="16" r="3" fill="currentColor" />
  </Icon>
)

export const MouthIcon = (p) => (
  <Icon {...p}>
    <path d="M3 11c3-3 6-3 9-1 3-2 6-2 9 1-2 5-5 7-9 7s-7-2-9-7z" />
    <path d="M6 11.5c4 2 8 2 12 0" />
  </Icon>
)

export const BookIcon = (p) => (
  <Icon {...p}>
    <path d="M12 6c-2-1.6-5-2-8-1.5v13c3-.5 6-.1 8 1.5 2-1.6 5-2 8-1.5v-13c-3-.5-6-.1-8 1.5z" />
    <path d="M12 6v13" />
  </Icon>
)

export const CheckIcon = (p) => (
  <Icon {...p}>
    <path d="m4 12 5 5L20 6" />
  </Icon>
)

export const StarIcon = ({ className = 'h-8 w-8' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"
      fill="#fbbf24"
      stroke="#d97706"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
)

export const RepeatIcon = (p) => (
  <Icon {...p}>
    <path d="M4 12a8 8 0 0 1 14-5.3L20 9" />
    <path d="M20 4v5h-5" />
    <path d="M20 12a8 8 0 0 1-14 5.3L4 15" />
    <path d="M4 20v-5h5" />
  </Icon>
)

export const EarIcon = (p) => (
  <Icon {...p}>
    <path d="M7 9a5 5 0 0 1 10 0c0 3-2 4-3 5.5S13 18 11 19.5 6.5 19 7 17" />
    <path d="M10 9.5a2 2 0 0 1 4 0c0 1.5-1.5 2-1.5 3" />
  </Icon>
)
