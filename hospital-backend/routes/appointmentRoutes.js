const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);        // GET /api/patients/:id
router.put('/:id', appointmentController.updateAppointment);         // PUT /api/patients/:id
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
