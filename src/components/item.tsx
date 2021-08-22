import { IconRemove } from '~/components/icon/remove'
import { ItemImage } from '~/components/item-image'
import { usePageDataMutateRemove } from '~/hooks/page-data'
import { PageData } from '~/types/page-data'

type Props = {
  pageData: PageData
}

export const Item = ({ pageData }: Props) => {
  const { mutate: removePageData } = usePageDataMutateRemove()

  const remove = () => {
    removePageData(pageData.id)
  }

  return (
    <li className="item">
      <div className="head">
        <div className="title">{pageData.title}</div>
        <div className="remove">
          <IconRemove width={16} height={16} onClick={remove} />
        </div>
      </div>
      <div className="body">
        <ItemImage image={pageData.imageUrl} />
        <div className="detail">
          <div className="description">{pageData.description}</div>
          <div className="url">{pageData.url}</div>
        </div>
      </div>
      <a
        href={pageData.url}
        target="_blank"
        rel="noreferrer"
        className="anchor"
      />
    </li>
  )
}
