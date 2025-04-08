import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  // Check localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    
    if (token && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }
  }, []);

  const login = (token, userRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
