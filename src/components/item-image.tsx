import { IconImage } from '~/components/icon/image'
import { PageData } from '~/types/page-data'

type Props = {
  image: PageData['imageUrl']
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
