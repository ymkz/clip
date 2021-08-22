import { SVGProps } from 'react'

export function IconLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        d="M32 80l96 56l96-56l-96-56l-96 56z"
        opacity=".2"
        fill="currentColor"
      ></path>
      <path
        d="M219.969 169.09L128 222.738L36.031 169.09a8 8 0 0 0-8.062 13.82l96 56a8 8 0 0 0 8.062 0l96-56a8 8 0 0 0-8.062-13.82z"
        fill="currentColor"
      ></path>
      <path
        d="M219.969 121.09L128 174.738L36.031 121.09a8 8 0 0 0-8.062 13.82l96 56a8 8 0 0 0 8.062 0l96-56a8 8 0 0 0-8.062-13.82z"
        fill="currentColor"
      ></path>
      <path
        d="M27.969 86.91l96 56a8 8 0 0 0 8.062 0l96-56a8 8 0 0 0 0-13.82l-96-56a8 8 0 0 0-8.062 0l-96 56a8 8 0 0 0 0 13.82zM128 33.262L208.123 80L128 126.738L47.877 80z"
        fill="currentColor"
      ></path>
    </svg>
  )
}
