const pool = require('../config/db');

// Create a new staff member
exports.createStaff = async (req, res) => {
    const { first_name, last_name, role_id, department_id, phone, email, hire_date, salary } = req.body;

    try {
        const insertQuery = `
            INSERT INTO staff (first_name, last_name, role_id, department_id, phone, email, hire_date, salary)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

        const result = await pool.query(insertQuery, [first_name, last_name, role_id, department_id, phone, email, hire_date, salary]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating staff:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get all staff members
exports.getAllStaff = async (req, res) => {
    try {
        const result = await pool.query(`
  SELECT s.*, r.name AS role_name
  FROM staff s
  LEFT JOIN roles r ON s.role_id = r.id
`);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching staff:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get a single staff member by ID
exports.getStaffById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM staff WHERE staff_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching staff by ID:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Update a staff member by ID
exports.updateStaff = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, role_id, department_id, phone, email, hire_date, salary } = req.body;

    try {
        const updateQuery = `
            UPDATE staff
            SET first_name = $1, last_name = $2, role_id = $3, department_id = $4, phone = $5, email = $6, hire_date = $7, salary = $8
            WHERE staff_id = $9
            RETURNING *;
        `;

        const result = await pool.query(updateQuery, [first_name, last_name, role_id, department_id, phone, email, hire_date, salary, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating staff:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Delete a staff member by ID
exports.deleteStaff = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM staff WHERE staff_id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        res.status(200).json({ message: 'Staff member deleted successfully' });
    } catch (error) {
        console.error('Error deleting staff:', error.message);
        res.status(500).send('Internal server error');
    }
};
