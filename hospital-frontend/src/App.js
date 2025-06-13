import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import AddAppointment from './pages/AddAppointment';
import Patients from './pages/Patients';
import DoctorSchedule from './pages/DoctorSchedule';
import AddPatient from './pages/AddPatient';
import Staff from './pages/Staff';
import AddStaff from './pages/AddStaff';
import PatientDetails from './pages/PatientDetails';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/add-appointment" element={<AddAppointment />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/schedule" element={<DoctorSchedule />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/add-staff" element={<AddStaff />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
