const express = require('express');
const { createEvent, getAllEvents, registerForEvent } = require('../controllers/eventController');
const { isOrganizer } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', isOrganizer, createEvent);
router.get('/', getAllEvents);
router.post('/:eventId/register', registerForEvent);

module.exports = router;

