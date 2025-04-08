import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MedicationRecord() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  if (!token) {
    return <div>Please log in to view your medication records.</div>;
  }

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/medication/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMedications(response.data);
      } catch (err) {
        setError('Failed to load medication records.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, [token]);

  if (loading) return <div>Loading medication records...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-300 p-5 border border-gray-600">
      <h2 className="text-center text-xl mb-4">MEDICATION RECORDS</h2>
      {medications.length === 0 ? (
        <p className="text-center">No medication records found.</p>
      ) : (
        <div className="space-y-4">
          {medications.map((med) => (
            <div key={med.id} className="bg-gray-200 p-3 border border-gray-500">
              <p><strong>Drug Name:</strong> {med.drug_name}</p>
              <p><strong>Dosage:</strong> {med.dosage}</p>
              <p><strong>Prescribed By Doctor ID:</strong> {med.doctor}</p>
              <p><strong>Created At:</strong> {new Date(med.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MedicationRecord;
