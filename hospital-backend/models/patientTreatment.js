const pool = require('../config/db');

// Get all treatments for a specific patient
const getAllTreatmentsForPatient = async (patient_id) => {
    const query = `
        SELECT t.treatment_name, pt.treatment_date, pt.status, pt.cost, pt.notes
        FROM patient_treatments pt
        JOIN treatments t ON pt.treatment_id = t.treatment_id
        WHERE pt.patient_id = $1;
    `;
    const result = await pool.query(query, [patient_id]);
    return result.rows;
};

// Get a treatment record by its ID
const getTreatmentById = async (id) => {
    const query = `
        SELECT t.treatment_name, pt.treatment_date, pt.status, pt.cost, pt.notes
        FROM patient_treatments pt
        JOIN treatments t ON pt.treatment_id = t.treatment_id
        WHERE pt.patient_treatment_id = $1;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

// Create a new patient treatment record
const createPatientTreatment = async (patient_id, treatment_id, treatment_date, status, cost, notes) => {
    const query = `
        INSERT INTO patient_treatments (patient_id, treatment_id, treatment_date, status, cost, notes)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const result = await pool.query(query, [patient_id, treatment_id, treatment_date, status, cost, notes]);
    return result.rows[0];
};

// Update a patient treatment record
const updatePatientTreatment = async (id, treatment_date, status, cost, notes) => {
    const query = `
        UPDATE patient_treatments
        SET treatment_date = $1, status = $2, cost = $3, notes = $4
        WHERE patient_treatment_id = $5
        RETURNING *;
    `;
    const result = await pool.query(query, [treatment_date, status, cost, notes, id]);
    return result.rows[0];
};

// Delete a patient treatment record
const deletePatientTreatment = async (id) => {
    const query = `
        DELETE FROM patient_treatments
        WHERE patient_treatment_id = $1
        RETURNING *;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

module.exports = {
    getAllTreatmentsForPatient,
    createPatientTreatment,
    updatePatientTreatment,
    deletePatientTreatment,
    getTreatmentById,  // Added this line
};
