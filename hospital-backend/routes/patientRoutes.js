const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all patients
router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM patient"); // ✅ must use SELECT *
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching patients:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get a single patient by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM patient WHERE patient_id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching patient by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const {
        full_name,
        gender,
        date_of_birth,
        phone,
        blood_type,
        address,
        medical_history
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO patient (name, gender, dob, contact, blood_type, address, medical_history)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [full_name, gender, date_of_birth, phone, blood_type, address, medical_history]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding patient:', error);
        res.status(500).json({ error: 'Failed to add patient' });
    }
});

// DELETE a patient by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM patient WHERE patient_id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error('Error deleting patient:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
