import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AddPatient = () => {
    const [form, setForm] = useState({
        name: '',
        gender: '',
        dob: '',
        contact: '',
        blood_type: '',
        address: '',
        medical_history: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, gender, dob, contact } = form;

        if (!name || !gender || !dob || !contact) {
            setError('Name, gender, date of birth and contact are required.');
            return;
        }

        try {
            await axios.post('/api/patients', form);
            navigate('/patients');
        } catch (err) {
            console.error('Error adding patient:', err);
            setError('Failed to add patient.');
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            {/* 🔙 Back Link */}
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
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Enter full name"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Gender *</label>
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">-- Select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Date of Birth *</label>
                    <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Phone *</label>
                    <input
                        type="tel"
                        name="contact"
                        value={form.contact}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. 98765432"
                        pattern="[0-9]*"
                        inputMode="numeric"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Blood Type</label>
                    <select
                        name="blood_type"
                        value={form.blood_type}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">-- Select Blood Type --</option>
                        <option value="A+">A+</option>
                        <option value="A-">A−</option>
                        <option value="B+">B+</option>
                        <option value="B-">B−</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB−</option>
                        <option value="O+">O+</option>
                        <option value="O-">O−</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Enter address"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Medical History</label>
                    <textarea
                        name="medical_history"
                        value={form.medical_history}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        rows="3"
                        placeholder="E.g. Diabetes, hypertension, etc."
                    ></textarea>
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
