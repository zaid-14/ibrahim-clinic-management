import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "../../firebase/config";

function AppointmentList() {

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch Appointments
  const fetchAppointments = async () => {

    try {

      const querySnapshot =
        await getDocs(collection(db, "appointments"));

      const appointmentData =
        querySnapshot.docs.map((doc) => ({

          id: doc.id,

          ...doc.data()

        }));

      setAppointments(appointmentData);

    } catch (error) {

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

  // Load On Start
  useEffect(() => {

    fetchAppointments();

  }, []);

  // Update Status
  const updateStatus = async (id, status) => {

    try {

      const appointmentRef =
        doc(db, "appointments", id);

      await updateDoc(appointmentRef, {

        status: status

      });

      alert(`Appointment ${status}`);

      fetchAppointments();

    } catch (error) {

      alert(error.message);

    }

  };

  if (loading) {

    return (
      <div className="text-center text-lg">
        Loading appointments...
      </div>
    );

  }

  return (

    <div className="bg-white mt-8 p-6 rounded-2xl shadow-md overflow-x-auto">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">

        Appointment Management

      </h2>

      <table className="w-full border-collapse">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-3 text-left">
              Patient
            </th>

            <th className="p-3 text-left">
              Date
            </th>

            <th className="p-3 text-left">
              Time
            </th>

            <th className="p-3 text-left">
              Symptoms
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {appointments.map((appointment) => (

            <tr
              key={appointment.id}
              className="border-b"
            >

              <td className="p-3">
                {appointment.patientName}
              </td>

              <td className="p-3">
                {appointment.date}
              </td>

              <td className="p-3">
                {appointment.time}
              </td>

              <td className="p-3">
                {appointment.symptoms}
              </td>

              <td className="p-3">

                <span
                  className={`
                    px-3 py-1 rounded-full text-white text-sm
                    ${
                      appointment.status === "approved"
                        ? "bg-green-500"
                        : appointment.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }
                  `}
                >

                  {appointment.status}

                </span>

              </td>

              <td className="p-3 space-x-2">

                <button
                  onClick={() =>
                    updateStatus(
                      appointment.id,
                      "approved"
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >

                  Approve

                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      appointment.id,
                      "rejected"
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >

                  Reject

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AppointmentList;