import React, { useState, useEffect } from 'react';

const Staff = () => {
    const [staffList, setStaffList] = useState([]);
    const [filterRole, setFilterRole] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('');
    const [filterShift, setFilterShift] = useState('');
    const [editMode, setEditMode] = useState(false);

    const fetchStaff = async () => {
        try {
            const params = new URLSearchParams();
            if (filterRole) params.append('role', filterRole);
            if (filterDepartment) params.append('department', filterDepartment);
            if (filterShift) params.append('shift', filterShift);

            const response = await fetch(`/api/staff?${params.toString()}`);
            const data = await response.json();
            setStaffList(data);
        } catch (error) {
            console.error('Failed to fetch staff:', error);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, [filterRole, filterDepartment, filterShift]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this staff member?')) return;
        try {
            const response = await fetch(`/api/staff/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchStaff();
            } else {
                alert('Failed to delete staff.');
            }
        } catch (error) {
            console.error('Error deleting staff:', error);
        }
    };

    return (
        <div className="p-4">
            {/* Header and Edit toggle */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Staff Management</h1>
                <button
                    onClick={() => setEditMode(prev => !prev)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                    {editMode ? 'Done Editing' : 'Edit Staff'}
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-4">
                <div>
                    <label className="mr-2 font-medium">Filter by Role:</label>
                    <select
                        className="border p-2 rounded"
                        value={filterRole}
                        onChange={e => setFilterRole(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Receptionist">Receptionist</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="Lab Technician">Lab Technician</option>
                        <option value="Physiotherapist">Physiotherapist</option>
                    </select>
                </div>

                <div>
                    <label className="mr-2 font-medium">Department:</label>
                    <select
                        className="border p-2 rounded"
                        value={filterDepartment}
                        onChange={e => setFilterDepartment(e.target.value)}
                    >
                        <option value="">All Departments</option>
                        <option value="Core Medical">Core Medical</option>
                        <option value="Administrative & Support">Administrative & Support</option>
                        <option value="Paramedical">Paramedical</option>
                    </select>
                </div>

                <div>
                    <label className="mr-2 font-medium">Shift:</label>
                    <select
                        className="border p-2 rounded"
                        value={filterShift}
                        onChange={e => setFilterShift(e.target.value)}
                    >
                        <option value="">All Shifts</option>
                        <option value="Day Shift">Day Shift</option>
                        <option value="Night Shift">Night Shift</option>
                    </select>
                </div>
            </div>

            {/* Staff Table */}
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="p-2 border text-left">#</th>
                        <th className="p-2 border text-left">Name</th>
                        <th className="p-2 border text-left">Role</th>
                        <th className="p-2 border text-left">Department</th>
                        <th className="p-2 border text-left">Shift</th>
                        <th className="p-2 border text-left">Phone</th>
                        {editMode && <th className="p-2 border text-left">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {staffList.map((staff, index) => (
                        <tr key={staff.id}>
                            <td className="p-2 border text-left">{index + 1}</td>
                            <td className="p-2 border text-left">{staff.name}</td>
                            <td className="p-2 border text-left">{staff.role}</td>
                            <td className="p-2 border text-left">{staff.department}</td>
                            <td className="p-2 border text-left">{staff.shift}</td>
                            <td className="p-2 border text-left">{staff.phone}</td>
                            {editMode && (
                                <td className="p-2 border text-left">
                                    <button
                                        onClick={() => handleDelete(staff.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {staffList.length === 0 && (
                <p className="mt-4 text-gray-600">No staff found.</p>
            )}
        </div>
    );
};

export default Staff;
