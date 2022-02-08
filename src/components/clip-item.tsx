import { Form } from "remix"
import { IconImage } from "~/components/icon-image"
import { IconRemove } from "~/components/icon-remove"

type Props = {
  clip: ClipItem
}

export const Item = ({ clip }: Props): JSX.Element => {
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
      <Form
        className="clip-item__delete--form"
        method="post"
        action="/api/remove"
        reloadDocument
      >
        <input hidden name="id" defaultValue={clip.id} />
        <button className="clip-item__delete--button" type="submit">
          <IconRemove
            className="clip-item__delete--icon"
            width={20}
            height={20}
          />
        </button>
      </Form>
    </li>
  )
}
