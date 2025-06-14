const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all staff with optional filters
router.get('/', async (req, res) => {
    const { role, department, shift } = req.query;

    try {
        let query = `
            SELECT s.*, r.name AS role_name, d.name AS department_name
            FROM staff s
            JOIN role r ON s.role_id = r.role_id
            JOIN department d ON r.department_id = d.department_id
            WHERE 1=1
        `;
        const params = [];

        if (role) {
            params.push(role);
            query += ` AND r.name = $${params.length}`;
        }

        if (department) {
            params.push(department);
            query += ` AND d.name = $${params.length}`;
        }

        if (shift) {
            params.push(shift);
            query += ` AND s.shift = $${params.length}`;
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching staff:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Helper to generate staff ID with department prefix
function generateStaffId(prefix) {
    const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}${randomSixDigits}`;
}

// POST: Add new staff
router.post('/', async (req, res) => {
    const { name, gender, email, phone, role, shift } = req.body;

    // Validate required fields
    if (!name || !gender || !email || !phone || !role || !shift) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Get role_id and department_id
        const roleResult = await pool.query(`SELECT * FROM role WHERE name = $1`, [role]);
        if (roleResult.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid role' });
        }
        const role_id = roleResult.rows[0].role_id;
        const department_id = roleResult.rows[0].department_id;

        // Get department name
        const deptResult = await pool.query(`SELECT name FROM department WHERE department_id = $1`, [department_id]);
        const department = deptResult.rows[0].name;

        // Determine staff ID prefix
        let prefix = 'XX';
        if (department === 'Core Medical') prefix = 'CM';
        else if (department === 'Administrative & Support') prefix = 'AS';
        else if (department === 'Paramedical') prefix = 'P';

        const staff_id = generateStaffId(prefix);

        // Insert new staff
        const insertQuery = `
            INSERT INTO staff (staff_id, name, gender, email, phone, role_id, shift)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const result = await pool.query(insertQuery, [
            staff_id, name, gender, email, phone, role_id, shift
        ]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating staff:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET: Fetch a specific staff by staff_id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`
            SELECT s.*, r.name AS role_name, d.name AS department_name
            FROM staff s
            JOIN role r ON s.role_id = r.role_id
            JOIN department d ON r.department_id = d.department_id
            WHERE s.staff_id = $1
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Staff not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching staff details:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// DELETE: Remove staff by ID (with cascading deletions)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Delete from staff_schedule
        await pool.query('DELETE FROM staff_schedule WHERE staff_id = $1', [id]);

        // Delete from appointment (if applicable)
        await pool.query('DELETE FROM appointment WHERE staff_id = $1', [id]);

        // Now delete from staff
        const result = await pool.query('DELETE FROM staff WHERE staff_id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Staff not found' });
        }

        res.json({ message: 'Staff deleted', staff: result.rows[0] });
    } catch (err) {
        console.error('Error deleting staff:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
