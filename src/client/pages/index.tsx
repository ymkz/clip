import { trpc } from '../../util/trpc'
import { ClipList } from '../components/clip-list'
import { Empty } from '../components/empty'

export const IndexPage = () => {
  const clip = trpc.clip.list.useQuery()

  if (!clip.data) {
    return null
  }

  if (!clip.data.clips.length) {
    return <Empty />
  }

  return <ClipList clips={clip.data.clips} />
}
