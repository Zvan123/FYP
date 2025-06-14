import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import AddAppointment from './pages/AddAppointment';
import Patients from './pages/Patients';
import StaffSchedule from './pages/StaffSchedule';
import AddPatient from './pages/AddPatient';
import Staff from './pages/Staff';
import AddStaff from './pages/AddStaff';
import PatientDetails from './pages/PatientDetails';
import StaffDetails from './pages/StaffDetails';
import Login from './layouts/Login';

const App = () => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
    return () => unsubscribe(); // Clean up listener
  }, []);

  if (checking) return null; // Wait silently

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />

        {user && (
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/add-appointment" element={<AddAppointment />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/add-staff" element={<AddStaff />} />
            <Route path="/staff-schedule" element={<StaffSchedule />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
            <Route path="/staff/:id" element={<StaffDetails />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;
