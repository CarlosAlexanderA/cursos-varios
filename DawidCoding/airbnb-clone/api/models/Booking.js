import mongoose, { Schema } from 'mongoose'

const bookingSchema = new Schema({
  place: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Place' },
  user: { type: mongoose.Schema.Types.ObjectId, require: true },
  checkIn: { type: Date, require: true },
  checkOut: { type: Date, require: true },
  name: { type: String, require: true },
  phone: { type: String, require: true },
  price: Number
})

export const BookingModel = mongoose.model('Booking', bookingSchema)
