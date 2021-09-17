import React from 'react'

export function IconImage(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      focusable="false"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        d="M224 159.995V48a16.018 16.018 0 0 0-16-16H48a16.018 16.018 0 0 0-16 16v160a16.018 16.018 0 0 0 16 16h160a16.018 16.018 0 0 0 16-16v-48.005zM208 48l.006 92.691L179.314 112a16.019 16.019 0 0 0-22.628 0l-44.685 44.686L91.314 136a16.022 16.022 0 0 0-22.628 0L48 156.686V48zm0 160H48v-28.686l32-32l20.686 20.687a16.019 16.019 0 0 0 22.628 0l44.685-44.687l40.008 40.008l.003 44.678zM91.514 100.485A12 12 0 1 1 112 92v.004a12 12 0 0 1-20.486 8.481z"
        fill="currentColor"
      ></path>
    </svg>
  )
}
