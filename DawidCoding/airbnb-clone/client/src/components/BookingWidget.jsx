import React, { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'

export function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  let numberOfNights = 0
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    )
  }
  const bookThisPlace = () => {
    const data = { checkIn, checkOut, numberOfGuests, name, phone }
    axios.post('/bookings')
  }
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-2xl text-center">
        Price: ${place.price} / per night
      </h2>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label> Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-t">
            <label> Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={e => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label> Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={e => setNumberOfGuests(e.target.value)}
          />
        </div>
      </div>
      {numberOfNights > 0 && (
        <div className="py-3 px-4 border-t">
          <label> Your full name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label>Phone number:</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
      )}
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>
    </div>
  )
}
