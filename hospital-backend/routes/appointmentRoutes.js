const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM appointment');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});


// Add a new appointment
router.post('/', async (req, res) => {
    const { patient_id, doctor_id, department, date, time, remarks } = req.body;

    try {
        const status = 'Scheduled'; // Default to 'Scheduled'
        await pool.query(
            `INSERT INTO appointment (patient_id, doctor_id, department, date, time, status, remarks)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [patient_id, doctor_id, department, date, time, status, remarks]
        );
        res.status(201).json({ message: 'Appointment added successfully' });
    } catch (err) {
        console.error('Error adding appointment:', err);
        res.status(500).json({ error: 'Failed to add appointment' });
    }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM appointment WHERE id = $1', [id]);
        res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        console.error('Error deleting appointment:', err);
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
});

module.exports = router;
