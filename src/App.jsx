import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import PatientDashboard from './pages/Patient/PatientDashboard';
import Unauthorized from './pages/Unathorized';
import { AuthProvider } from './Context/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (token && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
    }
  }, []);

  return (
    <AuthProvider>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Private Routes */}
        <Route
          path="/patient-dashboard/*"
          element={
            <PrivateRoute allowedRoles={['patient']} isLoggedIn={isLoggedIn} role={role}>
              <PatientDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
