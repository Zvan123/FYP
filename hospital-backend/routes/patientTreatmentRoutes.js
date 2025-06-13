const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/patient_treatments/:patient_id
router.get('/:patient_id', async (req, res) => {
    const { patient_id } = req.params;
    try {
        const result = await pool.query(`
            SELECT t.name, pt.date_given
            FROM patient_treatment pt
            JOIN treatment t ON pt.treatment_id = t.treatment_id
            WHERE pt.patient_id = $1
            ORDER BY pt.date_given DESC
        `, [patient_id]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching patient treatments:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
