import { IconImage } from '~/components/icon/image'
import { Page } from '~/types/page'

type Props = {
  image: Page['imageUrl']
}

export const ItemImage = ({ image }: Props) => {
  if (image) {
    return <img className="image" loading="lazy" src={image} />
  }

  return (
    <div className="image noImage">
      <IconImage width={20} height={20} />
    </div>
  )
}
