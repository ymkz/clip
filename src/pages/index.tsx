import { Header } from '~/components/header'
import { Item } from '~/components/item'
import { usePageDataQuery } from '~/hooks/page-data'

export const IndexPage = () => {
  const { data: pageData } = usePageDataQuery()

  return (
    <>
      <Header />
      <ul className="list">
        {pageData?.map((pageItem) => (
          <Item pageData={pageItem} />
        ))}
      </ul>
    </>
  )
}
