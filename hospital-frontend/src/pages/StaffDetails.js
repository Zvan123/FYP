import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const StaffDetails = () => {
    const { id } = useParams();
    const [staff, setStaff] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/staff/${id}`);
                setStaff(response.data);
            } catch (err) {
                console.error('Error fetching staff details:', err);
                setError('Staff not found.');
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, [id]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Staff Details</h2>
            <div className="space-y-4">
                <div><strong className="text-gray-600">Staff ID:</strong> {staff.staff_id}</div>
                <div><strong className="text-gray-600">Full Name:</strong> {staff.name}</div>
                <div><strong className="text-gray-600">Gender:</strong> {staff.gender}</div>
                <div><strong className="text-gray-600">Email:</strong> {staff.email}</div>
                <div><strong className="text-gray-600">Phone:</strong> {staff.phone}</div>
                <div><strong className="text-gray-600">Role:</strong> {staff.role_name}</div>
                <div><strong className="text-gray-600">Department:</strong> {staff.department_name}</div>
                <div><strong className="text-gray-600">Shift:</strong> {staff.shift}</div>
                <div><strong className="text-gray-600">Join Date:</strong> {formatDate(staff.join_date)}</div>
            </div>

            <div className="mt-6">
                <Link to="/staff" className="text-blue-500 hover:underline">← Back to Staff List</Link>
            </div>
        </div>
    );
};

export default StaffDetails;
