const pool = require('../config/db');

// Create a new staff member
const createStaff = async (first_name, last_name, role_id, department_id, phone, email, hire_date, salary) => {
    const query = `
        INSERT INTO staff (first_name, last_name, role_id, department_id, phone, email, hire_date, salary)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
    const values = [first_name, last_name, role_id, department_id, phone, email, hire_date, salary];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return the created staff member
    } catch (error) {
        console.error('Error creating staff:', error.message);
        throw error;
    }
};

// Get all staff members
const getAllStaff = async () => {
    const query = 'SELECT * FROM staff';
    try {
        const result = await pool.query(query);
        return result.rows; // Return all staff members
    } catch (error) {
        console.error('Error fetching staff:', error.message);
        throw error;
    }
};

// Get a single staff member by ID
const getStaffById = async (id) => {
    const query = 'SELECT * FROM staff WHERE staff_id = $1';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0]; // Return staff member by ID
    } catch (error) {
        console.error('Error fetching staff by ID:', error.message);
        throw error;
    }
};

// Update a staff member by ID
const updateStaff = async (id, first_name, last_name, role_id, department_id, phone, email, hire_date, salary) => {
    const query = `
        UPDATE staff
        SET first_name = $1, last_name = $2, role_id = $3, department_id = $4, phone = $5, email = $6, hire_date = $7, salary = $8
        WHERE staff_id = $9
        RETURNING *;
    `;
    const values = [first_name, last_name, role_id, department_id, phone, email, hire_date, salary, id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return updated staff member
    } catch (error) {
        console.error('Error updating staff:', error.message);
        throw error;
    }
};

// Delete a staff member by ID
const deleteStaff = async (id) => {
    const query = 'DELETE FROM staff WHERE staff_id = $1 RETURNING *';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0]; // Return deleted staff member
    } catch (error) {
        console.error('Error deleting staff:', error.message);
        throw error;
    }
};

module.exports = {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff
};
