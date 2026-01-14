// import axios from 'axios';
// import Booking from "../model/booking.model.js";

// // INITIATE ESEWA PAYMENT
// export const initiateEsewaPayment = async (req, res) => {
//   try {
//     const { bookingData } = req.body;
//     const { userId, roomId, totalAmount, checkInDate, checkOutDate, quantity, roomName, price, category } = bookingData;

//     // Create booking with pending payment status
//     const booking = new Booking({
//       userId,
//       roomId,
//       roomName,
//       price,
//       quantity,
//       checkInDate,
//       checkOutDate,
//       totalAmount,
//       category,
//       status: "pending",
//       paymentStatus: "pending"
//     });

//     await booking.save();

//     // eSewa Payment Setup
//     const esewaConfig = {
//       merchantCode: process.env.ESEWA_MERCHANT_CODE || "EPAYTEST",
//       successUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment-success`,
//       failureUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment-failed`,
//       amount: totalAmount
//     };

//     res.json({
//       success: true,
//       bookingId: booking._id,
//       esewaConfig,
//       message: "Booking initiated, proceed to payment"
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // VERIFY ESEWA PAYMENT
// // export const verifyEsewaPayment = async (req, res) => {
// //   try {
// //     const { bookingId, esewaRefId, status } = req.body;

// //     if (!bookingId || !esewaRefId) {
// //       return res.status(400).json({ error: "Missing payment details" });
// //     }

// //     // Verify with eSewa server
// //     const verifyResponse = await axios.get(
// //       `https://uat.esewa.com.np/epay/main`,
// //       {
// //         params: {
// //           merchantCode: process.env.ESEWA_MERCHANT_CODE || "EPAYTEST",
// //           refId: esewaRefId
// //         }
// //       }
// //     );

// //     if (verifyResponse.data.status === "COMPLETE") {
// //       // Update booking with successful payment
// //       const updatedBooking = await Booking.findByIdAndUpdate(
// //         bookingId,
// //         {
// //           paymentStatus: "completed",
// //           esewaRefId,
// //           transactionId: esewaRefId,
// //           status: "confirmed"
// //         },
// //         { new: true }
// //       );

// //       return res.json({
// //         success: true,
// //         message: "Payment verified and booking confirmed",
// //         booking: updatedBooking
// //       });
// //     } else {
// //       // Update booking with failed payment
// //       await Booking.findByIdAndUpdate(bookingId, {
// //         paymentStatus: "failed",
// //         status: "cancelled"
// //       });

// //       return res.status(400).json({
// //         success: false,
// //         message: "Payment verification failed"
// //       });
// //     }

// //   } catch (error) {
// //     console.log("eSewa verification error:", error.message);
// //     res.status(500).json({ error: "Payment verification error" });
// //   }
// // };
// export const verifyEsewaPayment = async (req, res) => {
//   try {
//     const { bookingId, esewaRefId } = req.body;

//     if (!bookingId || !esewaRefId) {
//       return res.status(400).json({ error: "Missing payment details" });
//     }

//     const response = await axios.post(
//       "https://uat.esewa.com.np/epay/transrec",
//       null,
//       {
//         params: {
//           amt: 0, // optional
//           scd: process.env.ESEWA_MERCHANT_CODE || "EPAYTEST",
//           rid: esewaRefId,
//           pid: bookingId
//         }
//       }
//     );

//     if (response.data.includes("Success")) {
//       const updatedBooking = await Booking.findByIdAndUpdate(
//         bookingId,
//         {
//           paymentStatus: "completed",
//           esewaRefId,
//           transactionId: esewaRefId,
//           status: "confirmed"
//         },
//         { new: true }
//       );

//       return res.json({
//         success: true,
//         booking: updatedBooking
//       });
//     } else {
//       await Booking.findByIdAndUpdate(bookingId, {
//         paymentStatus: "failed",
//         status: "cancelled"
//       });

//       return res.status(400).json({ success: false });
//     }
//   } catch (error) {
//     console.log("Verify error:", error.message);
//     res.status(500).json({ error: "Verification failed" });
//   }
// };

// // GET BOOKING STATUS
// export const getBookingStatus = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.bookingId);
//     if (!booking) {
//       return res.status(404).json({ error: "Booking not found" });
//     }
//     res.json(booking);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
