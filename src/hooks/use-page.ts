import useSWR, { useSWRConfig } from "swr"
import { Page } from "~/types/page"

export const usePageGet = () => {
  const { data: pageList } = useSWR<Page[]>("/api/get")

  return { pageList }
}

export const usePageDelete = () => {
  const { mutate } = useSWRConfig()

  const deletePage = async (id: string) => {
    await fetch("/api/del", { method: "DELETE", body: JSON.stringify({ id }) })
    await mutate("/api/get")
  }

  return { deletePage }
}
