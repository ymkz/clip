import useSWR, { useSWRConfig } from 'swr'

export const useClips = () => {
  const { data: clips } = useSWR<ClipItem[]>('/api/get')

  return { clips }
}

export const useClipDelete = () => {
  const { mutate } = useSWRConfig()

  const deleteClip = async (id: string) => {
    await fetch('/api/del', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })
    await mutate('/api/get')
  }

  return { deleteClip }
}
