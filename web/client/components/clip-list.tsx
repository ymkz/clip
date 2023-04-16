import { useQuery } from '@tanstack/react-query'
import { getClipList } from '../api/clip'
import { ClipItem } from './clip-item'

export const ClipList = () => {
  const clipListQuery = useQuery({
    queryKey: ['ClipList'],
    queryFn: getClipList,
  })

  return (
    <ul className="clip-list">
      {clipListQuery.data?.clipList.map((clip) => (
        <ClipItem key={clip.id} clip={clip} />
      ))}
    </ul>
  )
}
