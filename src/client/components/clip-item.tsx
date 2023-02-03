import { useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { ClipSchema } from '../../schema/clip'
import { trpc } from '../../util/trpc'
import { IconDelete } from './icon-delete'
import { IconImage } from './icon-image'

type ClipItemProps = {
  clip: ClipSchema
}

export const ClipItem: FC<ClipItemProps> = ({ clip }) => {
  const queryClient = useQueryClient()
  const mutation = trpc.clip.remove.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.clip.list.getQueryKey())
    },
  })

  const handleClick = () => {
    mutation.mutate({ id: clip.id })
  }

  return (
    <li className="clip-item">
      <a
        className="clip-item__link"
        target="_blank"
        rel="noreferrer"
        href={clip.url}
      />
      <div className="clip-item__info">
        <div className="clip-item__title">{clip.title}</div>
        <div className="clip-item__url">{clip.url}</div>
        <div className="clip-item__description">{clip.description}</div>
      </div>
      <div className="clip-item__image">
        {clip.hasImage ? (
          <img
            className="clip-item__image--exist"
            loading="lazy"
            src={`/image/${clip.id}`}
          />
        ) : (
          <div className="clip-item__image--empty">
            <IconImage width={20} height={20} />
          </div>
        )}
      </div>
      <IconDelete
        className="clip-item__delete"
        width={16}
        height={16}
        onClick={handleClick}
      />
    </li>
  )
}
