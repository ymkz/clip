import React from 'react'
import { IconDelete } from '~/frontend/components/icon-delete'
import { Image } from '~/frontend/components/image'
import { usePageDelete } from '~/frontend/hooks/use-page'
import { Page } from '~/types'

type Props = {
  page: Page
}

export const Item = ({ page }: Props): JSX.Element => {
  const { mutate: deletePage } = usePageDelete()

  const handleClick = () => {
    deletePage(page.id)
  }

  return (
    <li className="item">
      <div className="head">
        <div className="title">{page.title}</div>
        <div className="remove">
          <IconDelete width={16} height={16} onClick={handleClick} />
        </div>
      </div>
      <div className="body">
        <Image image={page.imageUrl} />
        <div className="detail">
          <div className="description">{page.description}</div>
          <div className="url">{page.url}</div>
        </div>
      </div>
      <a href={page.url} target="_blank" rel="noreferrer" className="anchor" />
    </li>
  )
}
