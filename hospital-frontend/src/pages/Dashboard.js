import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';


const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [staffOnDuty, setStaffOnDuty] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const apptRes = await axios.get('/api/appointments');
            const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Singapore' });
            const todayAppointments = apptRes.data.filter(appt =>
                new Date(appt.appointment_date).toLocaleDateString('en-CA', {
                    timeZone: 'Asia/Singapore'
                }) === today
            );


            const staffRes = await axios.get('/api/staff-schedule');
            const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
            const onDuty = staffRes.data.filter(schedule =>
                schedule.day === currentDay
            );

            setAppointments(todayAppointments);
            setStaffOnDuty(onDuty);
        } catch (err) {
            console.error('Error loading dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Staff on Duty */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">🧑‍⚕️ Staff on Duty Today</h2>
                {staffOnDuty.length === 0 ? (
                    <p className="text-gray-600">No staff scheduled today.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {staffOnDuty.map((staff, index) => (
                            <div key={index} className="bg-white p-4 rounded shadow-md">
                                <h3 className="text-lg font-semibold">{staff.name}</h3>
                                <p className="text-sm text-gray-600">{staff.role}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Appointments Today */}
            <div>
                <h2 className="text-xl font-semibold mb-4">📅 Appointments Today</h2>
                {appointments.length === 0 ? (
                    <p className="text-gray-600">No appointments scheduled today.</p>
                ) : (
                    <div className="overflow-x-auto bg-white rounded shadow-md">
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border text-left">#</th>
                                    <th className="px-4 py-2 border text-left">Patient</th>
                                    <th className="px-4 py-2 border text-left">Doctor</th>
                                    <th className="px-4 py-2 border text-left">Time</th>
                                    <th className="px-4 py-2 border text-left">Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appt, index) => (
                                    <tr key={appt.appointment_id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border text-left">{index + 1}</td>
                                        <td className="px-4 py-2 border text-left">{appt.patient_name}</td>
                                        <td className="px-4 py-2 border text-left">{appt.doctor_name}</td>
                                        <td className="px-4 py-2 border text-left">
                                            {appt.appointment_time?.slice(0, 5)}
                                        </td>
                                        <td className="px-4 py-2 border text-left">{appt.reason}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
