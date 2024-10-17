// src/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Registration' }],
});

module.exports = mongoose.model('Event', eventSchema);
