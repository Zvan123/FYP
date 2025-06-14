import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AddStaff = () => {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        email: '',
        phone: '',
        role: '',
        shift: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const getDepartmentFromRole = (role) => {
        if (['Doctor', 'Nurse'].includes(role)) return 'Core Medical';
        if (['Admin', 'Receptionist'].includes(role)) return 'Administrative & Support';
        return 'Paramedical';
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRoleChange = (e) => {
        const role = e.target.value;
        const department = getDepartmentFromRole(role);
        setFormData({
            ...formData,
            role,
            department,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, gender, email, phone, role, shift } = formData;

        if (!name || !gender || !email || !phone || !role || !shift) {
            setError('All fields are required.');
            return;
        }

        const department = getDepartmentFromRole(role);

        try {
            await axios.post('/api/staff', {
                ...formData,
                department,
            });
            navigate('/staff');
        } catch (err) {
            console.error('Error adding staff:', err);
            setError('Failed to add staff.');
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-4">
                <Link to="/staff" className="text-blue-600 hover:underline">
                    ← Back to Staff List
                </Link>
            </div>

            <h1 className="text-2xl font-bold mb-4">Add New Staff</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded shadow space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Full Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
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
                    <label className="block mb-1 font-medium">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter email"
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
                    <label className="block mb-1 font-medium">Role *</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleRoleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Receptionist">Receptionist</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="Lab Technician">Lab Technician</option>
                        <option value="Physiotherapist">Physiotherapist</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Shift *</label>
                    <select
                        name="shift"
                        value={formData.shift}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Shift</option>
                        <option value="Day">Day</option>
                        <option value="Night">Night</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Staff
                </button>
            </form>
        </div>
    );
};

export default AddStaff;
