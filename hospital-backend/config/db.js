const { Pool } = require('pg');  // Import Pool from pg module
require('dotenv').config();  // Load environment variables

// Create a new pool instance to manage database connections
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Use DATABASE_URL from your .env file
});

// Export the pool object for usage in other parts of your app
module.exports = pool;
