const pool = require('../config/db');

// Create a new role
const createRole = async (role_name, description) => {
    const query = `
        INSERT INTO roles (role_name, description)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const values = [role_name, description];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return the created role
    } catch (error) {
        console.error('Error creating role:', error.message);
        throw error;
    }
};

// Get all roles
const getAllRoles = async () => {
    const query = 'SELECT * FROM roles';
    try {
        const result = await pool.query(query);
        return result.rows; // Return all roles
    } catch (error) {
        console.error('Error fetching roles:', error.message);
        throw error;
    }
};

// Get a single role by ID
const getRoleById = async (id) => {
    const query = 'SELECT * FROM roles WHERE role_id = $1';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0]; // Return role by ID
    } catch (error) {
        console.error('Error fetching role by ID:', error.message);
        throw error;
    }
};

// Update a role by ID
const updateRole = async (id, role_name, description) => {
    const query = `
        UPDATE roles
        SET role_name = $1, description = $2
        WHERE role_id = $3
        RETURNING *;
    `;
    const values = [role_name, description, id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return updated role
    } catch (error) {
        console.error('Error updating role:', error.message);
        throw error;
    }
};

// Delete a role by ID
const deleteRole = async (id) => {
    const query = 'DELETE FROM roles WHERE role_id = $1 RETURNING *';
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0]; // Return deleted role
    } catch (error) {
        console.error('Error deleting role:', error.message);
        throw error;
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole
};
