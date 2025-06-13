import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddAppointment = () => {
    const [patients, setPatients] = useState([]);
    const [staff, setStaff] = useState([]);
    const [formData, setFormData] = useState({
        patient_id: '',
        staff_id: '',
        appointment_date: '',
        appointment_time: '',
        status: 'Scheduled',
    });

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/patients');
                if (Array.isArray(res.data)) setPatients(res.data);
                else console.error('Expected array but got:', res.data);
            } catch (err) {
                console.error('Error fetching patients:', err);
            }
        };

        const fetchStaff = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/staff?role=Doctor&shift=Day');
                setStaff(res.data);
            } catch (err) {
                console.error('Error fetching staff:', err);
            }
        };

        fetchPatients();
        fetchStaff();
    }, []);

    const generateTimeSlots = () => {
        const start = 8;
        const end = 18;
        const slots = [];
        for (let h = start; h < end; h++) {
            slots.push(`${h.toString().padStart(2, '0')}:00`);
            slots.push(`${h.toString().padStart(2, '0')}:30`);
        }
        return slots;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/appointments', formData);
            alert('Appointment added!');
            setFormData({
                patient_id: '',
                staff_id: '',
                appointment_date: '',
                appointment_time: '',
                status: 'Scheduled',
            });
        } catch (err) {
            console.error('Error adding appointment:', err);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Add Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-gray-700">Select Patient</label>
                    <select
                        name="patient_id"
                        value={formData.patient_id}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border rounded"
                    >
                        <option value="">-- Choose Patient --</option>
                        {patients.map(p => (
                            <option key={p.patient_id} value={p.patient_id}>
                                {p.full_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700">Select Doctor</label>
                    <select
                        name="staff_id"
                        value={formData.staff_id}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border rounded"
                    >
                        <option value="">-- Choose Doctor --</option>
                        {staff.map(s => (
                            <option key={s.staff_id} value={s.staff_id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700">Appointment Date</label>
                    <input
                        type="date"
                        name="appointment_date"
                        value={formData.appointment_date}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Time</label>
                    <select
                        name="appointment_time"
                        value={formData.appointment_time}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border rounded"
                    >
                        <option value="">-- Select Time --</option>
                        {generateTimeSlots().map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Add Appointment
                </button>
            </form>
        </div>
    );
};

export default AddAppointment;
