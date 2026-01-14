
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
  checkInDate: Date,
  checkOutDate: Date,
  totalAmount: Number,
  category: String,
  status: {
    type: String,
    default: "pending"
  },
  // paymentStatus: {   // new field for payment status
  //   type: String,
  //   default: "pending",
  //   enum: ["pending", "completed", "failed", "cancelled"]
  // },
  // transactionId: String,
  // esewaRefId: String
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
