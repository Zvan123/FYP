import React from 'react';
import MainLayout from '../layouts/MainLayout';

const DoctorSchedule = () => {
    const scheduleData = [
        {
            id: 1,
            doctorName: 'Dr. Sarah Lee',
            specialization: 'Cardiology',
            days: 'Mon, Wed, Fri',
            time: '9:00 AM - 12:00 PM',
        },
        {
            id: 2,
            doctorName: 'Dr. John Smith',
            specialization: 'Neurology',
            days: 'Tue, Thu',
            time: '2:00 PM - 5:00 PM',
        },
        {
            id: 3,
            doctorName: 'Dr. Emily Chan',
            specialization: 'Orthopedics',
            days: 'Mon - Fri',
            time: '10:00 AM - 4:00 PM',
        },
    ];

    return (
        <MainLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Doctor Schedule</h1>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Doctor</th>
                                <th className="px-4 py-2 text-left">Specialization</th>
                                <th className="px-4 py-2 text-left">Days</th>
                                <th className="px-4 py-2 text-left">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleData.map((doc) => (
                                <tr key={doc.id} className="border-t">
                                    <td className="px-4 py-2">{doc.doctorName}</td>
                                    <td className="px-4 py-2">{doc.specialization}</td>
                                    <td className="px-4 py-2">{doc.days}</td>
                                    <td className="px-4 py-2">{doc.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default DoctorSchedule;