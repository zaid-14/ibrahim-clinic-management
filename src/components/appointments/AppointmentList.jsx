import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "appointments"));

      const appointmentData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(appointmentData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const appointmentRef = doc(db, "appointments", id);

      await updateDoc(appointmentRef, {
        status,
      });

      fetchAppointments();
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg py-8">Loading appointments...</div>
    );
  }

  return (
    <div
      id="appointments"
      className="bg-white mt-8 p-4 md:p-6 rounded-2xl shadow-md"
    >
      {/* <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        Manage Appointments
      </h2> */}

      {/* MOBILE CARDS */}
      <div className="block md:hidden space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-gray-50 border rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{appointment.patientName}</h3>

                <p className="text-gray-500 text-sm mt-1">{appointment.date}</p>

                <p className="text-gray-500 text-sm">{appointment.time}</p>
              </div>

              <span
                className={`
                px-3 py-1 rounded-full text-white text-xs

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
            </div>

            <div className="mt-4">
              <p className="font-medium text-gray-700">Symptoms</p>

              <p className="text-gray-600 mt-1">{appointment.symptoms}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => updateStatus(appointment.id, "approved")}
                className="
                flex-1
                bg-green-600
                hover:bg-green-700
                text-white
                py-2
                rounded-lg
                text-sm
              "
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(appointment.id, "rejected")}
                className="
                flex-1
                bg-red-500
                hover:bg-red-600
                text-white
                py-2
                rounded-lg
                text-sm
              "
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Patient</th>

              <th className="p-3 text-left">Date</th>

              <th className="p-3 text-left">Time</th>

              <th className="p-3 text-left">Symptoms</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b">
                <td className="p-3">{appointment.patientName}</td>

                <td className="p-3 whitespace-nowrap">{appointment.date}</td>

                <td className="p-3 whitespace-nowrap">{appointment.time}</td>

                <td className="p-3">{appointment.symptoms}</td>

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

                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(appointment.id, "approved")}
                      className="
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      px-4 py-2
                      rounded-lg
                    "
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(appointment.id, "rejected")}
                      className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      px-4 py-2
                      rounded-lg
                    "
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentList;
