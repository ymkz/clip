import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Page } from '~/types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const usePageGet = () => {
  return useQuery<Page[]>('/api/get', () =>
    fetch('/api/get').then((response) => response.json())
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const usePageDelete = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (id: string) => {
      return fetch('/api/del', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('/api/get'),
    }
  )
}
