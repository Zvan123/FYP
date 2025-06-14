import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => navigate('/login'))
            .catch((err) => console.error('Logout error:', err));
    };

    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between">
            <h1 className="text-xl font-bold">Hospital Admin</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
