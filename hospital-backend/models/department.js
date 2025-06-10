const pool = require('../config/db');

// Create a new department
const createDepartment = async (departmentData) => {
    const { department_name, description } = departmentData;

    const query = `
        INSERT INTO departments (department_name, description)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const values = [department_name, description];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return the created department
    } catch (error) {
        console.error('Error creating department:', error.message);
        throw error;
    }
};

// Get all departments
const getAllDepartments = async () => {
    const query = 'SELECT * FROM departments';
    try {
        const result = await pool.query(query);
        return result.rows; // Return all departments
    } catch (error) {
        console.error('Error fetching departments:', error.message);
        throw error;
    }
};

// Get a single department by ID
const getDepartmentById = async (id) => {
    const query = 'SELECT * FROM departments WHERE department_id = $1';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0]; // Return the department by ID
    } catch (error) {
        console.error('Error fetching department by ID:', error.message);
        throw error;
    }
};

// Update a department
const updateDepartment = async (id, departmentData) => {
    const { department_name, description } = departmentData;

    const query = `
        UPDATE departments
        SET department_name = $1, description = $2
        WHERE department_id = $3
        RETURNING *;
    `;
    const values = [department_name, description, id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return updated department
    } catch (error) {
        console.error('Error updating department:', error.message);
        throw error;
    }
};

// Delete a department
const deleteDepartment = async (id) => {
    const query = 'DELETE FROM departments WHERE department_id = $1 RETURNING *';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0]; // Return deleted department
    } catch (error) {
        console.error('Error deleting department:', error.message);
        throw error;
    }
};

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};
