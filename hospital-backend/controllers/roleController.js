const pool = require('../config/db');

// Create a new role
exports.createRole = async (req, res) => {
    const { role_name, description } = req.body;

    try {
        const insertQuery = `
            INSERT INTO roles (role_name, description)
            VALUES ($1, $2)
            RETURNING *;
        `;

        const result = await pool.query(insertQuery, [role_name, description]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating role:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM roles');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching roles:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get a single role by ID
exports.getRoleById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM roles WHERE role_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching role by ID:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Update a role by ID
exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { role_name, description } = req.body;

    try {
        const updateQuery = `
            UPDATE roles
            SET role_name = $1, description = $2
            WHERE role_id = $3
            RETURNING *;
        `;

        const result = await pool.query(updateQuery, [role_name, description, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating role:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Delete a role by ID
exports.deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM roles WHERE role_id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error('Error deleting role:', error.message);
        res.status(500).send('Internal server error');
    }
};
