import React from 'react'
import { IconImage } from '~/frontend/components/icon-image'
import { Page } from '~/types/page'

type Props = {
  image: Page['imageUrl']
}

export const Image = ({ image }: Props): JSX.Element => {
  if (image) {
    return <img className="image" loading="lazy" src={image} />
  }

  return (
    <div className="image noImage">
      <IconImage width={20} height={20} />
    </div>
  )
}
