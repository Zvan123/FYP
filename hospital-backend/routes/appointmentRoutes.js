const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
    console.log('Received appointment data:', req.body); // 👈 Add this line

    const { patient_id, staff_id, appointment_date, appointment_time, reason } = req.body;

    if (!patient_id || !staff_id || !appointment_date || !appointment_time || !reason) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await pool.query(
            `INSERT INTO appointment (patient_id, staff_id, appointment_date, appointment_time, reason)
             VALUES ($1, $2, $3, $4, $5)`,
            [patient_id, staff_id, appointment_date, appointment_time, reason]
        );

        res.status(201).json({ message: 'Appointment created successfully' });
    } catch (err) {
        console.error('Error creating appointment:', err);
        res.status(400).json({ error: 'Failed to create appointment' });
    }
});

// ✅ Filtered GET route (patient_id is optional)
router.get('/', async (req, res) => {
    const { patient_id } = req.query;

    try {
        let query = `
            SELECT a.*, 
                   p.name AS patient_name, 
                   s.name AS doctor_name 
            FROM appointment a
            JOIN patient p ON a.patient_id = p.patient_id
            JOIN staff s ON a.staff_id = s.staff_id
        `;
        const values = [];

        if (patient_id) {
            query += ' WHERE a.patient_id = $1';
            values.push(patient_id);
        }

        query += ' ORDER BY a.appointment_date, a.appointment_time';

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM appointment WHERE appointment_id = $1', [id]);
        res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        console.error('Error deleting appointment:', err);
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
});

module.exports = router;
