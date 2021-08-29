import { Header } from '~/components/header'
import { Item } from '~/components/item'
import { usePageDataQuery } from '~/hooks/page'

export const IndexPage = () => {
  const { data: pageList } = usePageDataQuery()

  return (
    <>
      <Header />
      <ul className="list">
        {pageList?.map((page) => (
          <Item page={page} />
        ))}
      </ul>
    </>
  )
}
