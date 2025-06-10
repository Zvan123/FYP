const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/', patientController.createPatient);           // POST /api/patients
router.get('/', patientController.getAllPatients);           // GET /api/patients
router.get('/:id', patientController.getPatientById);        // GET /api/patients/:id
router.put('/:id', patientController.updatePatient);         // PUT /api/patients/:id
router.delete('/:id', patientController.deletePatient);      // DELETE /api/patients/:id

module.exports = router;
