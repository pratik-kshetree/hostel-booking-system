import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const res = await axios.get(
          "http://localhost:4001/booking/admin/all",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setBookings(res.data);
      } catch (error) {
        alert("Unauthorized or token expired")
      }
    };
    fetchBookings();
  }, []);
//confirm booking
  const confirmBooking = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.put(
        `http://localhost:4001/booking/admin/confirm/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Booking confirmed");
      // Refresh bookings list
      window.location.reload();
    } catch (error) {
      alert("Failed to confirm booking");
    }
  };

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.put(
        `http://localhost:4001/booking/admin/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Booking cancelled");
      // Refresh bookings list
      window.location.reload();
    } catch (error) {
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid gap-4">
        {bookings.map(b => (
          <div key={b._id} className="bg-white p-4 rounded shadow">
            <p><b>User:</b> <span className="text-pink-600"> {b.userId?.fullname?.toUpperCase()} ({b.userId?.email})</span></p>
            <p><b>Room:</b> {b.roomName}</p>
            <p><b>Status:</b>
              <span className={
                b.status === "cancelled" || b.status === "Cancelled"
                  ? "text-red-600"
                  : b.status === "confirmed" || b.status === "Confirmed"
                  ? "text-green-600"
                  : "text-yellow-600"
              }>
                {" "}{b.status}
              </span>
            </p>

            {b.status === "pending" && (
              <p>
                <button onClick={() => confirmBooking(b._id)}
                 className="mx-2 px-1 py-1 bg-green-500 rounded text-white"> Confirm </button>

                <button onClick={() => cancelBooking(b._id)} 
                className="px-1 py-1 bg-red-500 rounded text-white text-center">Cancel </button>

              </p>

            )}
          </div>
        ))}
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>

      </div>
    </div>
  );
}

export default AdminDashboard;
