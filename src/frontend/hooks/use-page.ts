import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Page } from '~/types/page'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const usePageGet = () => {
  return useQuery<unknown, unknown, Page[], string>('/api/get', () =>
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