import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout'; // Make sure this path is correct
import axios from 'axios';

const Patients = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/patients')
            .then(response => {
                setPatients(response.data);
            })
            .catch(error => {
                console.error('Error fetching patients:', error);
            });
    }, []);

    return (
        <MainLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Patients</h1>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Full Name</th>
                                <th className="px-4 py-2 text-left">Gender</th>
                                <th className="px-4 py-2 text-left">Date of Birth</th>
                                <th className="px-4 py-2 text-left">Phone</th>
                                <th className="px-4 py-2 text-left">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">{patient.full_name}</td>
                                    <td className="px-4 py-2">{patient.gender}</td>
                                    <td className="px-4 py-2">{patient.dob}</td>
                                    <td className="px-4 py-2">{patient.phone}</td>
                                    <td className="px-4 py-2">{patient.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default Patients;
