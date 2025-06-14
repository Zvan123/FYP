import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AddAppointment = () => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [formData, setFormData] = useState({
        patient_id: '',
        doctor_id: '',
        appointment_date: '',
        appointment_time: '',
        reason: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await axios.get('/api/patients');
                setPatients(res.data);
            } catch (err) {
                console.error('Error fetching patients:', err);
            }
        };
        fetchPatients();
    }, []);

    useEffect(() => {
        const fetchDoctors = async () => {
            if (!selectedDate || !selectedTime) return;

            try {
                const res = await axios.get('/api/staff/available-doctors', {
                    params: {
                        date: selectedDate,
                        time: selectedTime,
                    },
                });
                setDoctors(res.data);
            } catch (err) {
                console.error('Error fetching available doctors:', err);
            }
        };
        fetchDoctors();
    }, [selectedDate, selectedTime]);

    const generateTimeSlots = () => {
        const start = 8 * 60; // 8am
        const end = 18 * 60; // 6pm
        const intervals = [];

        for (let mins = start; mins < end; mins += 30) {
            const hours = String(Math.floor(mins / 60)).padStart(2, '0');
            const minutes = String(mins % 60).padStart(2, '0');
            intervals.push(`${hours}:${minutes}`);
        }

        return intervals;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (e) => {
        const selected = e.target.value;
        setSelectedDate(selected);
        setFormData({ ...formData, appointment_date: selected });
    };

    const handleTimeChange = (e) => {
        const time = e.target.value;
        setSelectedTime(time);
        setFormData({ ...formData, appointment_time: time });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { patient_id, doctor_id, appointment_date, appointment_time, reason } = formData;

        if (!patient_id || !doctor_id || !appointment_date || !appointment_time || !reason) {
            setError('All fields are required.');
            return;
        }

        try {
            await axios.post('/api/appointments', {
                patient_id,
                staff_id: doctor_id,
                appointment_date,
                appointment_time,
                reason
            });

            navigate('/appointments');
        } catch (err) {
            console.error('Error creating appointment:', err);
            setError('Failed to create appointment.');
        }
    };


    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-4">
                <Link to="/appointments" className="text-blue-600 hover:underline">
                    ← Back to Appointments
                </Link>
            </div>
            <h1 className="text-2xl font-bold mb-4">Add Appointment</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded shadow space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Select Patient *</label>
                    <select
                        name="patient_id"
                        value={formData.patient_id}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">-- Select Patient --</option>
                        {patients.map((p) => (
                            <option key={p.patient_id} value={p.patient_id}>
                                {p.name} ({p.patient_id})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Appointment Date *</label>
                    <input
                        type="date"
                        name="appointment_date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="w-full p-2 border rounded"
                        required
                        min={minDate}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Appointment Time *</label>
                    <select
                        name="appointment_time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">-- Select Time --</option>
                        {generateTimeSlots().map((time) => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Available Doctors *</label>
                    <select
                        name="doctor_id"
                        value={formData.doctor_id}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">-- Select Doctor --</option>
                        {doctors.map((d) => (
                            <option key={d.staff_id} value={d.staff_id}>
                                {d.name} ({d.staff_id})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Reason *</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter reason for visit"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Confirm Appointment
                </button>
            </form>
        </div>
    );
};

export default AddAppointment;
