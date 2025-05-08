import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import Wards from './pages/Wards';
import DoctorSchedule from './pages/DoctorSchedule';
import AddPatient from './pages/AddPatient';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/wards" element={<Wards />} />
        <Route path="/schedule" element={<DoctorSchedule />} />
        <Route path="/add-patient" element={<AddPatient />} />
      </Routes>
    </Router>
  );
};

export default App;
