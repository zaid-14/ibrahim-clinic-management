import { useState } from "react";

import jsPDF from "jspdf";

function PrescriptionGenerator() {

  const [patientName, setPatientName] = useState("");

  const [medicine, setMedicine] = useState("");

  const [dosage, setDosage] = useState("");

  const [advice, setAdvice] = useState("");

  const generatePDF = () => {

    const doc = new jsPDF();

    // HEADER
    doc.setFontSize(22);

    doc.setTextColor(0, 128, 0);

    doc.text("IBRAHIM CLINIC", 20, 20);

    doc.setFontSize(12);

    doc.setTextColor(100);

    doc.text(
      "Dr. AFTAB A. KHAN (B.U.M.S.)",
      20,
      30
    );

    doc.text(
      "Nallasopara East",
      20,
      37
    );

    // LINE
    doc.line(20, 42, 190, 42);

    // PATIENT INFO
    doc.setFontSize(14);

    doc.setTextColor(0);

    doc.text(
      `Patient Name: ${patientName}`,
      20,
      55
    );

    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      140,
      55
    );

    // RX
    doc.setFontSize(20);

    doc.setTextColor(0, 128, 0);

    doc.text("Rx", 20, 75);

    // MEDICINE
    doc.setFontSize(14);

    doc.setTextColor(0);

    doc.text(
      `Medicine: ${medicine}`,
      30,
      95
    );

    doc.text(
      `Dosage: ${dosage}`,
      30,
      110
    );

    // ADVICE
    doc.text(
      `Advice: ${advice}`,
      30,
      130
    );

    // SIGNATURE
    doc.text(
      "Doctor Signature",
      140,
      200
    );

    // SAVE PDF
    doc.save(
      `${patientName}-Prescription.pdf`
    );

  };

  return (

    <div className="bg-white mt-8 p-6 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold text-gray-800">

        Prescription Generator

      </h2>

      <div className="mt-6 space-y-4">

        {/* PATIENT NAME */}
        <input
          type="text"
          placeholder="Patient Name"
          className="w-full border p-3 rounded-lg"
          value={patientName}
          onChange={(e) =>
            setPatientName(e.target.value)
          }
        />

        {/* MEDICINE */}
        <input
          type="text"
          placeholder="Medicine Name"
          className="w-full border p-3 rounded-lg"
          value={medicine}
          onChange={(e) =>
            setMedicine(e.target.value)
          }
        />

        {/* DOSAGE */}
        <input
          type="text"
          placeholder="Dosage Instructions"
          className="w-full border p-3 rounded-lg"
          value={dosage}
          onChange={(e) =>
            setDosage(e.target.value)
          }
        />

        {/* ADVICE */}
        <textarea
          rows="4"
          placeholder="Doctor Advice"
          className="w-full border p-3 rounded-lg"
          value={advice}
          onChange={(e) =>
            setAdvice(e.target.value)
          }
        />

        {/* BUTTON */}
        <button
          onClick={generatePDF}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
        >

          Download Prescription PDF

        </button>

      </div>

    </div>

  );

}

export default PrescriptionGenerator;