import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "firebase/firestore";

import {
  db
} from "../../firebase/config";

function FollowUpManagement() {

  const [patientName, setPatientName] = useState("");

  const [followUpDate, setFollowUpDate] = useState("");

  const [advice, setAdvice] = useState("");

  const [followUps, setFollowUps] = useState([]);

  const [loading, setLoading] = useState(false);

  // Fetch Follow-Ups
  const fetchFollowUps = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "followUps")
        );

      const followUpData =
        querySnapshot.docs.map((doc) => ({

          id: doc.id,

          ...doc.data()

        }));

      setFollowUps(followUpData);

    } catch (error) {

      alert(error.message);

    }

  };

  useEffect(() => {

    fetchFollowUps();

  }, []);

  // Add Follow-Up
  const handleAddFollowUp = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await addDoc(
        collection(db, "followUps"),
        {

          patientName,

          followUpDate,

          advice,

          createdAt: serverTimestamp()

        }
      );

      alert("Follow-Up Added");

      setPatientName("");

      setFollowUpDate("");

      setAdvice("");

      fetchFollowUps();

    } catch (error) {

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-white mt-8 p-6 rounded-2xl shadow-md">

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-gray-800">

        Follow-Up Management

      </h2>

      {/* FORM */}
      <form
        onSubmit={handleAddFollowUp}
        className="mt-6 space-y-4"
      >

        {/* PATIENT NAME */}
        <input
          type="text"
          placeholder="Patient Name"
          className="w-full border p-3 rounded-lg"
          value={patientName}
          onChange={(e) =>
            setPatientName(e.target.value)
          }
          required
        />

        {/* FOLLOW-UP DATE */}
        <input
          type="date"
          className="w-full border p-3 rounded-lg"
          value={followUpDate}
          onChange={(e) =>
            setFollowUpDate(e.target.value)
          }
          required
        />

        {/* ADVICE */}
        <textarea
          rows="4"
          placeholder="Follow-Up Advice"
          className="w-full border p-3 rounded-lg"
          value={advice}
          onChange={(e) =>
            setAdvice(e.target.value)
          }
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
        >

          {loading
            ? "Saving..."
            : "Add Follow-Up"}

        </button>

      </form>

      {/* FOLLOW-UP LIST */}
      <div className="mt-10">

        <h3 className="text-xl font-bold text-gray-700 mb-4">

          Upcoming Follow-Ups

        </h3>

        <div className="space-y-4">

          {followUps.length === 0 ? (

            <p className="text-gray-500">

              No follow-ups added yet.

            </p>

          ) : (

            followUps.map((followUp) => (

              <div
                key={followUp.id}
                className="border p-5 rounded-xl bg-gray-50"
              >

                <h4 className="text-lg font-bold text-green-700">

                  {followUp.patientName}

                </h4>

                <p className="mt-2">

                  <span className="font-semibold">

                    Follow-Up Date:

                  </span>{" "}

                  {followUp.followUpDate}

                </p>

                <p className="mt-2 text-gray-600">

                  {followUp.advice}

                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

}

export default FollowUpManagement;