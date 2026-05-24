import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import {
  db
} from "../../firebase/config";

function DoctorAppointments() {

  const [appointments, setAppointments] =
    useState([]);

  const [selectedPatient, setSelectedPatient] =
    useState(null);

  const [diagnosis, setDiagnosis] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [followUpDate, setFollowUpDate] =
    useState("");

  // LIVE APPOINTMENTS
  useEffect(() => {

    const unsubscribe =
      onSnapshot(
        collection(db, "appointments"),
        (snapshot) => {

          const appointmentData =
            snapshot.docs.map((doc) => ({

              id: doc.id,

              ...doc.data()

            }));

          const approvedAppointments =
            appointmentData.filter(
              (appointment) =>
                appointment.status ===
                "approved"
            );

          setAppointments(
            approvedAppointments
          );

        }
      );

    return () => unsubscribe();

  }, []);

  // SAVE CONSULTATION
  const handleSaveConsultation =
    async () => {

      if (!selectedPatient) {

        alert(
          "Select patient first"
        );

        return;

      }

      try {

        // SAVE RECORD
        await addDoc(
          collection(
            db,
            "medicalRecords"
          ),
          {

            patientName:
              selectedPatient.patientName,

            diagnosis,

            notes,

            followUpDate,

            createdAt:
              serverTimestamp()

          }
        );

        // FOLLOW-UP
        if (followUpDate) {

          await addDoc(
            collection(
              db,
              "followUps"
            ),
            {

              patientName:
                selectedPatient.patientName,

              followUpDate,

              advice:
                "Follow-up consultation",

              createdAt:
                serverTimestamp()

            }
          );

        }

        alert(
          "Consultation Saved"
        );

        setDiagnosis("");

        setNotes("");

        setFollowUpDate("");

        setSelectedPatient(null);

      } catch (error) {

        alert(error.message);

      }

    };

  return (

    <div>

      {/* PAGE TITLE */}
      <div>

        <h1 className="text-4xl font-bold text-gray-800">

          Today's Consultations

        </h1>

        <p className="text-gray-500 mt-2">

          Approved patient appointments

        </p>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

        {/* PATIENT LIST */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-2xl font-bold text-green-700">

            Patient Queue

          </h2>

          <div className="mt-6 space-y-4">

            {appointments.length === 0 ? (

              <p className="text-gray-500">

                No approved appointments.

              </p>

            ) : (

              appointments.map((appointment) => (

                <div
                  key={appointment.id}
                  className={`
                    border rounded-xl p-4 cursor-pointer
                    transition-all duration-200

                    ${
                      selectedPatient?.id ===
                      appointment.id
                        ? "border-green-600 bg-green-50"
                        : "hover:bg-gray-50"
                    }
                  `}
                  onClick={() =>
                    setSelectedPatient(
                      appointment
                    )
                  }
                >

                  <h3 className="text-xl font-bold text-gray-800">

                    {appointment.patientName}

                  </h3>

                  <p className="text-gray-500 mt-1">

                    {appointment.date} • {appointment.time}

                  </p>

                  <p className="mt-3 text-gray-700">

                    Symptoms:
                    {" "}
                    {appointment.symptoms}

                  </p>

                </div>

              ))

            )}

          </div>

        </div>

        {/* CONSULTATION FORM */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-2xl font-bold text-green-700">

            Consultation Room

          </h2>

          {!selectedPatient ? (

            <p className="text-gray-500 mt-6">

              Select patient from queue.

            </p>

          ) : (

            <div className="mt-6">

              {/* PATIENT INFO */}
              <div className="bg-green-50 p-4 rounded-xl">

                <h3 className="text-xl font-bold text-green-700">

                  {selectedPatient.patientName}

                </h3>

                <p className="mt-2 text-gray-700">

                  Symptoms:
                  {" "}
                  {selectedPatient.symptoms}

                </p>

              </div>

              {/* DIAGNOSIS */}
              <div className="mt-6">

                <label className="font-semibold text-gray-700">

                  Diagnosis

                </label>

                <input
                  type="text"
                  className="w-full border p-3 rounded-xl mt-2"
                  placeholder="Enter diagnosis"
                  value={diagnosis}
                  onChange={(e) =>
                    setDiagnosis(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* NOTES */}
              <div className="mt-6">

                <label className="font-semibold text-gray-700">

                  Consultation Notes

                </label>

                <textarea
                  rows="5"
                  className="w-full border p-3 rounded-xl mt-2"
                  placeholder="Write consultation notes"
                  value={notes}
                  onChange={(e) =>
                    setNotes(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* FOLLOW-UP */}
              <div className="mt-6">

                <label className="font-semibold text-gray-700">

                  Follow-Up Date

                </label>

                <input
                  type="date"
                  className="w-full border p-3 rounded-xl mt-2"
                  value={followUpDate}
                  onChange={(e) =>
                    setFollowUpDate(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* SAVE */}
              <button
                onClick={
                  handleSaveConsultation
                }
                className="
                  mt-8 w-full
                  bg-green-700 hover:bg-green-800
                  text-white
                  p-4 rounded-xl
                  font-semibold
                "
              >

                Save Consultation

              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default DoctorAppointments;