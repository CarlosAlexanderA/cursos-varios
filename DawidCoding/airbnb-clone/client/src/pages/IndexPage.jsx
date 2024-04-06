import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../constants'
import { Link } from 'react-router-dom'

export default function IndexPage() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places').then(res => {
      setPlaces(res.data)
    })
  }, [])

  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
      {places.length > 0 &&
        places.map((place, index) => (
          <Link to={`/place/${place._id}`} key={index}>
            {place.photos?.[0] && (
              <div className=" flex mb-2">
                <img
                  className=" object-cover w-full h-full aspect-square rounded-2xl"
                  src={`${baseUrl}/uploads/${place.photos?.[0]}`}
                  alt={place.title}
                />
              </div>
            )}
            <h2 className="text-sm truncate leading-font bold">
              {place.title}
            </h2>
            <h3 className="  text-sm truncate text-gray-500">
              {place.address}
            </h3>
            <p className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </p>
          </Link>
        ))}
    </div>
  )
}
