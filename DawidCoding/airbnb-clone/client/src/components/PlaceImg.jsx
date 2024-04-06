import React from 'react'
import { baseUrl } from '../constants'

export function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return ''
  }

  if (!className) {
    className = 'object-cover w-full h-full'
  }

  return (
    <img
      className={className}
      src={`${baseUrl}/uploads/${place.photos[index]}`}
      alt={place.title}
    />
  )
}
