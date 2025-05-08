import React from 'react';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="ml-64 flex-1 bg-gray-50 min-h-screen p-6">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
