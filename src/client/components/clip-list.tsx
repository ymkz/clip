import { useQuery } from '@tanstack/react-query'
import { Clip } from '../../schema/clip'
import { getClipList } from '../api/clip'
import { ClipItem } from './clip-item'

export const ClipList = () => {
  // FIXME: 本来は型を明示しなくてもhonoのRPCで型がつく
  // FIXME: 現状配列の型情報が失われるようなので明示的に型情報のパッチを行う
  const clipListQuery = useQuery<unknown, unknown, Clip[]>({
    queryKey: ['ClipList'],
    queryFn: getClipList,
  })

  return (
    <ul className="clip-list">
      {clipListQuery.data?.map((clip) => (
        <ClipItem key={clip.id} clip={clip} />
      ))}
    </ul>
  )
}
