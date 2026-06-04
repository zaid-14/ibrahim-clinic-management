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
      <div className="text-center text-lg py-8">
        Loading appointments...
      </div>
    );
  }

  return (
    <div
      id="appointments"
      className="bg-white mt-8 p-4 md:p-6 rounded-2xl shadow-md"
    >
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        Appointment Management
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-[850px] w-full border-collapse">
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
                <td className="p-3 font-medium">
                  {appointment.patientName}
                </td>

                <td className="p-3 whitespace-nowrap">
                  {appointment.date}
                </td>

                <td className="p-3 whitespace-nowrap">
                  {appointment.time}
                </td>

                <td className="p-3 max-w-[250px]">
                  {appointment.symptoms}
                </td>

                <td className="p-3">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-white text-xs md:text-sm
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
                  <div className="flex flex-col md:flex-row gap-2">
                    <button
                      onClick={() =>
                        updateStatus(
                          appointment.id,
                          "approved"
                        )
                      }
                      className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-3 py-2
                        rounded-lg
                        text-sm
                      "
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
                      className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-3 py-2
                        rounded-lg
                        text-sm
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