import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-100 rounded-xl shadow text-lg font-medium text-blue-800">
                    Total Patients
                </div>
                <div className="p-6 bg-green-100 rounded-xl shadow text-lg font-medium text-green-800">
                    Today's Appointments
                </div>
                <div className="p-6 bg-yellow-100 rounded-xl shadow text-lg font-medium text-yellow-800">
                    Available Wards
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
