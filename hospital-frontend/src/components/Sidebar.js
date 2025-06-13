import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const linkClass =
        "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white";

    const activeClass = "bg-gray-700 text-white";

    return (
        <aside className="w-64 h-screen bg-white shadow-md fixed">
            <div className="p-4 font-bold text-xl border-b">Hospital Admin</div>
            <nav className="p-4 space-y-2">
                <NavLink
                    to="/"
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
                    to="/add-staff"
                    className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : "text-gray-700"}`
                    }
                >
                    Add Staff
                </NavLink>

                <NavLink
                    to="/schedule"
                    className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : "text-gray-700"}`
                    }
                >
                    Doctor Schedule
                </NavLink>

                <NavLink
                    to="/add-appointment"
                    className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : "text-gray-700"}`
                    }
                >
                    Add Appointment
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
        </aside>
    );
};

export default Sidebar;
