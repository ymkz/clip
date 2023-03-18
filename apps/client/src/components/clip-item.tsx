import { Clip } from '@clip/common'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useCallback } from 'react'
import { deleteClip } from '../api/clip'
import { IconDelete } from './icon-delete'
import { IconImage } from './icon-image'

type ClipItemProps = {
  clip: Clip
}

export const ClipItem: FC<ClipItemProps> = ({ clip }) => {
  const queryClient = useQueryClient()

  const clipDeleteMutation = useMutation({
    mutationFn: deleteClip,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['ClipList'] })
    },
  })

  const handleClick = useCallback(() => {
    clipDeleteMutation.mutate({ id: clip.id })
  }, [clip.id])

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
