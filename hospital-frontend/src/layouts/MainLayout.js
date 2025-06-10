import React from 'react';
import Sidebar from '../components/Sidebar';  // Sidebar inside the layout
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="flex">
            <Sidebar />  {/* Sidebar here */}
            <main className="ml-64 flex-1 bg-gray-50 min-h-screen p-6">
                <Outlet /> {/* Dynamic content here */}
            </main>
        </div>
    );
};

export default MainLayout;
