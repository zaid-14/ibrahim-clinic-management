import { useState } from "react";

import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";

import {
  db
} from "../../firebase/config";

import {
  useAuth
} from "../../context/AuthContext";

function BookAppointment() {

  const { currentUser, userData } = useAuth();

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [symptoms, setSymptoms] = useState("");

  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // Save Appointment
await addDoc(collection(db, "appointments"), {

  patientId: currentUser.uid,

  patientName: userData?.name,

  patientEmail: userData?.email,

  date,

  time,

  symptoms,

  status: "pending",

  createdAt: serverTimestamp()

});

// Create Notification
await addDoc(collection(db, "notifications"), {

  title: "New Appointment",

  message:
    `${userData?.name} booked appointment for ${date} at ${time}`,

  createdAt: serverTimestamp()

});

      alert("Appointment Booked Successfully");

      setDate("");

      setTime("");

      setSymptoms("");

    } catch (error) {

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold text-gray-800">

        Book Appointment

      </h2>

      <form
        onSubmit={handleBooking}
        className="mt-6 space-y-4"
      >

        {/* DATE */}
        <div>

          <label className="block mb-2 font-medium">

            Appointment Date

          </label>

          <input
            type="date"
            className="w-full border p-3 rounded-lg"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            required
          />

        </div>

        {/* TIME */}
        <div>

          <label className="block mb-2 font-medium">

            Appointment Time

          </label>

          <input
            type="time"
            className="w-full border p-3 rounded-lg"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
            required
          />

        </div>

        {/* SYMPTOMS */}
        <div>

          <label className="block mb-2 font-medium">

            Symptoms / Notes

          </label>

          <textarea
            rows="4"
            className="w-full border p-3 rounded-lg"
            placeholder="Enter symptoms..."
            value={symptoms}
            onChange={(e) =>
              setSymptoms(e.target.value)
            }
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
        >

          {loading
            ? "Booking..."
            : "Book Appointment"}

        </button>

      </form>

    </div>

  );

}

export default BookAppointment;