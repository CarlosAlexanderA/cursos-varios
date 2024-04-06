import mongoose, { Schema } from 'mongoose'

const bookingSchema = new Schema({
  place: { type: mongoose.Schema.Types.ObjectId, require: true },
  chechIn: { type: Date, require: true },
  chechOut: { type: Date, require: true },
  name: { type: String, require: true },
  phone: { type: String, require: true },
  price: Number
})

export const BookingModel = mongoose.model('Booking', bookingSchema)
