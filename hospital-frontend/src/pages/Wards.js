import React from 'react';

const Wards = () => {
    const dummyWards = [
        { id: 1, name: 'Ward A', capacity: 10, occupied: 7 },
        { id: 2, name: 'Ward B', capacity: 8, occupied: 5 },
        { id: 3, name: 'Ward C', capacity: 12, occupied: 12 },
    ];

    return (

        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Wards</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Ward Name</th>
                            <th className="px-4 py-2 text-left">Capacity</th>
                            <th className="px-4 py-2 text-left">Occupied</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyWards.map((ward) => (
                            <tr key={ward.id} className="border-t">
                                <td className="px-4 py-2">{ward.name}</td>
                                <td className="px-4 py-2">{ward.capacity}</td>
                                <td className="px-4 py-2">{ward.occupied}</td>
                                <td className="px-4 py-2">
                                    {ward.occupied >= ward.capacity ? (
                                        <span className="text-red-500 font-medium">Full</span>
                                    ) : (
                                        <span className="text-green-500 font-medium">Available</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default Wards;