import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PatientDetails() {
    const [patientDetails, setPatientDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const API_URL = 'http://localhost:8000';
                const token = localStorage.getItem('token');

                if (!token) {
                    setError("No token found. Please log in.");
                    setLoading(false);
                    return;
                }

                const tokenPayload = JSON.parse(atob(token.split('.')[1]));
                const userId = tokenPayload.user_id || tokenPayload.id;

                if (!userId) {
                    setError("User ID not found in token.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${API_URL}/api/fhir/patient/${userId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Fetched Patient Data:", response.data);
                setPatientDetails(response.data);
            } catch (error) {
                console.error("Error fetching patient details:", error);
                setError("Failed to load patient details.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, []);

    if (loading) return <div className="text-gray-800 p-4 bg-gray-300 border-2 border-gray-500">Loading patient details...</div>;
    if (error) return <div className="text-red-700 p-4 bg-gray-300 border-2 border-gray-500">{error}</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-400">
            <div className="w-96 p-4 bg-gray-300 border-2 border-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                <div className="bg-gray-600 text-white font-bold px-2 py-1 text-sm border-b border-gray-500 flex justify-between items-center">
                    <span>Patient Details</span>
                    <button className="px-2 py-0.5 bg-gray-500 hover:bg-gray-400 text-white border border-gray-400">
                        ✕
                    </button>
                </div>
                
                <div className="p-4 text-gray-900 font-mono text-sm">
                    <p><strong>ID:</strong> {patientDetails.id}</p>
                    <p><strong>Name:</strong> {patientDetails.name?.[0]?.given?.[0]} {patientDetails.name?.[0]?.family}</p>
                    <p><strong>Email:</strong> {patientDetails.telecom?.[0]?.value}</p>
                    <p><strong>Address:</strong> {patientDetails.address?.[0]?.line?.[0]}, {patientDetails.address?.[0]?.city}</p>
                </div>

                <div className="flex justify-end mt-4">
                    <button className="px-4 py-1 bg-gray-400 border border-gray-500 text-black font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:bg-gray-500">
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PatientDetails;
