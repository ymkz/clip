import React from 'react'
import { Item } from '~/frontend/components/item'
import { usePageGet } from '~/frontend/hooks/use-page'

export const IndexPage = (): JSX.Element => {
  const { data: pageList } = usePageGet()

  return (
    <ul className="list">
      {pageList?.map((page) => (
        <Item key={page.id} page={page} />
      ))}
    </ul>
  )
}
