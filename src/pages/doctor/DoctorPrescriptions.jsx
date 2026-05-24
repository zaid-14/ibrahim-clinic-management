import PrescriptionGenerator from "../../components/prescriptions/PrescriptionGenerator";

function DoctorPrescriptions() {

  return (

    <div>

      <h1 className="text-4xl font-bold text-gray-800">

        Doctor Prescriptions

      </h1>

      <p className="text-gray-500 mt-2">

        Generate professional clinic prescriptions

      </p>

      <PrescriptionGenerator />

    </div>

  );

}

export default DoctorPrescriptions;