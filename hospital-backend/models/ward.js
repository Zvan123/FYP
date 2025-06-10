const pool = require('../config/db');

// Create a new ward
const createWard = async (ward_name, capacity) => {
    const query = `
        INSERT INTO wards (ward_name, capacity)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const values = [ward_name, capacity];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return the created ward
    } catch (error) {
        console.error('Error creating ward:', error.message);
        throw error;
    }
};

// Get all wards
const getAllWards = async () => {
    const query = 'SELECT * FROM wards';
    try {
        const result = await pool.query(query);
        return result.rows; // Return all wards
    } catch (error) {
        console.error('Error fetching wards:', error.message);
        throw error;
    }
};

// Get a single ward by ID
const getWardById = async (id) => {
    const query = 'SELECT * FROM wards WHERE ward_id = $1';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0]; // Return ward by ID
    } catch (error) {
        console.error('Error fetching ward by ID:', error.message);
        throw error;
    }
};

// Update a ward by ID
const updateWard = async (id, ward_name, capacity) => {
    const query = `
        UPDATE wards
        SET ward_name = $1, capacity = $2
        WHERE ward_id = $3
        RETURNING *;
    `;
    const values = [ward_name, capacity, id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return updated ward
    } catch (error) {
        console.error('Error updating ward:', error.message);
        throw error;
    }
};

// Delete a ward by ID
const deleteWard = async (id) => {
    const query = 'DELETE FROM wards WHERE ward_id = $1 RETURNING *';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0]; // Return deleted ward
    } catch (error) {
        console.error('Error deleting ward:', error.message);
        throw error;
    }
};

module.exports = {
    createWard,
    getAllWards,
    getWardById,
    updateWard,
    deleteWard
};
