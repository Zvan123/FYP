const pool = require('../config/db');

// Create a new department
exports.createDepartment = async (req, res) => {
    const { department_name, description } = req.body;

    try {
        const insertQuery = `
            INSERT INTO departments (department_name, description)
            VALUES ($1, $2)
            RETURNING *;
        `;

        const result = await pool.query(insertQuery, [department_name, description]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating department:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM departments');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching departments:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get a single department by ID
exports.getDepartmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM departments WHERE department_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching department by ID:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Update a department by ID
exports.updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { department_name, description } = req.body;

    try {
        const updateQuery = `
            UPDATE departments
            SET department_name = $1, description = $2
            WHERE department_id = $3
            RETURNING *;
        `;

        const result = await pool.query(updateQuery, [department_name, description, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating department:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Delete a department by ID
exports.deleteDepartment = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM departments WHERE department_id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        console.error('Error deleting department:', error.message);
        res.status(500).send('Internal server error');
    }
};
