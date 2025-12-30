import express from "express";
import { createBooking, getUserBookings } from "../controller/booking.controller.js";

const router = express.Router();

router.post("/create", createBooking);
router.get("/user/:userId", getUserBookings);

export default router;
