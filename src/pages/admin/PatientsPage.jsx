import MedicalRecords from "../../components/patients/MedicalRecords";

import PatientSearch from "../../components/patients/PatientSearch";

function PatientsPage() {

  return (

    <div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">

        Patients

      </h1>

      <PatientSearch />

      <MedicalRecords />

    </div>

  );

}

export default PatientsPage;