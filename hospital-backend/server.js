const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Import routes
const patientRoutes = require('./routes/patientRoutes');
const wardRoutes = require('./routes/wardRoutes');
const staffRoutes = require('./routes/staffRoutes');
const roleRoutes = require('./routes/roleRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const treatmentRoutes = require('./routes/treatmentRoutes');
const patientTreatmentRoutes = require('./routes/patientTreatmentRoutes');

// Use routes
app.use('/api/patients', patientRoutes);
app.use('/api/wards', wardRoutes);
app.use('/api/staffs', staffRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/patient_treatments', patientTreatmentRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hospital Management System Backend is Running!');
});

// Test database connection
const db = require('./config/db');
db.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Database connected at:', result.rows[0].now);
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
