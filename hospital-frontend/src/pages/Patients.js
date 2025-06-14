import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get('/api/patients');
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this patient?')) return;
        try {
            await axios.delete(`/api/patients/${id}`);
            setPatients((prev) => prev.filter((p) => p.patient_id !== id));
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
    };

    const filteredPatients = Array.isArray(patients)
        ? patients.filter((patient) =>
            patient.name?.toLowerCase().includes(searchName.toLowerCase())
        )
        : [];

    const calculateAge = (date_of_birth) => {
        const birthDate = new Date(date_of_birth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Patient Management</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate('/add-patient')}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Add Patient
                    </button>
                    <button
                        onClick={toggleEditMode}
                        className={`px-4 py-2 rounded text-white ${editMode ? 'bg-gray-600' : 'bg-blue-600'} hover:opacity-90`}
                    >
                        {editMode ? 'Done Editing' : 'Edit Patients'}
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium">Search by Name:</label>
                <input
                    type="text"
                    placeholder="Enter patient name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Full Name</th>
                            <th className="px-4 py-2">Gender</th>
                            <th className="px-4 py-2">Age</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Blood Type</th>
                            <th className="px-4 py-2">Action</th>
                            {editMode && <th className="px-4 py-2">Delete</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.length > 0 ? (
                            filteredPatients.map((patient, index) => (
                                <tr key={patient.patient_id} className="border-t">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{patient.name}</td>
                                    <td className="px-4 py-2">{patient.gender}</td>
                                    <td className="px-4 py-2">
                                        {patient.date_of_birth ? calculateAge(patient.date_of_birth) : '-'}
                                    </td>
                                    <td className="px-4 py-2">{patient.phone}</td>
                                    <td className="px-4 py-2">{patient.blood_type || '-'}</td>
                                    <td className="px-4 py-2">
                                        <NavLink
                                            to={`/patients/${patient.patient_id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View Details
                                        </NavLink>
                                    </td>
                                    {editMode && (
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(patient.patient_id)}
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
                                <td className="px-4 py-4 text-center" colSpan={editMode ? 8 : 7}>
                                    No patients found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Patients;
