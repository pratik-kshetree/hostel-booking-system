import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import Navbar from "./Navbar";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [authUser] = useAuth();

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.put(
          `http://localhost:4001/booking/user/cancel/${bookingId}`,
          {}
        );
        alert("Booking cancelled successfully");
        // Remove cancelled booking from list
        setBookings(bookings.filter(b => b._id !== bookingId));
      } catch (error) {
        alert("Failed to cancel booking");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!authUser) return;

    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4001/booking/user/${authUser._id}`
        );
        setBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, [authUser]);

  return (
    <>
    <Navbar />
    <div className="min-h-screen mx-auto p-6 mt-16">
      <h1 className="text-2xl font-bold mb-4 ">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border p-4 rounded-lg shadow"
            >
              <h2 className="font-semibold text-lg text-pink-400">
                Room: {booking.roomName} <span className="text-black text-sm dark:text-white">({booking.category})</span>
              </h2>

              {/* <p>Check-in: {booking.checkInDate}</p>
              <p>Check-out: {booking.checkOutDate}</p> */}

              {/* this too laso write but it is giving time too */}

              <p>Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</p>
              <p>Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
              <p>Quantity: {booking.quantity}</p>

              <p className="font-bold">
                Total Amount: Rs {booking.totalAmount}
              </p>

              <p>Status:<span className={` ml-2 px-1 py-0.5 rounded text-white text-sm ${
                booking.status === "pending" ? "bg-yellow-500" : 
                booking.status ==="confirmed" ? "bg-green-500" : "bg-red-400"
              }
              
              `}>{booking.status.toUpperCase()}</span>
              </p>

              {booking.status === "pending" && (
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="mt-2 px-1.5 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg "
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default MyBookings;
