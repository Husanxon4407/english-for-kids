// Big, round, touch-friendly button. Every button also has an aria-label,
// since children won't read labels — icons and speech carry the meaning.

const COLORS = {
  blue: 'bg-sky-500 text-white shadow-[0_6px_0_#0369a1] active:shadow-[0_2px_0_#0369a1]',
  green: 'bg-lime-500 text-white shadow-[0_6px_0_#4d7c0f] active:shadow-[0_2px_0_#4d7c0f]',
  orange: 'bg-orange-400 text-white shadow-[0_6px_0_#c2410c] active:shadow-[0_2px_0_#c2410c]',
  pink: 'bg-pink-400 text-white shadow-[0_6px_0_#be185d] active:shadow-[0_2px_0_#be185d]',
  white: 'bg-white text-slate-700 shadow-[0_6px_0_#cbd5e1] active:shadow-[0_2px_0_#cbd5e1]',
}

const SIZES = {
  sm: 'h-14 w-14 phone:h-12 phone:w-12 tiny:h-11 tiny:w-11 sm:h-16 sm:w-16 short:h-12 short:w-12',
  md: 'h-20 w-20 sm:h-24 sm:w-24 short:h-16 short:w-16',
  lg: 'h-28 w-28 sm:h-36 sm:w-36 short:h-20 short:w-20',
}

export default function RoundButton({
  label,
  onClick,
  color = 'white',
  size = 'sm',
  pulsing = false,
  disabled = false,
  className = '',
  children,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`${SIZES[size]} ${COLORS[color]} ${pulsing ? 'animate-pulse-ring' : ''} inline-flex shrink-0 items-center justify-center rounded-full transition-all active:translate-y-1 disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  )
}
