const pool = require('../config/db');  // Import the pool object for DB connection
const patientTreatmentModel = require('../models/patientTreatment');

// Create a new patient treatment record
exports.createPatientTreatment = async (req, res) => {
    const { patient_id, treatment_id, treatment_date, status, cost, notes } = req.body;

    try {
        const newTreatment = await patientTreatmentModel.createPatientTreatment(
            patient_id, treatment_id, treatment_date, status, cost, notes
        );
        res.status(201).json(newTreatment);
    } catch (error) {
        console.error('Error creating patient treatment record:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get all patient treatment records
exports.getAllTreatments = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patient_treatments');  // Use pool to query DB
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching all patient treatment records:', error.message);
        console.error('Stack trace:', error.stack);  // Added for more detailed error info
        res.status(500).send('Internal server error');
    }
};

// Get a treatment record by its ID
exports.getTreatmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const treatment = await patientTreatmentModel.getTreatmentById(id);

        if (!treatment) {
            return res.status(404).json({ message: 'Treatment record not found' });
        }

        res.status(200).json(treatment);
    } catch (error) {
        console.error('Error retrieving patient treatment record by ID:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Update a patient treatment record
exports.updatePatientTreatment = async (req, res) => {
    const { id } = req.params;
    const { treatment_date, status, cost, notes } = req.body;

    try {
        const updatedTreatment = await patientTreatmentModel.updatePatientTreatment(
            id, treatment_date, status, cost, notes
        );

        if (!updatedTreatment) {
            return res.status(404).json({ message: 'Treatment record not found' });
        }

        res.status(200).json(updatedTreatment);
    } catch (error) {
        console.error('Error updating patient treatment record:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Delete a patient treatment record
exports.deletePatientTreatment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTreatment = await patientTreatmentModel.deletePatientTreatment(id);

        if (!deletedTreatment) {
            return res.status(404).json({ message: 'Treatment record not found' });
        }

        res.status(200).json({ message: 'Treatment record deleted successfully' });
    } catch (error) {
        console.error('Error deleting patient treatment record:', error.message);
        res.status(500).send('Internal server error');
    }
};
