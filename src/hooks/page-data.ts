import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PageData } from '~/types/page-data'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const usePageDataQuery = () => {
  return useQuery<PageData[]>('/api/get', () =>
    fetch('/api/get').then((response) => response.json())
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const usePageDataMutateRemove = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (id: string) => {
      return fetch('/api/remove', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('/api/get'),
    }
  )
}
