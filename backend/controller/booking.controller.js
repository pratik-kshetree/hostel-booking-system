import Booking from "../model/booking.model.js";
import Room from "../model/room.model.js";

// USER

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({success: true, message: "Booking created", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// GET Booking of loggedin user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};

// -----------ADMIN-----------

// get all bookings for ADMIN
export const getAllBookings = async(req,res)=>{
  try{
    const bookings = await Booking.find()
    .populate("userId","fullname email")
    .populate("roomId", "roomName price");

  res.json(bookings);
  }catch(error){
    res.status(500).json(error);
  }
};

// cancel booking by ADMIN

export const cancelBooking = async (req,res)=>{
  try{
    await Booking.findByIdAndUpdate(req.params.id,{
      status:"cancelled",
    })
    res.json({message: "Booking cancelled"});
  }
  catch(error){
res.status(500).json(error);
  }
};

//confirm booking by admin
export const confirmBooking = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id,
       {status: "confirmed"},
       {new: true}
      
      );
    res.json({ message: "Booking confirmed" });
  } catch (error) {
    res.status(500).json(error);
  }
};
// PUT http://localhost:4001/booking/admin/backfill-categories
// Authorization: Bearer <adminToken>
// backfill missing booking categories from Room documents (admin only)
export const backfillBookingCategories = async (req, res) => {
  try {
    const missing = await Booking.find({
      $or: [
        { category: { $exists: false } },
        { category: null },
        { category: "" }
      ]
    });

    for (const b of missing) {
      if (!b.roomId) continue;
      const room = await Room.findById(b.roomId);
      if (room && room.category) {
        b.category = room.category;
        await b.save();
      }
    }

    res.json({ message: `Updated ${missing.length} bookings` });
  } catch (error) {
    res.status(500).json(error);
  }
};
