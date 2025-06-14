const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./config/db');

// Import routes
const patientRoutes = require('./routes/patientRoutes');
const staffRoutes = require('./routes/staffRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const treatmentRoutes = require('./routes/treatmentRoutes');
const patientTreatmentRoutes = require('./routes/patientTreatmentRoutes');
const staffScheduleRoutes = require('./routes/staffScheduleRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/patients', patientRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/patient_treatments', patientTreatmentRoutes);
app.use('/api/staff-schedule', staffScheduleRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
