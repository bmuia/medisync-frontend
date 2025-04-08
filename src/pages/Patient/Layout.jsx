import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom'; 

function Layout() {
    return (
        <div className="flex min-h-screen bg-gray-400">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Navbar />
                <main className="p-4">
                    <Outlet /> 
                </main>
            </div>
        </div>
    );
}

export default Layout;
