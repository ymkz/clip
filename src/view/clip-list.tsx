import React from 'react'
import { useClips } from '~/view/clip-hook'
import { ClipItem } from '~/view/clip-item'

export function ClipList() {
  const { clips } = useClips()

  return (
    <ul className="clip-list">
      {clips?.map((clip) => (
        <ClipItem key={clip.id} clip={clip} />
      ))}
    </ul>
  )
}
