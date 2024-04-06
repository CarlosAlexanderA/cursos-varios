import React, { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import axios from 'axios'
import { PlaceImg } from '../components/PlaceImg'
import { Link } from 'react-router-dom'
import { BookingDates } from '../components/BookingDates'
export function BookingsPage() {
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    axios.get('/bookings').then(res => {
      setBookings(res.data)
    })
  }, [])
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map(item => (
            <Link
              to={`/account/bookings/${item._id}`}
              key={item.id}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
              <div className="w-48 ">
                <PlaceImg place={item.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl font-medium">{item.place.title} </h2>

                <div className="text-xl ">
                  <BookingDates booking={item} className="text-gray-600 py-2" />
                  <div className="flex gap-1 items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                    <span className="text-xl">Total Price: ${item.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
