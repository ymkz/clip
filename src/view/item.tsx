import React from "react"
import { useClipDelete } from "~/view/hooks"
import { IconDelete } from "~/view/icon-delete"
import { IconImage } from "~/view/icon-image"

type Props = {
  clip: ClipItem
}

export const Item = ({ clip }: Props): JSX.Element => {
  const { deleteClip } = useClipDelete()

  const handleClick = () => {
    deleteClip(clip.id)
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
        {clip.imageUrl ? (
          <img
            className="clip-item__image--exist"
            loading="lazy"
            src={clip.imageUrl}
          />
        ) : (
          <div className="clip-item__image--empty">
            <IconImage width={20} height={20} />
          </div>
        )}
      </div>
      <IconDelete
        className="clip-item__delete"
        width={20}
        height={20}
        onClick={handleClick}
      />
    </li>
  )
}
