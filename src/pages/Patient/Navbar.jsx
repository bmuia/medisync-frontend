import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    logout(); 
    navigate('/')
  };

  return (
    <div className="bg-gray-600 text-white font-bold px-4 py-2 border-b-2 border-gray-500 flex justify-between items-center">
      <span className="font-mono">🖥️ Superman App</span>
      
      {isLoggedIn && (
        <button
          className="px-3 py-1 bg-gray-500 border border-gray-400 text-white font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:bg-gray-400"
          onClick={handleLogout}
        >
          🔄 Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
