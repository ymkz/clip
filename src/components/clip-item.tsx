import { FC, useCallback } from 'react'
import { LongPressDetectEvents, useLongPress } from 'use-long-press'
import { useDeleteClipMutation } from '../hooks/clip'
import { IconDelete } from './icon-delete'
import { IconImage } from './icon-image'

type Props = {
  clip: ClipItem
}

export const ClipItem: FC<Props> = ({ clip }) => {
  const { deleteClip } = useDeleteClipMutation()

  const callback = useCallback(() => {
    const confirmed = confirm('削除しますか？')
    if (confirmed) {
      deleteClip(clip.id)
    }
  }, [])

  const bind = useLongPress(callback, {
    detect: LongPressDetectEvents.TOUCH,
    threshold: 1000,
  })

  const handleClick = () => {
    deleteClip(clip.id)
  }

  return (
    <li className="clip-item" {...bind()}>
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
