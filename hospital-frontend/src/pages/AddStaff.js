import React, { useState } from 'react';

const AddStaff = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        role: '',
        department: '',
        shift: ''
    });

    // Auto-assign department based on role
    const handleRoleChange = (e) => {
        const role = e.target.value;
        let department = '';
        switch (role) {
            case 'Doctor':
            case 'Nurse':
            case 'Pharmacist':
                department = 'Core Medical';
                break;
            case 'Admin':
            case 'Receptionist':
                department = 'Administrative & Support';
                break;
            case 'Lab Technician':
            case 'Physiotherapist':
                department = 'Paramedical';
                break;
            default:
                department = '';
        }

        setFormData((prev) => ({
            ...prev,
            role,
            department,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/staff', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('✅ Staff added successfully.');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    role: '',
                    department: '',
                    shift: ''
                });
            } else {
                alert('❌ Failed to add staff.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ An error occurred while adding staff.');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Add Staff</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />

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


                <input
                    type="text"
                    name="department"
                    value={formData.department}
                    disabled
                    className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                />

                <select
                    name="shift"
                    value={formData.shift}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select Shift</option>
                    <option value="Day Shift">Day Shift</option>
                    <option value="Night Shift">Night Shift</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Add Staff
                </button>
            </form>
        </div>
    );
};

export default AddStaff;
