import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import Wards from './pages/Wards';
import DoctorSchedule from './pages/DoctorSchedule';
import AddPatient from './pages/AddPatient';
import Staff from './pages/Staff';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/wards" element={<Wards />} />
          <Route path="/schedule" element={<DoctorSchedule />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/staff" element={<Staff />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
