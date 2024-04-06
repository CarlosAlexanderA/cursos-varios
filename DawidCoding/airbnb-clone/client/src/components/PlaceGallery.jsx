import React, { useState } from 'react'
import { baseUrl } from '../constants'

export function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-w-full h-fit">
        <div className="p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-2 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {place.photos?.length > 0 &&
              place.photos.map((photo, index) => (
                <div key={index} className="flex items-center justify-center">
                  <img
                    src={`${baseUrl}/uploads/${photo}`}
                    alt=""
                    className="max-w-full h-auto"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="grid rounded-3xl overflow-hidden gap-2 grid-cols-[2fr_1fr] grid-rows-[600px]">
        <div>
          {place.photos?.[0] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square w-full h-full object-cover cursor-pointer "
              src={`${baseUrl}/uploads/${place.photos[0]}`}
              alt={place.title}
            />
          )}
        </div>
        <div className="grid gap-2 ">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square w-full h-full object-cover cursor-pointer "
              src={`${baseUrl}/uploads/${place.photos[1]}`}
              alt={place.title}
            />
          )}
          {place.photos?.[2] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square w-full h-full object-cover cursor-pointer "
              src={`${baseUrl}/uploads/${place.photos[2]}`}
              alt={place.title}
            />
          )}
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6">
          <path
            fillRule="evenodd"
            d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
            clipRule="evenodd"
          />
        </svg>
        show more photos
      </button>
    </div>
  )
}
