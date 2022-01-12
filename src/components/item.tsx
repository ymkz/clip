import { IconImage } from "~/components/icon-image"
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
    <li className="relative flex gap-x-2">
      <a
        href={page.url}
        target="_blank"
        rel="noreferrer"
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="flex flex-col gap-y-1 flex-grow">
        <div className="sm:text-lg line-clamp-3 break-all text-gray-900 leading-tight font-bold">
          {page.title}
        </div>
        <div className="text-xs line-clamp-1 break-all text-gray-400">
          {page.url}
        </div>
        <div className="text-sm line-clamp-3 break-all text-gray-600 leading-snug">
          {page.description}
        </div>
      </div>
      <div
        className="flex-shrink-0 w-28 h-20 rounded cursor-pointer z-10"
        onClick={handleClick}
      >
        {page.imageUrl ? (
          <img
            className="w-28 h-20 object-cover rounded"
            loading="lazy"
            src={page.imageUrl}
          />
        ) : (
          <div className="w-28 h-20 object-cover rounded flex justify-center items-center bg-gray-100 border border-gray-300 text-gray-400">
            <IconImage width={20} height={20} />
          </div>
        )}
      </div>
    </li>
  )
}
