const Event = require('../models/Event');
const Registration = require('../models/Registration');

exports.createEvent = async (req, res) => {
    const { name, type, date, location, capacity } = req.body;
    try {
        const newEvent = new Event({ name, type, date, location, capacity });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
};

exports.registerForEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event || event.registrations.length >= event.capacity) {
        return res.status(400).json({ message: 'Event is full or does not exist' });
    }

    const registration = new Registration({ userId, eventId });
    await registration.save();
    event.registrations.push(registration._id);
    await event.save();
    res.status(200).json({ message: 'Successfully registered for event' });
};
