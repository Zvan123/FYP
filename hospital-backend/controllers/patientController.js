const pool = require('../config/db');

// Create a new patient
exports.createPatient = async (req, res) => {
    const {
        full_name, date_of_birth, gender, phone, email, address,
        emergency_contact_name, emergency_contact_relation,
        emergency_contact_phone, national_id
    } = req.body;

    try {
        const insertQuery = `
            INSERT INTO patients (
                full_name, date_of_birth, gender, phone, email, address,
                emergency_contact_name, emergency_contact_relation,
                emergency_contact_phone, national_id
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING *;
        `;

        const result = await pool.query(insertQuery, [
            full_name, date_of_birth, gender, phone, email, address,
            emergency_contact_name, emergency_contact_relation,
            emergency_contact_phone, national_id
        ]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating patient:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patients');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching patients:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get a single patient by ID
exports.getPatientById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM patients WHERE patient_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching patient by ID:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Update a patient
exports.updatePatient = async (req, res) => {
    const { id } = req.params;
    const {
        full_name, date_of_birth, gender, phone, email, address,
        emergency_contact_name, emergency_contact_relation,
        emergency_contact_phone, national_id
    } = req.body;

    try {
        const updateQuery = `
            UPDATE patients
            SET full_name = $1,
                date_of_birth = $2,
                gender = $3,
                phone = $4,
                email = $5,
                address = $6,
                emergency_contact_name = $7,
                emergency_contact_relation = $8,
                emergency_contact_phone = $9,
                national_id = $10
            WHERE patient_id = $11
            RETURNING *;
        `;

        const result = await pool.query(updateQuery, [
            full_name, date_of_birth, gender, phone, email, address,
            emergency_contact_name, emergency_contact_relation,
            emergency_contact_phone, national_id, id
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating patient:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM patients WHERE patient_id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error('Error deleting patient:', error.message);
        res.status(500).send('Internal server error');
    }
};
