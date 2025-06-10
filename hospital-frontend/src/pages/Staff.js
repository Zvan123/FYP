import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Staff = () => {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/staff')
            .then(response => {
                setStaff(response.data);
            })
            .catch(error => {
                console.error('Error fetching staff:', error);
            });
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Staff</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Full Name</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Phone</th>
                            <th className="px-4 py-2 text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((staffMember, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2">{staffMember.full_name}</td>
                                <td className="px-4 py-2">{staffMember.role_name}</td>
                                <td className="px-4 py-2">{staffMember.phone}</td>
                                <td className="px-4 py-2">{staffMember.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Staff;
