import React, { useEffect, useState } from 'react';
import axios from 'axios';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['7am-4pm', '4pm-11pm', '11pm-7am', '-'];

const StaffSchedule = () => {
    const [staffList, setStaffList] = useState([]);
    const [schedule, setSchedule] = useState({});
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [staffRes, scheduleRes] = await Promise.all([
                    axios.get('/api/staff'),
                    axios.get('/api/staff-schedule')
                ]);

                setStaffList(staffRes.data);

                const scheduleMap = {};
                scheduleRes.data.forEach(({ staff_id, day, time_slot }) => {
                    scheduleMap[`${staff_id}-${day}`] = time_slot;
                });
                setSchedule(scheduleMap);
            } catch (err) {
                console.error('Error loading schedule:', err);
            }
        };

        fetchData();
    }, []);

    const handleChange = (staffId, day, timeSlot) => {
        const key = `${staffId}-${day}`;

        // Prevent assigning multiple shifts for the same day
        const alreadyAssigned = Object.entries(schedule).some(([k, v]) =>
            k.startsWith(`${staffId}-`) && k !== key && v !== '-' && day === k.split('-')[1]
        );

        if (alreadyAssigned) {
            alert('Each staff can only have one time slot per day.');
            return;
        }

        setSchedule(prev => ({ ...prev, [key]: timeSlot }));
    };

    const toggleEditing = () => setEditing(prev => !prev);

    const saveChanges = async () => {
        try {
            const updates = [];

            Object.entries(schedule).forEach(([key, timeSlot]) => {
                const [staffId, day] = key.split('-');
                updates.push({ staff_id: staffId, day, time_slot: timeSlot });
            });

            await axios.put('/api/staff-schedule', { updates });
            alert('Schedule updated successfully!');
            setEditing(false);
        } catch (err) {
            console.error('Error saving schedule:', err);
            alert('Failed to save schedule.');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Staff Schedule</h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={editing ? saveChanges : toggleEditing}
                >
                    {editing ? 'Save Changes' : 'Edit Schedule'}
                </button>
            </div>
            <div className="overflow-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Name</th>
                            {days.map(day => (
                                <th key={day} className="border px-4 py-2">{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {staffList.map((staff, index) => (
                            <tr key={staff.staff_id}>
                                <td className="border px-4 py-2 text-center font-medium">{index + 1}</td>
                                <td className="border px-4 py-2 font-medium">{staff.name}</td>
                                {days.map(day => {
                                    const key = `${staff.staff_id}-${day}`;
                                    return (
                                        <td key={day} className="border px-2 py-2 text-center">
                                            {editing ? (
                                                <select
                                                    className="border rounded p-1"
                                                    value={schedule[key] || '-'}
                                                    onChange={e => handleChange(staff.staff_id, day, e.target.value)}
                                                >
                                                    {timeSlots.map(slot => (
                                                        <option key={slot} value={slot}>{slot}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span>{schedule[key] || '-'}</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffSchedule;
