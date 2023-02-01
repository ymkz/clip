import { FC } from 'react'
import { ClipSchema } from '../../schema/clip'
import { ClipItem } from './clip-item'

type ClipListProps = {
  clips: ClipSchema[]
}

export const ClipList: FC<ClipListProps> = ({ clips }) => {
  return (
    <ul className="clip-list">
      {clips?.map((clip) => (
        <ClipItem key={clip.id} clip={clip} />
      ))}
    </ul>
  )
}
