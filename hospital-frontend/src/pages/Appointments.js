import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/appointments');
                if (Array.isArray(res.data)) {
                    setAppointments(res.data);
                } else {
                    console.error('Expected array but got:', res.data);
                    setAppointments([]);
                }
            } catch (error) {
                console.error('Error fetching appointments:', error.message);
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Appointment List</h2>
            {loading ? (
                <p>Loading appointments...</p>
            ) : appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2 text-left">#</th>
                                <th className="border px-4 py-2 text-left">Patient</th>
                                <th className="border px-4 py-2 text-left">Doctor</th>
                                <th className="border px-4 py-2 text-left">Date</th>
                                <th className="border px-4 py-2 text-left">Time</th>
                                <th className="border px-4 py-2 text-left">Status</th>
                                <th className="border px-4 py-2 text-left">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appt, index) => (
                                <tr key={appt.appointment_id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{appt.patient_name}</td>
                                    <td className="border px-4 py-2">{appt.staff_name}</td>
                                    <td className="border px-4 py-2">{appt.appointment_date}</td>
                                    <td className="border px-4 py-2">{appt.appointment_time.slice(0, 5)}</td>
                                    <td className="border px-4 py-2">{appt.status}</td>
                                    <td className="border px-4 py-2">{appt.remarks || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Appointments;
