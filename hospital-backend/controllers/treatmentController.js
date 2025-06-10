const pool = require('../config/db');

// Create a new treatment
exports.createTreatment = async (req, res) => {
    const { treatment_name, description, department_id, cost } = req.body;

    try {
        const insertQuery = `
            INSERT INTO treatments (treatment_name, description, department_id, cost)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;

        const result = await pool.query(insertQuery, [treatment_name, description, department_id, cost]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating treatment:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get all treatments
exports.getAllTreatments = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM treatments');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching treatments:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get a single treatment by ID
exports.getTreatmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM treatments WHERE treatment_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Treatment not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching treatment by ID:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Update a treatment by ID
exports.updateTreatment = async (req, res) => {
    const { id } = req.params;
    const { treatment_name, description, department_id, cost } = req.body;

    try {
        const updateQuery = `
            UPDATE treatments
            SET treatment_name = $1, description = $2, department_id = $3, cost = $4
            WHERE treatment_id = $5
            RETURNING *;
        `;

        const result = await pool.query(updateQuery, [treatment_name, description, department_id, cost, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Treatment not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating treatment:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Delete a treatment by ID
exports.deleteTreatment = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM treatments WHERE treatment_id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Treatment not found' });
        }

        res.status(200).json({ message: 'Treatment deleted successfully' });
    } catch (error) {
        console.error('Error deleting treatment:', error.message);
        res.status(500).send('Internal server error');
    }
};
