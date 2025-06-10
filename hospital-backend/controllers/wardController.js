const pool = require('../config/db');

// Create a new ward
exports.createWard = async (req, res) => {
    const { ward_name, capacity } = req.body;

    try {
        const insertQuery = `
            INSERT INTO wards (ward_name, capacity)
            VALUES ($1, $2)
            RETURNING *;
        `;

        const result = await pool.query(insertQuery, [ward_name, capacity]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating ward:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get all wards
exports.getAllWards = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM wards');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching wards:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get a single ward by ID
exports.getWardById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM wards WHERE ward_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Ward not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching ward by ID:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Update a ward by ID
exports.updateWard = async (req, res) => {
    const { id } = req.params;
    const { ward_name, capacity } = req.body;

    try {
        const updateQuery = `
            UPDATE wards
            SET ward_name = $1, capacity = $2
            WHERE ward_id = $3
            RETURNING *;
        `;

        const result = await pool.query(updateQuery, [ward_name, capacity, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Ward not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating ward:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Delete a ward by ID
exports.deleteWard = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM wards WHERE ward_id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Ward not found' });
        }

        res.status(200).json({ message: 'Ward deleted successfully' });
    } catch (error) {
        console.error('Error deleting ward:', error.message);
        res.status(500).send('Internal server error');
    }
};
