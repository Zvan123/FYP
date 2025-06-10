const pool = require('../config/db');

// Create a new appointment
const createAppointment = async (appointmentData) => {
    const { patient_id, doctor_id, appointment_date, department_id, status } = appointmentData;

    const query = `
        INSERT INTO appointments (patient_id, doctor_id, appointment_date, department_id, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [patient_id, doctor_id, appointment_date, department_id, status];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return the created appointment
    } catch (error) {
        console.error('Error creating appointment:', error.message);
        throw error;
    }
};

// Get all appointments
const getAllAppointments = async () => {
    const query = 'SELECT * FROM appointments';
    try {
        const result = await pool.query(query);
        return result.rows; // Return all appointments
    } catch (error) {
        console.error('Error fetching appointments:', error.message);
        throw error;
    }
};

// Get a single appointment by ID
const getAppointmentById = async (id) => {
    const query = 'SELECT * FROM appointments WHERE appointment_id = $1';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0]; // Return the appointment by ID
    } catch (error) {
        console.error('Error fetching appointment by ID:', error.message);
        throw error;
    }
};

// Update an appointment by ID
const updateAppointment = async (id, appointmentData) => {
    const { patient_id, doctor_id, appointment_date, department_id, status } = appointmentData;

    const query = `
        UPDATE appointments
        SET patient_id = $1, doctor_id = $2, appointment_date = $3, department_id = $4, status = $5
        WHERE appointment_id = $6
        RETURNING *;
    `;
    const values = [patient_id, doctor_id, appointment_date, department_id, status, id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return updated appointment
    } catch (error) {
        console.error('Error updating appointment:', error.message);
        throw error;
    }
};

// Delete an appointment by ID
const deleteAppointment = async (id) => {
    const query = 'DELETE FROM appointments WHERE appointment_id = $1 RETURNING *';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0]; // Return deleted appointment
    } catch (error) {
        console.error('Error deleting appointment:', error.message);
        throw error;
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
