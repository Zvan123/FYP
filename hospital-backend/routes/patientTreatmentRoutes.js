const express = require('express');
const router = express.Router();
const patientTreatmentController = require('../controllers/patientTreatmentController');

// Create a new patient treatment record
router.post('/', patientTreatmentController.createPatientTreatment);

// Get all treatments for a specific patient
router.get('/', patientTreatmentController.getAllTreatments);

// Get a specific treatment by its ID
router.get('/:id', patientTreatmentController.getTreatmentById); // Added this line

// Update a patient treatment record
router.put('/:id', patientTreatmentController.updatePatientTreatment);

// Delete a patient treatment record
router.delete('/:id', patientTreatmentController.deletePatientTreatment);

module.exports = router;
