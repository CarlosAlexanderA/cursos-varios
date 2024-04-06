import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BookingWidget } from '../components/BookingWidget'
import { PlaceGallery } from '../components/PlaceGallery'
import { AddressLink } from '../components/AddressLink'

export function PlacePage() {
  const { id } = useParams()
  const [place, setPlace] = useState(null)
  useEffect(() => {
    if (!id) return
    axios.get(`/places/${id}`).then(res => {
      setPlace(res.data)
    })
  }, [id])
  if (!place) return ''

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 my-8">
        <div>
          <div className="my-4 ">
            <h2 className="font-semibold text-2xl">Description</h2>
            <p className="mt-2">{place.description}</p>
          </div>
          <p>Check-in: {place.checkIn}</p>
          <p>Check-out: {place.checkOut}</p>
          <p>Max number of guests: {place.maxGuests}</p>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-medium text-xl">Extra info</h2>
        </div>
        <p className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </p>
      </div>
    </div>
  )
}
