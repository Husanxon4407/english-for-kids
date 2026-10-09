import RoundButton from './RoundButton.jsx'
import { SpeakerIcon } from './Icons.jsx'

/** The "hear it again" button. Pulses while audio is playing. */
export default function AudioButton({ onClick, playing = false, size = 'md', label = 'Listen again' }) {
  const icon = size === 'lg' ? 'h-16 w-16' : size === 'md' ? 'h-11 w-11 sm:h-12 sm:w-12' : 'h-8 w-8'
  return (
    <RoundButton label={label} onClick={onClick} color="blue" size={size} pulsing={playing}>
      <SpeakerIcon className={icon} />
    </RoundButton>
  )
}
