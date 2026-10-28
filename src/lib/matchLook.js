// How an unmatched target looks in the matching game: a grey shadow, or (for
// pictures whose shadows all look alike, such as faces) a faded copy.
export function targetLook(matchStyle) {
  return matchStyle === 'faded' ? { filter: 'grayscale(1)', opacity: 0.35 } : { filter: 'brightness(0)', opacity: 0.22 }
}
