import { FC } from 'react'
import { useClipData } from '../hooks/clip'
import { ClipItem } from './clip-item'

export const ClipList: FC = () => {
  const { clips } = useClipData()

  return (
    <ul className="clip-list">
      {clips?.map((clip) => (
        <ClipItem key={clip.id} clip={clip} />
      ))}
    </ul>
  )
}
