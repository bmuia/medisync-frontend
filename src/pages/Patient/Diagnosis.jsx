import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Diagnosis() {
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  if (!token) {
    return <div>Please log in to view your diagnosis records.</div>;
  }

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/diagnosis/', 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Sort the diagnoses array by 'created_at' in descending order
        const sortedDiagnoses = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setDiagnoses(sortedDiagnoses);
      } catch (err) {
        setError('Failed to load diagnosis records.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnoses();
  }, [token]);

  if (loading) return <div className="text-center font-mono text-white bg-gray-800 p-2">Loading diagnosis records...</div>;
  if (error) return <div className="text-center font-mono text-white bg-red-600 p-2">{error}</div>;

  return (
    <div className="bg-gray-200 p-4 font-mono text-sm text-black">
      <div className="border-2 border-gray-600 rounded-lg shadow-xl bg-white p-4">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Your Diagnosis Records</h2>
        {diagnoses.length === 0 ? (
          <p>No diagnosis records found for your account.</p>
        ) : (
          <ul className="space-y-4">
            {diagnoses.map((diagnosis) => (
              <li key={diagnosis.id} className="border p-4 bg-gray-100 rounded-md shadow-sm">
                <div className="text-blue-700">
                  <strong>Diagnosis:</strong> {diagnosis.diagnosis} <br />
                  <strong>Doctor:</strong>{' '}
                  {diagnosis.doctor && diagnosis.doctor.first_name && diagnosis.doctor.last_name ? (
                    <>
                      {diagnosis.doctor.first_name} {diagnosis.doctor.last_name} <br />
                      <strong>Email:</strong> {diagnosis.doctor.email} <br />
                    </>
                  ) : (
                    <em>Doctor information unavailable</em>
                  )}
                  <strong>Created At:</strong> {new Date(diagnosis.created_at).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Diagnosis;
