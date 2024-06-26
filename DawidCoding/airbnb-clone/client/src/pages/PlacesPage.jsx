import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountNav from '../components/AccountNav'
import axios from 'axios'
import { PlaceImg } from '../components/PlaceImg'

export function PlacesPage() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
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
      <div className="mt-4 flex flex-col gap-4">
        {places.length > 0 &&
          places.map((place, index) => (
            <Link
              to={`/account/places/${place._id}`}
              key={index}
              className="flex gap-4 bg-gray-200 rounded-2xl p-4 cursor-pointer hover:bg-gray-300/70 transition-colors duration-200">
              <div className="w-32 h-32 bg-gray-300 shrink-0 relative">
                <PlaceImg place={place} />
              </div>
              <div>
                <h2 className="text-xl font-medium">{place.title}</h2>
                <p className="text-sm mt-2 line-clamp-4 ">
                  {place.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
