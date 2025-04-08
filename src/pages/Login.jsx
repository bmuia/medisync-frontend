import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const API_URL = "http://localhost:8000";
  
    try {
      const response = await axios.post(`${API_URL}/api/login/`, { email, password });
      const { access, refresh, role } = response.data;
  
      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("role", role);
      window.localStorage.setItem('isLoggedIn', true);
  
      window.location.href = `/${role}-dashboard`;  // Redirect based on role
  
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="w-[380px] bg-gray-200 border-[3px] border-gray-800 shadow-[inset_-2px_-2px_0px_#fff,inset_2px_2px_0px_#000]">
        <div className="flex items-center justify-between bg-blue-600 text-white px-3 py-2 font-bold text-lg border-b-[2px] border-black">
          <span>🔐 Secure Login - HIE-windows 95</span>
        </div>
        <div className="p-5">
          <p className="text-center text-black text-sm mb-3">
            Please enter your credentials below to access the system.
          </p>
          {error && <div className="text-red-600 text-center mb-3 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-black text-sm font-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 text-black border border-gray-800 shadow-[inset_-2px_-2px_0px_#fff,inset_2px_2px_0px_#000] focus:outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-black text-sm font-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 text-black border border-gray-800 shadow-[inset_-2px_-2px_0px_#fff,inset_2px_2px_0px_#000] focus:outline-none"
                required
              />
            </div>
            <div className="text-center mt-5">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-gray-200 text-black border border-gray-800 shadow-[inset_-2px_-2px_0px_#fff,inset_2px_2px_0px_#000] hover:bg-gray-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          <div className="text-center text-sm mt-5 text-black border-t-[2px] border-gray-800 pt-3">
            <p>🔒 Secure Systems © 2025 - All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
