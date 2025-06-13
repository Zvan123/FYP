const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const { role, department, shift } = req.query;
        let query = 'SELECT * FROM staff';
        let conditions = [];
        let values = [];

        if (role) {
            conditions.push(`role = $${values.length + 1}`);
            values.push(role);
        }
        if (department) {
            conditions.push(`department = $${values.length + 1}`);
            values.push(department);
        }
        if (shift) {
            conditions.push(`shift = $${values.length + 1}`);
            values.push(shift);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching staff:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// POST /api/staff
router.post('/', async (req, res) => {
    const { name, phone, email, role, department, shift } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO staff (name, phone, email, role, department, shift)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, phone, email, role, department, shift]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating staff:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /api/staff/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, role, department, contact } = req.body;

    try {
        const result = await pool.query(
            'UPDATE staff SET name = $1, role = $2, department = $3, contact = $4 WHERE id = $5 RETURNING *',
            [name, role, department, contact, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating staff:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /api/staff/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM staff WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting staff:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
