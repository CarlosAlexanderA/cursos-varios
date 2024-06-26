import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AddressLink } from '../components/AddressLink'
import { PlaceGallery } from '../components/PlaceGallery'
import { BookingDates } from '../components/BookingDates'

export function BookingPage() {
  const { id } = useParams()
  const [booking, setBooking] = useState(null)
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(res => {
        const foundBooking = res.data.find(({ _id }) => _id === id)
        if (foundBooking) {
          setBooking(foundBooking)
        }
      })
    }
  }, [id])
  if (!booking) {
    return ''
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink>{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium mb-4">
            Your booking information
          </h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl ">
          <p className="flex justify-center items-center gap-2">
            Total price: <span className="text-2xl">${booking.price}</span>
          </p>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  )
}
