import { json, LoaderFunction, useLoaderData } from "remix"
import { Item } from "~/components/clip-item"
import { getAll } from "~/utils/clip-kv"

export const loader: LoaderFunction = async () => {
  const data = await getAll(DB)
  return json(data)
}

export default function Index() {
  const clips = useLoaderData<ClipItem[]>()
  return (
    <ul className="clip-list">
      {clips.map((clip) => (
        <Item key={clip.id} clip={clip} />
      ))}
    </ul>
  )
}
