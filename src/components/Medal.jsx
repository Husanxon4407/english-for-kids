const METAL = {
  gold: { face: '#fbbf24', light: '#fde68a', edge: '#d97706' },
  silver: { face: '#cbd5e1', light: '#f1f5f9', edge: '#64748b' },
  bronze: { face: '#e39a5f', light: '#f6c9a2', edge: '#9a4f16' },
}

/** Star-challenge medal. `kind` is gold, silver or bronze. */
export default function Medal({ kind = 'gold', className = '' }) {
  const m = METAL[kind] || METAL.gold
  return (
    <svg viewBox="0 0 100 120" className={className} role="img" aria-label={`${kind} medal`}>
      <path d="M22 4 L44 4 L58 50 L38 56 Z" fill="#ef4444" stroke="#3b2f2f" strokeWidth="3" strokeLinejoin="round" />
      <path d="M78 4 L56 4 L42 50 L62 56 Z" fill="#3b82f6" stroke="#3b2f2f" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="50" cy="78" r="38" fill={m.face} stroke="#3b2f2f" strokeWidth="3.5" />
      <circle cx="50" cy="78" r="28" fill={m.light} stroke={m.edge} strokeWidth="2.5" />
      <path
        d="M50 58 L55.6 70.4 L69 71.8 L59 80.8 L61.8 94 L50 87.2 L38.2 94 L41 80.8 L31 71.8 L44.4 70.4 Z"
        fill={m.face}
        stroke={m.edge}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M24 62 Q30 48 44 44" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}
