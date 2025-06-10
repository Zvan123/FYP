const pool = require('../config/db');

// Create a new treatment
const createTreatment = async (patient_id, staff_id, appointment_id, treatment_details, notes) => {
    const query = `
        INSERT INTO treatments (patient_id, staff_id, appointment_id, treatment_details, notes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [patient_id, staff_id, appointment_id, treatment_details, notes];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Returning the created treatment
    } catch (error) {
        console.error('Error creating treatment:', error);
        throw error;
    }
};

// Get all treatments
const getAllTreatments = async () => {
    const query = 'SELECT * FROM treatments';
    try {
        const result = await pool.query(query);
        return result.rows; // Return all treatments
    } catch (error) {
        console.error('Error fetching treatments:', error);
        throw error;
    }
};

// Get a single treatment by ID
const getTreatmentById = async (treatment_id) => {
    const query = 'SELECT * FROM treatments WHERE treatment_id = $1';
    try {
        const result = await pool.query(query, [treatment_id]);
        return result.rows[0]; // Return treatment by ID
    } catch (error) {
        console.error('Error fetching treatment by ID:', error);
        throw error;
    }
};

// Update a treatment
const updateTreatment = async (treatment_id, treatment_details, notes) => {
    const query = `
        UPDATE treatments
        SET treatment_details = $1, notes = $2
        WHERE treatment_id = $3
        RETURNING *;
    `;
    const values = [treatment_details, notes, treatment_id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return updated treatment
    } catch (error) {
        console.error('Error updating treatment:', error);
        throw error;
    }
};

// Delete a treatment
const deleteTreatment = async (treatment_id) => {
    const query = 'DELETE FROM treatments WHERE treatment_id = $1 RETURNING *';
    try {
        const result = await pool.query(query, [treatment_id]);
        return result.rows[0]; // Return deleted treatment
    } catch (error) {
        console.error('Error deleting treatment:', error);
        throw error;
    }
};

module.exports = {
    createTreatment,
    getAllTreatments,
    getTreatmentById,
    updateTreatment,
    deleteTreatment
};
