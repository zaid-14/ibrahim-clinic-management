import { useState } from "react";

import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { db } from "../../firebase/config";

import { useAuth } from "../../context/AuthContext";

import { generateSlots } from "../../utils/generateSlots";

function BookAppointment() {

  const { currentUser, userData } =
    useAuth();

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [symptoms, setSymptoms] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // GENERATED CLINIC SLOTS
  const slots = generateSlots();

  // HANDLE BOOKING
  const handleBooking = async (e) => {

    e.preventDefault();

    // BLOCK SUNDAYS
    const selectedDay =
      new Date(date).getDay();

    if (selectedDay === 0) {

      alert(
        "Clinic is closed on Sundays"
      );

      return;

    }

    try {

      setLoading(true);

      // CHECK DUPLICATE SLOT
      const appointmentQuery =
        query(
          collection(
            db,
            "appointments"
          ),
          where("date", "==", date),
          where("time", "==", time)
        );

      const snapshot =
        await getDocs(
          appointmentQuery
        );

      if (!snapshot.empty) {

        alert(
          "This slot is already booked"
        );

        setLoading(false);

        return;

      }

      // SAVE APPOINTMENT
      await addDoc(
        collection(
          db,
          "appointments"
        ),
        {

          patientId:
            currentUser.uid,

          patientName:
            userData?.name,

          patientEmail:
            userData?.email,

          date,

          time,

          symptoms,

          status: "pending",

          createdAt:
            serverTimestamp()

        }
      );

      // CREATE NOTIFICATION
      await addDoc(
        collection(
          db,
          "notifications"
        ),
        {

          title:
            "New Appointment",

          message:
            `${userData?.name} booked appointment for ${date} at ${time}`,

          createdAt:
            serverTimestamp()

        }
      );

      // RESET
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
              setDate(
                e.target.value
              )
            }

            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }

            required
          />

        </div>

        {/* TIME SLOT */}
        <div>

          <label className="block mb-2 font-medium">

            Appointment Time

          </label>

          <select
            className="w-full border p-3 rounded-lg"
            value={time}
            onChange={(e) =>
              setTime(
                e.target.value
              )
            }
            required
          >

            <option value="">
              Select Time Slot
            </option>

            {slots.map(
              (
                slot,
                index
              ) => (

                <option
                  key={index}
                  value={slot}
                >

                  {slot}

                </option>

              )
            )}

          </select>

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
              setSymptoms(
                e.target.value
              )
            }
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="
            bg-green-700 hover:bg-green-800
            text-white px-6 py-3
            rounded-lg
          "
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