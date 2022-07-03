import useSWR, { useSWRConfig } from 'swr'

export const useGetClipsQuery = () => {
  const { data: clips } = useSWR<ClipItem[]>('/api/get')

  return { clips }
}

export const useDeleteClipMutation = () => {
  const { mutate } = useSWRConfig()

  const deleteClip = async (id: ClipItem['id']) => {
    await fetch('/api/del', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })
    await mutate('/api/get')
  }

  return { deleteClip }
}
