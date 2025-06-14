import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get('/api/appointments');
            setAppointments(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error('Error fetching appointments:', error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this appointment?')) return;
        try {
            await axios.delete(`/api/appointments/${id}`);
            setAppointments((prev) => prev.filter((appt) => appt.appointment_id !== id));
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Appointment Management</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate('/add-appointment')}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Add Appointment
                    </button>
                    <button
                        onClick={toggleEditMode}
                        className={`px-4 py-2 rounded text-white ${editMode ? 'bg-gray-600' : 'bg-blue-600'} hover:opacity-90`}
                    >
                        {editMode ? 'Done Editing' : 'Edit Appointments'}
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Patient</th>
                            <th className="px-4 py-2">Doctor</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Time</th>
                            <th className="px-4 py-2">Reason</th>
                            <th className="px-4 py-2">Status</th>
                            {editMode && <th className="px-4 py-2">Delete</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appt, index) => (
                                <tr key={appt.appointment_id} className="border-t">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{appt.patient_name}</td>
                                    <td className="px-4 py-2">{appt.doctor_name}</td>
                                    <td className="px-4 py-2">
                                        {new Date(appt.appointment_date).toLocaleDateString('en-CA', {
                                            timeZone: 'Asia/Singapore'
                                        })}
                                    </td>
                                    <td className="px-4 py-2">{appt.appointment_time?.slice(0, 5)}</td>
                                    <td className="px-4 py-2">{appt.reason}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded text-sm font-medium ${appt.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            appt.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {appt.status}
                                        </span>
                                    </td>
                                    {editMode && (
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(appt.appointment_id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    className="px-4 py-4 text-center"
                                    colSpan={editMode ? 7 : 6}
                                >
                                    No appointments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Appointments;
