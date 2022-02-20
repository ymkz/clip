import { useMutation, useQuery, useQueryClient } from 'react-query'

export async function fetchClips() {
  return fetch('/api/get').then((res) => res.json())
}

export function useClips() {
  const { data: clips } = useQuery<unknown, unknown, ClipItem[]>(
    '/api/get',
    async () => fetchClips()
  )

  return { clips }
}

export function useClipDelete() {
  const queryClient = useQueryClient()

  const { mutate: deleteClip } = useMutation(
    (id: ClipItem['id']) => {
      return fetch('/api/del', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('/api/get')
      },
    }
  )

  return { deleteClip }
}
