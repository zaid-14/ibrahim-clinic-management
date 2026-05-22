import { useState } from "react";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import {
  auth,
  db
} from "../../firebase/config";

import {
  useNavigate,
  Link
} from "react-router-dom";

function Register() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      // Create Auth User
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      // Save User Data In Firestore
      await setDoc(doc(db, "users", user.uid), {

        uid: user.uid,

        name: name,

        email: email,

        role: "patient",

        createdAt: serverTimestamp()

      });

      alert("Registration Successful");

      navigate("/patient");

    } catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-green-50">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-green-700">

          Patient Register

        </h1>

        <form
          onSubmit={handleRegister}
          className="mt-6 space-y-4"
        >

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white p-3 rounded-lg"
          >

            Register

          </button>

        </form>

        <p className="mt-4 text-center">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-green-700 font-semibold"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;