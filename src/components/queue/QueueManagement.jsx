import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

import {
  db
} from "../../firebase/config";

function QueueManagement() {

  const [queue, setQueue] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch Queue
  const fetchQueue = async () => {

    try {

      const q = query(
        collection(db, "queueTokens"),
        orderBy("tokenNumber", "asc")
      );

      const querySnapshot = await getDocs(q);

      const queueData =
        querySnapshot.docs.map((doc) => ({

          id: doc.id,

          ...doc.data()

        }));

      setQueue(queueData);

    } catch (error) {

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchQueue();

  }, []);

  // Generate New Token
  const generateToken = async () => {

    try {

      const nextToken =
        queue.length > 0
          ? queue[queue.length - 1].tokenNumber + 1
          : 1;

      await addDoc(collection(db, "queueTokens"), {

        tokenNumber: nextToken,

        status: "waiting",

        createdAt: serverTimestamp()

      });

      alert(`Token ${nextToken} Generated`);

      fetchQueue();

    } catch (error) {

      alert(error.message);

    }

  };

  // Mark Current Serving
  const startServing = async (id) => {

    try {

      // Reset Existing Serving Tokens
      const waitingTokens =
        queue.filter(
          (token) =>
            token.status === "serving"
        );

      for (const token of waitingTokens) {

        const tokenRef =
          doc(db, "queueTokens", token.id);

        await updateDoc(tokenRef, {

          status: "completed"

        });

      }

      // Start New Serving
      const tokenRef =
        doc(db, "queueTokens", id);

      await updateDoc(tokenRef, {

        status: "serving"

      });

      fetchQueue();

    } catch (error) {

      alert(error.message);

    }

  };

  // Complete Token
  const completeToken = async (id) => {

    try {

      const tokenRef =
        doc(db, "queueTokens", id);

      await updateDoc(tokenRef, {

        status: "completed"

      });

      fetchQueue();

    } catch (error) {

      alert(error.message);

    }

  };

  if (loading) {

    return (
      <div className="text-center">
        Loading Queue...
      </div>
    );

  }

  const currentServing =
    queue.find(
      (token) => token.status === "serving"
    );

  return (

    <div className="bg-white mt-8 p-6 rounded-2xl shadow-md">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold text-gray-800">

          Queue Management

        </h2>

        <button
          onClick={generateToken}
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-lg"
        >

          Generate Token

        </button>

      </div>

      {/* CURRENT SERVING */}
      <div className="mt-8 bg-green-100 border border-green-300 p-6 rounded-2xl">

        <h3 className="text-xl font-semibold text-green-800">

          Now Serving

        </h3>

        <p className="text-5xl font-bold mt-4 text-green-700">

          {currentServing
            ? `Token ${currentServing.tokenNumber}`
            : "No Active Token"}

        </p>

      </div>

      {/* TOKEN LIST */}
      <div className="mt-8 overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3 text-left">

                Token

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

            {queue.map((token) => (

              <tr
                key={token.id}
                className="border-b"
              >

                <td className="p-3 font-semibold">

                  Token {token.tokenNumber}

                </td>

                <td className="p-3">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-white text-sm
                      ${
                        token.status === "waiting"
                          ? "bg-yellow-500"
                          : token.status === "serving"
                          ? "bg-green-600"
                          : "bg-gray-500"
                      }
                    `}
                  >

                    {token.status}

                  </span>

                </td>

                <td className="p-3 space-x-2">

                  <button
                    onClick={() =>
                      startServing(token.id)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >

                    Serve

                  </button>

                  <button
                    onClick={() =>
                      completeToken(token.id)
                    }
                    className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
                  >

                    Complete

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default QueueManagement;