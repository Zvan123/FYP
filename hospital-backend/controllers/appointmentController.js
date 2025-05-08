const pool = require('../config/db');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    const { patient_id, doctor_id, appointment_date, department_id, status } = req.body;

    try {
        const insertQuery = `
            INSERT INTO appointments (patient_id, doctor_id, appointment_date, department_id, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

        const result = await pool.query(insertQuery, [patient_id, doctor_id, appointment_date, department_id, status]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating appointment:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM appointments');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching appointments:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Get a single appointment by ID
exports.getAppointmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM appointments WHERE appointment_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching appointment by ID:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { patient_id, doctor_id, appointment_date, department_id, status } = req.body;

    try {
        const updateQuery = `
            UPDATE appointments
            SET patient_id = $1, doctor_id = $2, appointment_date = $3, department_id = $4, status = $5
            WHERE appointment_id = $6
            RETURNING *;
        `;

        const result = await pool.query(updateQuery, [patient_id, doctor_id, appointment_date, department_id, status, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating appointment:', error.message);
        res.status(500).send('Internal server error');
    }
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM appointments WHERE appointment_id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error.message);
        res.status(500).send('Internal server error');
    }
};
