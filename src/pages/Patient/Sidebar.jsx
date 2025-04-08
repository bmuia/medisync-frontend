import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="w-64 min-h-screen bg-gray-300 border-r-2 border-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            <div className="bg-blue-600 text-white font-bold px-4 py-2 border-b border-gray-500">
                📁 Patient Menu
            </div>
            <ul className="p-2 text-gray-900 font-mono text-sm">
                {/* Dashboard */}
                <li className="p-2 border border-gray-500 bg-gray-400 hover:bg-gray-500 cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
                    <Link to="/patient-dashboard/patient">🏠 Dashboard</Link>
                </li>
                
                {/* Diagnosis Records */}
                <li className="p-2 mt-2 border border-gray-500 bg-gray-400 hover:bg-gray-500 cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
                    <Link to="/patient-dashboard/patient-diagnosis">🩺 Diagnosis Records</Link>
                </li>
                
                {/* Treatment Plans */}
                <li className="p-2 mt-2 border border-gray-500 bg-gray-400 hover:bg-gray-500 cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
                    <Link to="/patient-dashboard/patient-treatment">💊 Treatment Plan</Link> {/* Make sure this path matches */}
                </li>
                
                {/* Medication Records */}
                <li className="p-2 mt-2 border border-gray-500 bg-gray-400 hover:bg-gray-500 cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
                    <Link to="/patient-dashboard/patient-medication">💊 Medication Records</Link>
                </li>
                
                {/* Medical History */}
                <li className="p-2 mt-2 border border-gray-500 bg-gray-400 hover:bg-gray-500 cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
                    <Link to="/patient-dashboard/patient-medical-history">📜 Medical Records</Link>
                </li>


            </ul>
        </div>
    );
}

export default Sidebar;
