import { IconRemove } from '~/components/icon/remove'
import { ItemImage } from '~/components/item-image'
import { usePageDataMutateRemove } from '~/hooks/page'
import { Page } from '~/types/page'

type Props = {
  page: Page
}

export const Item = ({ page }: Props) => {
  const { mutate: removePageData } = usePageDataMutateRemove()

  const remove = () => {
    removePageData(page.id)
  }

  return (
    <li className="item">
      <div className="head">
        <div className="title">{page.title}</div>
        <div className="remove">
          <IconRemove width={16} height={16} onClick={remove} />
        </div>
      </div>
      <div className="body">
        <ItemImage image={page.imageUrl} />
        <div className="detail">
          <div className="description">{page.description}</div>
          <div className="url">{page.url}</div>
        </div>
      </div>
      <a href={page.url} target="_blank" rel="noreferrer" className="anchor" />
    </li>
  )
}
