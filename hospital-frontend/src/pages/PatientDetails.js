import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [treatments, setTreatments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/patients/${id}`);
                setPatient(response.data);
            } catch (err) {
                console.error('Error fetching patient details:', err);
                setError('Patient not found.');
            }
        };

        const fetchTreatments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/patient_treatments/${id}`);
                setTreatments(response.data);
            } catch (err) {
                console.error('Error fetching patient treatments:', err);
            }
        };

        Promise.all([fetchPatient(), fetchTreatments()]).finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Patient Details</h2>
            <div className="space-y-4">
                <div><strong className="text-gray-600">Full Name:</strong> {patient.name}</div>
                <div><strong className="text-gray-600">Gender:</strong> {patient.gender}</div>
                <div><strong className="text-gray-600">Date of Birth:</strong> {patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString() : '-'}</div>
                <div><strong className="text-gray-600">Phone:</strong> {patient.phone}</div>
                <div><strong className="text-gray-600">Blood Type:</strong> {patient.blood_type}</div>
                <div><strong className="text-gray-600">Address:</strong> {patient.address}</div>
                <div><strong className="text-gray-600">Medical History:</strong> {patient.medical_history || 'None'}</div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Treatment History</h3>
                {treatments.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                        {treatments.map((t, index) => (
                            <li key={index}>
                                <span className="font-medium">{t.name}</span> — {new Date(t.date_given).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No treatments recorded.</p>
                )}
            </div>

            <div className="mt-6">
                <Link to="/patients" className="text-blue-500 hover:underline">← Back to Patient List</Link>
            </div>
        </div>
    );
};

export default PatientDetails;
