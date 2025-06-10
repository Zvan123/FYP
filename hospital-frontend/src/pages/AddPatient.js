import React, { useState } from 'react';
import axios from 'axios';

const AddPatient = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        date_of_birth: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_relation: '',
        emergency_contact_phone: '',
        national_id: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/patients', formData);
            alert('Patient added successfully!');
        } catch (error) {
            console.error('Error adding patient:', error);
            alert('Something went wrong. Please check your inputs.');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add New Patient</h1>
            <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: 'Full Name', name: 'full_name', type: 'text' },
                        { label: 'Date of Birth', name: 'date_of_birth', type: 'date' },
                        { label: 'Gender', name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
                        { label: 'Phone', name: 'phone', type: 'text' },
                        { label: 'Email', name: 'email', type: 'email' },
                        { label: 'Address', name: 'address', type: 'textarea' },
                        { label: 'Emergency Contact Name', name: 'emergency_contact_name', type: 'text' },
                        { label: 'Emergency Contact Relation', name: 'emergency_contact_relation', type: 'text' },
                        { label: 'Emergency Contact Phone', name: 'emergency_contact_phone', type: 'text' },
                        { label: 'National ID', name: 'national_id', type: 'text' },
                    ].map((field, idx) => (
                        <div key={idx}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                            {field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 px-3 py-2 rounded"
                                >
                                    <option value="">Select {field.label}</option>
                                    {field.options.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 px-3 py-2 rounded"
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 px-3 py-2 rounded"
                                />
                            )}
                        </div>
                    ))}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPatient;
