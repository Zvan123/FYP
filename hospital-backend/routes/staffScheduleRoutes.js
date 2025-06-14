const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // adjust if needed

// GET all staff schedules
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT staff_id, day, time_slot FROM staff_schedule');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching staff schedules:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT update all staff schedules
router.put('/', async (req, res) => {
    const { updates } = req.body;

    if (!Array.isArray(updates)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Delete existing schedule
        await client.query('DELETE FROM staff_schedule');

        // Re-insert new schedule
        for (const { staff_id, day, time_slot } of updates) {
            if (time_slot !== '-' && time_slot) {
                await client.query(
                    'INSERT INTO staff_schedule (staff_id, day, time_slot) VALUES ($1, $2, $3)',
                    [staff_id, day, time_slot]
                );
            }
        }

        await client.query('COMMIT');
        res.json({ message: 'Schedule updated successfully' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error updating schedule:', err);
        res.status(500).json({ error: 'Failed to update schedule' });
    } finally {
        client.release();
    }
});

module.exports = router;
