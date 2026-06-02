import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">

      {/* HERO */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <h1 className="text-5xl md:text-6xl font-bold">
            IBRAHIM CLINIC
          </h1>

          <p className="mt-4 text-2xl">
            Dr. Aftab A. Khan (B.U.M.S.)
          </p>

          <p className="mt-2 text-lg text-green-100">
            Family Physician & Surgeon
          </p>

          <p className="mt-8 text-xl max-w-2xl">
            Book appointments online, track appointment status,
            and receive digital prescriptions from Ibrahim Clinic.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/register"
              className="bg-white text-green-700 px-8 py-3 rounded-xl font-semibold"
            >
              Register
            </Link>

            <Link
              to="/login"
              className="border border-white px-8 py-3 rounded-xl font-semibold"
            >
              Login
            </Link>

          </div>

        </div>

      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold text-center text-gray-800">
          Our Services
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="font-bold text-lg">
              Online Booking
            </h3>
            <p className="mt-3 text-gray-600">
              Easily book appointments from anywhere.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="font-bold text-lg">
              Consultation
            </h3>
            <p className="mt-3 text-gray-600">
              Professional healthcare consultation.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="font-bold text-lg">
              Prescriptions
            </h3>
            <p className="mt-3 text-gray-600">
              Digital prescription generation.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="font-bold text-lg">
              Follow-Ups
            </h3>
            <p className="mt-3 text-gray-600">
              Track follow-up appointments.
            </p>
          </div>

        </div>

      </section>

      {/* CLINIC TIMINGS */}
      <section className="bg-white py-16">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-gray-800">
            Clinic Timings
          </h2>

          <div className="bg-green-50 rounded-2xl p-8 mt-10">

            <div className="flex justify-between py-3">
              <span>Morning</span>
              <span>10:00 AM - 2:00 PM</span>
            </div>

            <div className="flex justify-between py-3">
              <span>Evening</span>
              <span>6:00 PM - 11:00 PM</span>
            </div>

            <div className="flex justify-between py-3">
              <span>Sunday</span>
              <span className="text-red-500 font-semibold">
                Closed
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* CONTACT */}
      <section className="py-16">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-gray-800">
            Contact Us
          </h2>

          <p className="mt-8 text-lg">
            Shop No. 12, Sunshine Garden,
            Achole Road, Nallasopara East
          </p>

          <p className="mt-3 text-lg">
            Phone: 9022581631
          </p>

        </div>

      </section>

    </div>
  );
}

export default LandingPage;