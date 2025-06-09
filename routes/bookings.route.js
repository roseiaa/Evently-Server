const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const BookingModel = require("../models/booking.model");
const EventModel = require("../models/event.model");

router.post("/create-booking", validateToken, async (req, res) => {
  try {

    req.body.user = req.user.userId;

    //create a booking
    const booking = await BookingModel.create(req.body);

    //update ticket quantity
    const event = await EventModel.findById(req.body.event);
    const ticketType = event.tickets;
    const updatedTickets = ticketType.map((ticket) => {
      if (ticket.name === req.body.ticketType) {
        ticket.booked =
          Number(ticket.booked ?? 0) + Number(req.body.ticketCount);
        ticket.available =
          Number(ticket.available ?? ticket.limit) -
          Number(req.body.ticketCount);
      }

      return ticket;
    });
    await EventModel.findByIdAndUpdate(req.body.event, {
      tickets: updatedTickets,
    });
    return res.status(201).json({ booking, message: "Booking created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/get-user-bookings", validateToken, async (req, res) => {
  try {
    //get bookings for a single user
    const bookings = await BookingModel.find({ user: req.user.userId }).populate("event");
    return res.status(200).json({ data: bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/get-all-bookings", async (req, res) => {
  try {
    //get booking information for all users
    const bookings = await BookingModel.find().populate("event").populate("user").sort({ createdAt: -1 });
    return res.status(200).json({ data: bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


module.exports = router;