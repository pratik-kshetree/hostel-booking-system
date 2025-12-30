
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },
  roomName: String,
  price: Number,
  quantity: Number,
  checkInDate: String,
  checkOutDate: String,
  totalAmount: Number,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
