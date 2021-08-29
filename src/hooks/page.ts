import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Page } from '~/types/page'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const usePageDataQuery = () => {
  return useQuery<Page[]>('/api/get', () =>
    fetch('/api/get').then((response) => response.json())
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const usePageDataMutateRemove = () => {
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
