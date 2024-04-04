import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountNav from '../components/AccountNav'
import axios from 'axios'

export function PlacesPage() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places').then(({ data }) => {
      setPlaces(data)
    })
  }, [])

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to="/account/places/new">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place, index) => (
            <Link
              to={`/account/places/${place._id}`}
              key={index}
              className="flex gap-4 bg-gray-200 rounded-2xl p-4 cursor-pointer hover:bg-gray-300/70 transition-colors duration-200">
              <div className="w-32 h-32 bg-gray-300 shrink-0">
                {place.photos.length > 0 && (
                  <img
                    className="object-cover w-full h-full"
                    src={place.photos[0]}
                    alt={place.title}
                  />
                )}
              </div>
              <div>
                <h2 className="text-xl font-medium">{place.title}</h2>
                <p className="text-sm mt-2 ">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
