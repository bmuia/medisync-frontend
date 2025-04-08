import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientDetails from './PatientDetails';
import Diagnosis from './Diagnosis';
import TreatmentPlan from './TreatmentPlan';
import MedicalRecord from './MedicalRecord';
import MedicationRecord from './MedicationRecord';
import Layout from './Layout';

function PatientDashboard() {
  return (
    <Routes>
      {/* Define the root path for Layout */}
      <Route path="/" element={<Layout />}>
        {/* Nested routes inside Layout */}
        <Route path="patient" element={<PatientDetails />} /> {/* Default route for Patient Details */}
        <Route path="patient-diagnosis" element={<Diagnosis />} />  
        <Route path="patient-treatment" element={<TreatmentPlan />} /> 
        <Route path='patient-medical-history' element={<MedicalRecord/>} />
        <Route path='patient-medication' element={<MedicationRecord />} />
      </Route>
    </Routes>
  );
}

export default PatientDashboard;
