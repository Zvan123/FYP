import React from 'react';

const Appointments = () => {
    const appointments = [
        { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', time: '10:00 AM' },
        { id: 2, patient: 'Jane Roe', doctor: 'Dr. Adams', time: '11:30 AM' },
        { id: 3, patient: 'Bob Tan', doctor: 'Dr. Lee', time: '2:15 PM' },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Appointments</h1>
            <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border-b">Patient</th>
                            <th className="px-4 py-2 border-b">Doctor</th>
                            <th className="px-4 py-2 border-b">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt) => (
                            <tr key={appt.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{appt.patient}</td>
                                <td className="px-4 py-2 border-b">{appt.doctor}</td>
                                <td className="px-4 py-2 border-b">{appt.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Appointments;
