const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    organiser: {
        type: String,
        required: true,
    },
    guests: {
        type: Array,
        required: false,
        default: []
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postcode: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    media: {
        type: Array,
        required: false,
        default: []
    },
    tickets: {
        type: Array,
        required: false,
        default: []
    }
}, {timestamps: true});

const EventModel = mongoose.model("events", eventSchema);
module.exports = EventModel