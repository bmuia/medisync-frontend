import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaFileMedical, FaDownload, FaPlus, FaMinus } from "react-icons/fa";
import { jsPDF } from "jspdf";

function MedicalRecord() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRecord, setExpandedRecord] = useState(null);

  const token = localStorage.getItem("token");
  if (!token) {
    return <div>Please log in to view your medical records.</div>;
  }

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/medical-records/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecords(response.data);
      } catch (err) {
        setError("Failed to load medical records.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedRecord(expandedRecord === id ? null : id);
  };

  // Function to generate the PDF using jsPDF
  const handleDownloadPDF = (record) => {
    const doc = new jsPDF();
    
    // Add content to the PDF
    doc.text(`Medical Record Number: ${record.patient.medical_record_number}`, 10, 10);
    doc.text(`Patient ID: ${record.patient.id}`, 10, 20);
    doc.text(`Diagnosis: ${record.diagnosis.diagnosis}`, 10, 30);
    doc.text(`Diagnosis Date: ${new Date(record.diagnosis.created_at).toLocaleString()}`, 10, 40);
    doc.text(`Doctor Email: ${record.diagnosis.doctor.email}`, 10, 50);
    doc.text(`Treatment Plan: ${record.treatment.treatment_details}`, 10, 60);
    doc.text(`Drug Name: ${record.medication.drug_name}`, 10, 70);
    doc.text(`Dosage: ${record.medication.dosage}`, 10, 80);
    doc.text(`Record Created At: ${new Date(record.created_at).toLocaleString()}`, 10, 90);

    // Save the PDF
    doc.save('medical_record.pdf');
  };

  if (loading) return <div>Loading medical records...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-100 p-5 border border-gray-600 min-h-screen">
      <h2 className="text-center text-2xl font-bold mb-4">Medical Records</h2>
      {records.length === 0 ? (
        <p className="text-center">No medical records found.</p>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="bg-white shadow-md p-4 border border-gray-400">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(record.id)}
              >
                <div className="flex items-center gap-2">
                  <FaFileMedical className="text-blue-600" />
                  <span className="font-semibold">Medical Record {record.patient.medical_record_number}</span>
                </div>
                <button className="text-lg">
                  {expandedRecord === record.id ? <FaMinus /> : <FaPlus />}
                </button>
              </div>

              {expandedRecord === record.id && (
                <div className="mt-4 bg-gray-200 p-3 border border-gray-500">
                  <h3 className="text-lg font-bold">Patient Information</h3>
                  <p><strong>Medical Record Number:</strong> {record.patient.medical_record_number}</p>
                  <p><strong>Patient ID:</strong> {record.patient.id}</p>

                  <h3 className="text-lg font-bold mt-3">Diagnosis</h3>
                  <p><strong>Diagnosis:</strong> {record.diagnosis.diagnosis}</p>
                  <p><strong>Diagnosis Date:</strong> {new Date(record.diagnosis.created_at).toLocaleString()}</p>
                  <p><strong>Doctor Email:</strong> {record.diagnosis.doctor.email}</p>

                  <h3 className="text-lg font-bold mt-3">Treatment</h3>
                  <p><strong>Treatment Plan:</strong> {record.treatment.treatment_details}</p>

                  <h3 className="text-lg font-bold mt-3">Medication</h3>
                  <p><strong>Drug Name:</strong> {record.medication.drug_name}</p>
                  <p><strong>Dosage:</strong> {record.medication.dosage}</p>

                  <p className="mt-3 text-sm"><strong>Record Created At:</strong> {new Date(record.created_at).toLocaleString()}</p>

                  {/* Retro "Generate PDF" Button */}
                  <button
                    className="retro-button mt-4 flex items-center gap-2"
                    onClick={() => handleDownloadPDF(record)}
                  >
                    <FaDownload />
                    Generate PDF
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MedicalRecord;
