import { trpc } from '../../util/trpc'
import { ClipList } from '../components/clip-list'

export const IndexPage = () => {
  const clip = trpc.clip.list.useQuery()

  if (!clip.data) {
    return null
  }

  return (
    <>
      <ClipList clips={clip.data.clips} />
    </>
  )
}
