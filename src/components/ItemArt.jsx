import { animalArt } from './art/animals.jsx'
import { fruitArt } from './art/fruits.jsx'
import { colorArt } from './art/colors.jsx'
import { toyArt } from './art/toys.jsx'

const ART = { ...animalArt, ...fruitArt, ...colorArt, ...toyArt }

/**
 * Picture for any vocabulary item, by id. All drawings share a 200x200
 * viewBox. `variant` is used by Rainbow Land's star targets.
 */
export default function ItemArt({ id, className = '', title, style, variant }) {
  const Art = ART[id]
  if (!Art) return null
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} role="img" aria-label={title || id}>
      <Art variant={variant} />
    </svg>
  )
}
