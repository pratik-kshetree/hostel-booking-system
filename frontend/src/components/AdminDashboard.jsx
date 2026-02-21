import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [form, setForm] = useState({ name: "", price: "", category: "", image: "", title: "", features: "" });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  // Redirect if no token (unauthorized)
  if (!token) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-lg text-red-600 font-semibold">Unauthorized. Please log in.</p>
          <button 
            onClick={() => navigate("/admin/login")} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:4001/booking/admin/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        // sort newest first by createdAt
        const sorted = Array.isArray(res.data)
          ? res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : res.data;
        setBookings(sorted);
      } catch (error) {
        console.error(error);
        alert("Unauthorized or token expired");
      }
    };

    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:4001/room");
        setRooms(res.data);
      } catch (error) {
        console.error("Failed to fetch rooms", error);
      }
    };

    fetchBookings();
    fetchRooms();
  }, [token]);

  const bookingsRef = useRef(null);

  // const jumpToLatest = () => {
  //   if (bookingsRef.current) {
  //     bookingsRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  // Booking actions

  //Confirm Booking
  const confirmBooking = async (id) => {
    try {
      await axios.put(
        `http://localhost:4001/booking/admin/confirm/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking confirmed");
      window.location.reload();
    } catch (error) {
      alert("Failed to confirm booking");
    }
  };

// Cancel Booking
  const cancelBooking = async (id) => {
    try {
      await axios.put(
        `http://localhost:4001/booking/admin/cancel/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking cancelled");
      window.location.reload();
    } catch (error) {
      alert("Failed to cancel booking");
    }
  };

  // Room management
  const resetForm = () => {
    setForm({ name: "", price: "", category: "", image: "", title: "", features: "" });
    setImageFile(null);
    setEditingId(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const submitRoom = async () => {
    try {
      // Use FormData if file is present, otherwise use JSON
      let payload;
      let config = { headers: { Authorization: `Bearer ${token}` } };

      if (imageFile || !editingId) {
        // Use FormData for file upload
        payload = new FormData();
        payload.append("name", form.name);
        payload.append("price", Number(form.price));
        payload.append("category", form.category);
        payload.append("title", form.title);
        payload.append("features", form.features);
        if (imageFile) {
          payload.append("image", imageFile);
        }
        // Don't set Content-Type header, let browser do it for FormData
        config = { headers: { Authorization: `Bearer ${token}` } };
      } else {
        // Use JSON if only updating non-image fields
        payload = {
          name: form.name,
          price: Number(form.price),
          category: form.category,
          title: form.title,
          features: form.features
        };
      }

      if (editingId) {
        await axios.put(`http://localhost:4001/room/${editingId}`, payload, config);
        alert("Room updated");
      } else {
        await axios.post("http://localhost:4001/room", payload, config);
        alert("Room added");
      }

      // Reload page to show changes immediately
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to save room (check console)");
    }
  };

  const handleEdit = (r) => {
    setEditingId(r._id);
    setForm({
      name: r.name || "",
      price: r.price || "",
      category: r.category || "",
      image: r.image || "",
      title: r.title || "",
      features: Array.isArray(r.features) ? r.features.join(", ") : r.features || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this room?")) return;
    try {
      await axios.delete(`http://localhost:4001/room/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms((rs) => rs.filter((x) => x._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete room");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>

        {/* Room management */}
        <section className="bg-white p-6 rounded shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">Manage Rooms</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Name</label>
              <input name="name" value={form.name} onChange={handleFormChange} className="w-full p-2 border rounded" />

              <label className="block mt-3 mb-1">Price</label>
              <input name="price" value={form.price} onChange={handleFormChange} className="w-full p-2 border rounded" />

              <label className="block mt-3 mb-1">Category</label>
              <input name="category" value={form.category} onChange={handleFormChange} className="w-full p-2 border rounded" />

              <label className="block mt-3 mb-1">Image Upload</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
              {imageFile && <p className="text-sm text-green-600 mt-1">✓ {imageFile.name}</p>}
              <p className="text-xs text-gray-500 mt-2">Or paste image URL below if uploading file is not available</p>
              <label className="block mt-3 mb-1">Image URL (optional)</label>
              <input name="image" value={form.image} onChange={handleFormChange} placeholder="https://example.com/image.jpg" className="w-full p-2 border rounded" />
            </div>

            <div>
              <label className="block mb-1">Title</label>
              <input name="title" value={form.title} onChange={handleFormChange} className="w-full p-2 border rounded" />

              <label className="block mt-3 mb-1">Features (comma separated)</label>
              <input name="features" value={form.features} onChange={handleFormChange} className="w-full p-2 border rounded" />

              <div className="mt-4 flex gap-2">
                <button onClick={submitRoom} className="bg-blue-600 text-white px-4 py-2 rounded">
                  {editingId ? 'Update Room' : 'Add Room'}
                </button>
                <button onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded">Reset</button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Existing Rooms</h4>
            <div className="grid gap-3">
              {rooms.map(r => (
                <div key={r._id} className="p-3 border rounded flex justify-between items-center">
                  <div>
                    <div className="font-bold">{r.name} <span className="text-sm text-gray-500">({r.category})</span></div>
                    <div className="text-sm text-gray-600">Price: ₹{r.price}</div>
                    <div className="text-sm text-gray-600">{r.title}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(r)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                    <button onClick={() => handleDelete(r._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bookings management */}
        <section className="bg-white p-6 rounded shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold mb-4">Bookings</h3>
            <div className="flex">
              {/* <button onClick={jumpToLatest} className="bg-blue-500 text-white px-3 py-1 rounded">Jump to latest</button> */}
              <button onClick={() => window.location.reload()} className="bg-pink-200 px-3 py-1 mb-2 rounded">Reload</button>
            </div>
          </div>
            <div ref={bookingsRef} className="grid gap-4">
              {bookings.map(b => (
                <div key={b._id} className="bg-white p-4 rounded shadow">
                <p><b>User:</b> <span className="text-pink-600"> {b.userId?.fullname?.toUpperCase()} ({b.userId?.email})</span></p>
                <p><b>Room:</b> {b.roomName} [{b.category}]</p>
                <p><b>TotalAmount:</b> {" "} ₹{b.totalAmount}</p>
                <p><b>BookingTime:</b>{" "} 📅{new Date(b.createdAt).toLocaleString()}</p>
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
                  <p className="mt-2">
                    <button onClick={() => confirmBooking(b._id)} className="mx-2 px-2 py-1 bg-green-500 rounded text-white"> Confirm </button>
                    <button onClick={() => cancelBooking(b._id)} className="px-2 py-1 bg-red-500 rounded text-white text-center">Cancel </button>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
