import express from "express";
import { cancelBooking, confirmBooking, createBooking, 
    getAllBookings, getUserBookings, backfillBookingCategories } from "../controller/booking.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

// user
router.post("/create", createBooking);
router.get("/user/:userId", getUserBookings);
router.put("/user/cancel/:id", cancelBooking);

//admin
router.get("/admin/all",adminAuth,getAllBookings);
router.put("/admin/cancel/:id",adminAuth,cancelBooking)
router.put("/admin/confirm/:id",adminAuth,confirmBooking)
router.put("/admin/backfill-categories", adminAuth, backfillBookingCategories)

export default router;
