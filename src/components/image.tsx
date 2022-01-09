import { IconImage } from "~/components/icon-image"
import { Page } from "~/types/page"

type Props = {
  image: Page["imageUrl"]
}

export const Image = ({ image }: Props) => {
  if (image) {
    return (
      <img
        className="w-32 h-20 object-cover rounded"
        loading="lazy"
        src={image}
      />
    )
  }

  return (
    <div className="w-32 h-20 object-cover rounded flex justify-center items-center bg-gray-100 border border-gray-300 text-gray-400">
      <IconImage width={20} height={20} />
    </div>
  )
}
