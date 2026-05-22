import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  db
} from "../../firebase/config";

function PatientSearch() {

  const [searchTerm, setSearchTerm] = useState("");

  const [patients, setPatients] = useState([]);

  const [filteredPatients, setFilteredPatients] = useState([]);

  // Fetch Patients
  const fetchPatients = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "medicalRecords")
        );

      const patientData =
        querySnapshot.docs.map((doc) => ({

          id: doc.id,

          ...doc.data()

        }));

      setPatients(patientData);

      setFilteredPatients(patientData);

    } catch (error) {

      alert(error.message);

    }

  };

  useEffect(() => {

    fetchPatients();

  }, []);

  // Handle Search
  const handleSearch = (value) => {

    setSearchTerm(value);

    const filtered =
      patients.filter((patient) =>
        patient.patientName
          ?.toLowerCase()
          .includes(value.toLowerCase())
      );

    setFilteredPatients(filtered);

  };

  return (

    <div className="bg-white mt-8 p-6 rounded-2xl shadow-md">

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-gray-800">

        Patient Search

      </h2>

      {/* SEARCH INPUT */}
      <div className="mt-6">

        <input
          type="text"
          placeholder="Search patient by name..."
          className="w-full border p-4 rounded-xl"
          value={searchTerm}
          onChange={(e) =>
            handleSearch(e.target.value)
          }
        />

      </div>

      {/* RESULTS */}
      <div className="mt-8 space-y-4">

        {filteredPatients.length === 0 ? (

          <p className="text-gray-500">

            No patients found.

          </p>

        ) : (

          filteredPatients.map((patient) => (

            <div
              key={patient.id}
              className="border rounded-xl p-5 bg-gray-50"
            >

              <h3 className="text-xl font-bold text-green-700">

                {patient.patientName}

              </h3>

              <p className="mt-2">

                <span className="font-semibold">

                  Diagnosis:

                </span>{" "}

                {patient.diagnosis}

              </p>

              <p className="mt-2 text-gray-600">

                {patient.notes}

              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default PatientSearch;