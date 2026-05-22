import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/config";

function MedicalRecords() {
  const [patientName, setPatientName] = useState("");

  const [diagnosis, setDiagnosis] = useState("");

  const [notes, setNotes] = useState("");

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(false);

  // Fetch Records
  const fetchRecords = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "medicalRecords"));

      const recordsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),
      }));

      setRecords(recordsData);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Add Record
  const handleAddRecord = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addDoc(collection(db, "medicalRecords"), {
        patientName,

        diagnosis,

        notes,

        createdAt: serverTimestamp(),
      });

      alert("Medical Record Added");

      setPatientName("");

      setDiagnosis("");

      setNotes("");

      fetchRecords();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="patients" className="bg-white mt-8 p-6 rounded-2xl shadow-md">
      {/* TITLE */}
      <h2 className="text-2xl font-bold text-gray-800">
        Patient Medical Records
      </h2>

      {/* FORM */}
      <form onSubmit={handleAddRecord} className="mt-6 space-y-4">
        {/* PATIENT NAME */}
        <input
          type="text"
          placeholder="Patient Name"
          className="w-full border p-3 rounded-lg"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />

        {/* DIAGNOSIS */}
        <input
          type="text"
          placeholder="Diagnosis"
          className="w-full border p-3 rounded-lg"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          required
        />

        {/* NOTES */}
        <textarea
          rows="4"
          placeholder="Consultation Notes"
          className="w-full border p-3 rounded-lg"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Saving..." : "Add Medical Record"}
        </button>
      </form>

      {/* RECORD LIST */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-gray-700 mb-4">
          Patient History
        </h3>

        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="border p-5 rounded-xl bg-gray-50">
              <h4 className="text-lg font-bold text-green-700">
                {record.patientName}
              </h4>

              <p className="mt-2">
                <span className="font-semibold">Diagnosis:</span>{" "}
                {record.diagnosis}
              </p>

              <p className="mt-2 text-gray-600">{record.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MedicalRecords;
