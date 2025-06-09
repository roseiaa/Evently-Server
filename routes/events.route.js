const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateToken");
const EventModel = require("../models/event.model");


router.post("/create-event", validateToken, async (req, res) => {
    try {
        // creats a new event
        const event = await EventModel.create(req.body);
        return res.status(201).json({ event, message: "Event created successfully" });
    }   catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put("/edit-event/:id", validateToken, async (req, res) => {
    try {
        //Edits an event with the ID in the parameters
        const event = await EventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ event, message: "Event updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
})

router.delete("/delete-event/:id", validateToken, async (req, res) => {
    try {
        //Deletes an event with the ID in the params
        await EventModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
})

router.get("/get-events", validateToken, async (req, res) => {
    try {
        //Gets all events
        const search = req.query.search;
        const date = req.query.date;
        
        const events = await EventModel.find({name: {$regex: new RegExp(search, "i"), }, 
        ...(date && {date})},).sort({ createdAt: -1 });
        return res.status(200).json({ data: events });

    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
})

router.get("/event/:id", validateToken, async (req, res) => {
    try {
        //Gets the event with the ID in the parms
        const event = await EventModel.findById(req.params.id);
        return res.status(200).json({ data: event });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
    
})

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;