import axios from 'axios'
import React, { useState } from 'react'
import { baseUrl } from '../constants'

export function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setphotoLink] = useState('')

  const addPhotoByLink = async e => {
    e.preventDefault()
    const { data: fileName } = await axios.post('/upload-by-link', {
      link: photoLink
    })

    onChange(prev => [...prev, fileName])
    setphotoLink('')
  }

  const uploadPhoto = async e => {
    const files = e.target.files
    const data = new FormData()

    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i])
    }
    const res = await axios.post('/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    const fileNames = res.data
    onChange(prev => [...prev, ...fileNames])
  }
  return (
    <>
      <div className="flex">
        <input
          type="text"
          placeholder="Add using a link ... .jpg"
          value={photoLink}
          onChange={e => setphotoLink(e.target.value)}
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 grow px-4 rounded-2xl">
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-[8rem] gap-2 ">
        {addedPhotos.length > 0 &&
          addedPhotos.map(link => (
            <div key={link}>
              <img
                className="rounded-2xl object-cover w-full h-full"
                src={`${baseUrl}/uploads/${link}`}
                alt="photo"
              />
            </div>
          ))}
        <label className="flex justify-center items-center gap-1 border bg-transparent rounded-2xl text-2xl text-gray-600 font-medium cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden "
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  )
}
