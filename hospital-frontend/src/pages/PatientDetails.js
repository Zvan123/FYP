
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`/api/patients/${id}`);
                setPatient(response.data);
            } catch (err) {
                console.error('Error fetching patient details:', err);
                setError('Patient not found.');
            }
        };

        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`/api/appointments?patient_id=${id}`);
                setAppointments(response.data);
            } catch (err) {
                console.error('Error fetching appointments:', err);
            }
        };

        Promise.all([fetchPatient(), fetchAppointments()]).finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <div className="mb-6">
                <Link to="/patients" className="text-blue-600 hover:underline">
                    ← Back to Patients
                </Link>
            </div>

            <h2 className="text-2xl font-bold mb-4">Patient Details</h2>

            <div className="mb-6">
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Date of Birth:</strong> {patient.date_of_birth}</p>
                <p><strong>Phone:</strong> {patient.phone}</p>
                <p><strong>Blood Type:</strong> {patient.blood_type}</p>
                <p><strong>Address:</strong> {patient.address}</p>
                <p><strong>Medical History:</strong> {patient.medical_history || 'None'}</p>
            </div>

            <h3 className="text-xl font-semibold mb-2">Appointment History</h3>
            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2 text-left">#</th>
                                <th className="border px-4 py-2 text-left">Date</th>
                                <th className="border px-4 py-2 text-left">Time</th>
                                <th className="border px-4 py-2 text-left">Doctor</th>
                                <th className="border px-4 py-2 text-left">Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appt, index) => (
                                <tr key={appt.appointment_id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">
                                        {new Date(appt.appointment_date).toISOString().split('T')[0]}
                                    </td>
                                    <td className="border px-4 py-2">{appt.appointment_time?.slice(0, 5)}</td>
                                    <td className="border px-4 py-2">{appt.doctor_name}</td>
                                    <td className="border px-4 py-2">{appt.reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PatientDetails;
