import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => navigate('/login'))
            .catch((err) => console.error('Logout error:', err));
    };

    const linkClass =
        "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white";

    const activeClass = "bg-gray-700 text-white";

    return (
        <aside className="w-64 h-screen bg-white shadow-md fixed flex flex-col justify-between">
            <div>
                <div className="p-4 font-bold text-xl border-b">Hospital Admin</div>
                <nav className="p-4 space-y-2">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : "text-gray-700"}`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/patients"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : "text-gray-700"}`
                        }
                    >
                        Patients
                    </NavLink>

                    <NavLink
                        to="/staff"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : "text-gray-700"}`
                        }
                    >
                        Staff
                    </NavLink>

                    <NavLink
                        to="/staff-schedule"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : "text-gray-700"}`
                        }
                    >
                        Staff Schedule
                    </NavLink>

                    <NavLink
                        to="/appointments"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : "text-gray-700"}`
                        }
                    >
                        Appointments
                    </NavLink>
                </nav>
            </div>

            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="w-full text-left block py-2.5 px-4 rounded text-red-600 hover:bg-red-100 transition duration-200"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
