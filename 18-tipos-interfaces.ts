interface PatientRequired {
  patientId: string;
  gender: string;
}

interface PatientOptional {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
}

type PatientProperties = PatientRequired & Partial<PatientOptional>;

class Patient {
  patientId: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;

  constructor(props: PatientProperties) {
    Object.assign(this, props);
  }
}

const props: PatientProperties = {
  patientId: "b35de02c-ae4a-458b-af97-18a3cb33db90",
  gender: "female",
  firstname: "Jorge",
};

const patient = new Patient(props);
console.log(patient);
