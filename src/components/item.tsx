import { IconDelete } from "~/components/icon-delete"
import { Image } from "~/components/image"
import { usePageDelete } from "~/helpers/hook"
import { Page } from "~/types/page"

type Props = {
  page: Page
}

export const Item = ({ page }: Props): JSX.Element => {
  const { deletePage } = usePageDelete()

  const handleClick = () => {
    deletePage(page.id)
  }

  return (
    <li className="relative flex flex-col gap-y-1">
      <div className="flex items-center justify-between">
        <div className="text-lg line-clamp-2 leading-tight">{page.title}</div>
        <div className="cursor-pointer w-4 h-4 z-10">
          <IconDelete width={16} height={16} onClick={handleClick} />
        </div>
      </div>
      <div className="grid grid-cols-[8rem,1fr] gap-x-2">
        <Image image={page.imageUrl} />
        <div className="flex flex-col flex-grow gap-y-1 py-1">
          <div className="text-xs line-clamp-1 text-gray-500 break-all">
            {page.url}
          </div>
          <div className="text-sm line-clamp-3 text-gray-700 break-all leading-tight">
            {page.description}
          </div>
        </div>
      </div>
      <a
        href={page.url}
        target="_blank"
        rel="noreferrer"
        className="absolute top-0 left-0 w-full h-full"
      />
    </li>
  )
}
