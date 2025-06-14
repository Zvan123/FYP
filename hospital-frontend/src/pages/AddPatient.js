import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AddPatient = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        gender: '',
        date_of_birth: '',
        phone: '',
        blood_type: '',
        address: '',
        medical_history: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            full_name,
            gender,
            date_of_birth,
            phone,
            blood_type,
            address,
            medical_history
        } = formData;

        if (!full_name || !gender || !date_of_birth || !phone || !blood_type || !address) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            await axios.post('/api/patients', {
                full_name,
                gender,
                date_of_birth,
                phone,
                blood_type,
                address,
                medical_history
            });

            navigate('/patients');
        } catch (err) {
            console.error('Error adding patient:', err);
            setError('Failed to add patient.');
        }
    };


    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-4">
                <Link to="/patients" className="text-blue-600 hover:underline">
                    ← Back to Patient List
                </Link>
            </div>

            <h1 className="text-2xl font-bold mb-4">Add New Patient</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded shadow space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Full Name *</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter full name"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Gender *</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Date of Birth *</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Phone *</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="e.g. 91234567"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Blood Type *</label>
                    <select
                        name="blood_type"
                        value={formData.blood_type}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Address *</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter home address"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Medical History</label>
                    <textarea
                        name="medical_history"
                        value={formData.medical_history}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter past or chronic conditions (optional)"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Patient
                </button>
            </form>
        </div>
    );
};

export default AddPatient;
