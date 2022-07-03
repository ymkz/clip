import { FC } from 'react'
import { useGetClipsQuery } from '../hooks/clip'
import { ClipItem } from './clip-item'

export const ClipList: FC = () => {
  const { clips } = useGetClipsQuery()

  return (
    <ul className="clip-list">
      {clips?.map((clip) => (
        <ClipItem key={clip.id} clip={clip} />
      ))}
    </ul>
  )
}
