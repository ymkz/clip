import { useClips } from '../hooks/clip-hooks'
import { ClipItem } from './clip-item'

export function ClipList() {
  const { clips } = useClips()

  return (
    <ul className="clip-list">
      {clips?.map((clip) => (
        <ClipItem key={clip.id} clip={clip} />
      ))}
    </ul>
  )
}
