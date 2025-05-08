const pool = require('../config/db');

// Create a new patient
const createPatient = async (patientData) => {
    const {
        full_name, date_of_birth, gender, phone, email, address,
        emergency_contact_name, emergency_contact_relation,
        emergency_contact_phone, national_id
    } = patientData;

    const query = `
        INSERT INTO patients (
            full_name, date_of_birth, gender, phone, email, address,
            emergency_contact_name, emergency_contact_relation,
            emergency_contact_phone, national_id
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING *;
    `;
    const values = [
        full_name, date_of_birth, gender, phone, email, address,
        emergency_contact_name, emergency_contact_relation,
        emergency_contact_phone, national_id
    ];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return the created patient
    } catch (error) {
        console.error('Error creating patient:', error.message);
        throw error;
    }
};

// Get all patients
const getAllPatients = async () => {
    const query = 'SELECT * FROM patients';
    try {
        const result = await pool.query(query);
        return result.rows; // Return all patients
    } catch (error) {
        console.error('Error fetching patients:', error.message);
        throw error;
    }
};

// Get a single patient by ID
const getPatientById = async (id) => {
    const query = 'SELECT * FROM patients WHERE patient_id = $1';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0]; // Return the patient by ID
    } catch (error) {
        console.error('Error fetching patient by ID:', error.message);
        throw error;
    }
};

// Update a patient
const updatePatient = async (id, patientData) => {
    const {
        full_name, date_of_birth, gender, phone, email, address,
        emergency_contact_name, emergency_contact_relation,
        emergency_contact_phone, national_id
    } = patientData;

    const query = `
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
    const values = [
        full_name, date_of_birth, gender, phone, email, address,
        emergency_contact_name, emergency_contact_relation,
        emergency_contact_phone, national_id, id
    ];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return updated patient
    } catch (error) {
        console.error('Error updating patient:', error.message);
        throw error;
    }
};

// Delete a patient
const deletePatient = async (id) => {
    const query = 'DELETE FROM patients WHERE patient_id = $1 RETURNING *';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0]; // Return deleted patient
    } catch (error) {
        console.error('Error deleting patient:', error.message);
        throw error;
    }
};

module.exports = {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
};
