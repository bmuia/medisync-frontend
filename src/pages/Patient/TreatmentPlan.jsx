import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TreatmentPlan() {
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token from local storage
  const token = localStorage.getItem('token');
  if (!token) {
    return <div>Please log in to view your treatment plan records.</div>;
  }

  // Fetch treatment plans
  useEffect(() => {
    const fetchTreatmentPlans = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/treatment-plan/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTreatmentPlans(response.data);
      } catch (err) {
        setError('Failed to load treatment plans.');
      } finally {
        setLoading(false);
      }
    };

    fetchTreatmentPlans();
  }, [token]);

  if (loading) return <div className="text-black font-sans text-lg">Loading treatment plans...</div>;
  if (error) return <div className="text-black font-sans text-lg">{error}</div>;

  return (
    <div className="bg-gray-300 text-black p-5 border border-gray-600">
      <h2 className="text-center text-xl font-sans mb-4">TREATMENT PLAN RECORDS</h2>
      {treatmentPlans.length === 0 ? (
        <p className="text-center text-lg">No treatment plans found for your account.</p>
      ) : (
        <div className="space-y-4">
          {treatmentPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-gray-200 p-3 border border-gray-500 font-sans"
            >
              <p>
                <strong>Treatment Details:</strong> {plan.treatment_details}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(plan.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TreatmentPlan;
