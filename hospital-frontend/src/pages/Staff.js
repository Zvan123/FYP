import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Staff = () => {
    const [staffList, setStaffList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [filters, setFilters] = useState({
        role: '',
        department: '',
        shift: '',
        searchName: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchStaff();
    }, [filters.role, filters.department, filters.shift]);

    const fetchStaff = async () => {
        try {
            const response = await axios.get('/api/staff', {
                params: {
                    role: filters.role,
                    department: filters.department,
                    shift: filters.shift
                }
            });
            setStaffList(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching staff:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this staff?')) return;
        try {
            await axios.delete(`/api/staff/${id}`);
            setStaffList((prev) => prev.filter((s) => s.staff_id !== id));
        } catch (error) {
            console.error('Error deleting staff:', error);
        }
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
    };

    const handleInputChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredStaff = staffList.filter((staff) =>
        staff.name?.toLowerCase().includes(filters.searchName.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Staff Management</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate('/add-staff')}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Add Staff
                    </button>
                    <button
                        onClick={toggleEditMode}
                        className={`px-4 py-2 rounded text-white ${editMode ? 'bg-gray-600' : 'bg-blue-600'} hover:opacity-90`}
                    >
                        {editMode ? 'Done Editing' : 'Edit Staff'}
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <label className="block font-medium mb-1">Search by Name:</label>
                    <input
                        type="text"
                        name="searchName"
                        value={filters.searchName}
                        onChange={handleInputChange}
                        placeholder="Enter staff name..."
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Filter by Role:</label>
                    <select name="role" value={filters.role} onChange={handleInputChange} className="w-full border p-2 rounded">
                        <option value="">All Roles</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Admin">Admin</option>
                        <option value="Receptionist">Receptionist</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="Lab Technician">Lab Technician</option>
                        <option value="Physiotherapist">Physiotherapist</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium mb-1">Filter by Department:</label>
                    <select name="department" value={filters.department} onChange={handleInputChange} className="w-full border p-2 rounded">
                        <option value="">All Departments</option>
                        <option value="Core Medical">Core Medical</option>
                        <option value="Administrative & Support">Administrative & Support</option>
                        <option value="Paramedical">Paramedical</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium mb-1">Filter by Shift:</label>
                    <select name="shift" value={filters.shift} onChange={handleInputChange} className="w-full border p-2 rounded">
                        <option value="">All Shifts</option>
                        <option value="Day">Day</option>
                        <option value="Night">Night</option>
                    </select>
                </div>
            </div>

            {/* Staff Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Gender</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Department</th>
                            <th className="px-4 py-2">Shift</th>
                            <th className="px-4 py-2">Action</th>
                            {editMode && <th className="px-4 py-2">Delete</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaff.length > 0 ? (
                            filteredStaff.map((staff, index) => (
                                <tr key={staff.staff_id} className="border-t">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{staff.name}</td>
                                    <td className="px-4 py-2">{staff.gender}</td>
                                    <td className="px-4 py-2">{staff.role_name}</td>
                                    <td className="px-4 py-2">{staff.department_name}</td>
                                    <td className="px-4 py-2">{staff.shift}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => navigate(`/staff/${staff.staff_id}`)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                    {editMode && (
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(staff.staff_id)}
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
                                <td colSpan={editMode ? 8 : 7} className="px-4 py-4 text-center">
                                    No staff found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Staff;
