const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventController');
const auth = require('../middlewares/auth');

router.post('/create', auth, EventController.createEvent);
router.get('/', EventController.listEvents);
router.put('/:id/edit', auth, EventController.updateEvent);
router.delete('/:id/delete', auth, EventController.deleteEvent);

module.exports = router;
