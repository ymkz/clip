import { IconDelete } from "~/components/icon-delete"
import { Image } from "~/components/image"
import { usePageDelete } from "~/hooks/use-page"
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
