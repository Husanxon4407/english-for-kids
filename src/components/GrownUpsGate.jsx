import { useState } from 'react'
import RoundButton from './RoundButton.jsx'
import { BackIcon } from './Icons.jsx'

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

function newCode() {
  return Array.from({ length: 3 }, () => 1 + Math.floor(Math.random() * 9))
}

/**
 * Keeps children out of the grown-ups' corner: the code is written as words,
 * so it needs reading. Nothing here is spoken aloud on purpose.
 */
export default function GrownUpsGate({ onPass, onCancel }) {
  const [code, setCode] = useState(newCode)
  const [entered, setEntered] = useState([])
  const [failed, setFailed] = useState(false)

  function tap(n) {
    const next = [...entered, n]
    if (next.length < code.length) {
      setEntered(next)
      return
    }
    if (next.every((d, i) => d === code[i])) {
      onPass()
    } else {
      setFailed(true)
      setEntered([])
      setCode(newCode())
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-slate-50">
      <header className="flex items-center gap-3 px-4 pt-4 sm:px-6 sm:pt-6">
        <RoundButton label="Back" onClick={onCancel}>
          <BackIcon className="h-8 w-8" />
        </RoundButton>
      </header>
      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col items-center justify-center gap-6 px-4 pb-10 text-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-700">For grown-ups</h1>
          <p className="mt-3 text-lg text-slate-600">
            Tap these numbers in order:
            <br />
            <strong className="text-2xl text-slate-800">{code.map((d) => NUMBER_WORDS[d]).join(', ')}</strong>
          </p>
          <p className={`mt-2 h-6 text-base ${failed ? 'text-slate-500' : 'text-transparent'}`} aria-live="polite">
            {failed ? 'That wasn’t it — here is a new one.' : '.'}
          </p>
        </div>

        <div className="flex gap-3" aria-hidden="true">
          {code.map((_, i) => (
            <span key={i} className={`h-4 w-4 rounded-full ${i < entered.length ? 'bg-slate-600' : 'bg-slate-300'}`} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => tap(n)}
              className="h-16 w-16 rounded-2xl bg-white text-2xl font-bold text-slate-700 shadow-md active:translate-y-0.5 sm:h-20 sm:w-20"
            >
              {n}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
