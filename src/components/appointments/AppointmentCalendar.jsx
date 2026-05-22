import { useEffect, useState } from "react";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  db
} from "../../firebase/config";

function AppointmentCalendar() {

  const [date, setDate] = useState(new Date());

  const [appointments, setAppointments] = useState([]);

  // Fetch Appointments
  const fetchAppointments = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "appointments")
        );

      const appointmentData =
        querySnapshot.docs.map((doc) => ({

          id: doc.id,

          ...doc.data()

        }));

      setAppointments(appointmentData);

    } catch (error) {

      alert(error.message);

    }

  };

  useEffect(() => {

    fetchAppointments();

  }, []);

  // Format Selected Date
  const formattedDate =
  `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

  // Filter Appointments
  const filteredAppointments =
    appointments.filter(
      (appointment) =>
        appointment.date === formattedDate
    );

  return (

    <div className="bg-white mt-8 p-6 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">

        Appointment Calendar

      </h2>

      {/* CALENDAR */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT */}
        <div>

          <Calendar
            onChange={setDate}
            value={date}
          />

        </div>

        {/* RIGHT */}
        <div className="flex-1">

          <h3 className="text-xl font-semibold text-green-700 mb-4">

            Appointments For {formattedDate}

          </h3>

          {filteredAppointments.length === 0 ? (

            <p className="text-gray-500">

              No appointments for this day.

            </p>

          ) : (

            <div className="space-y-4">

              {filteredAppointments.map((appointment) => (

                <div
                  key={appointment.id}
                  className="border rounded-xl p-4 bg-gray-50"
                >

                  <h4 className="font-bold text-lg">

                    {appointment.patientName}

                  </h4>

                  <p className="mt-2">

                    <span className="font-semibold">

                      Time:

                    </span>{" "}

                    {appointment.time}

                  </p>

                  <p className="mt-2">

                    <span className="font-semibold">

                      Symptoms:

                    </span>{" "}

                    {appointment.symptoms}

                  </p>

                  <p className="mt-2">

                    <span className="font-semibold">

                      Status:

                    </span>{" "}

                    <span className="text-green-700 font-semibold">

                      {appointment.status}

                    </span>

                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default AppointmentCalendar;