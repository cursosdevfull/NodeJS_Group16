interface PatientProperties {
  patientId: string;
  firstname?: string;
  lastname?: string;
  age?: number;
  gender: string;
  email?: string;
}

class Patient {
  patientId: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;

  constructor(props: Partial<PatientProperties>) {
    Object.assign(this, props);
  }
}

const props: Partial<PatientProperties> = {
  patientId: "b35de02c-ae4a-458b-af97-18a3cb33db90",
  gender: "female",
};

const patient = new Patient(props);
console.log(patient);
