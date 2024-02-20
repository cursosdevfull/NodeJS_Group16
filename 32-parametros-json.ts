interface MedicEssentials {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  age: number;
  specialty: string;
  subSpecialty: string;
}

interface MedicOptionals {
  createdAt: Date;
}

type MedicProperties = MedicEssentials & Partial<MedicOptionals>;

class Medic {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  age: number;
  specialty: string;
  subSpecialty: string;
  createdAt: Date;

  //constructor(name: string, lastname: string, cmp: string, email: string, age: number, speciality: string, subSpecialty: string){
  constructor(props: MedicProperties) {
    this.name = props.name;
    this.lastname = props.lastname;
    this.cmp = props.cmp;
    this.email = props.email;
    this.age = props.age;
    this.specialty = props.specialty;
    this.subSpecialty = props.subSpecialty;
    if (props.createdAt) {
      this.createdAt = props.createdAt;
    } else {
      this.createdAt = new Date();
    }
  }
}

const props: MedicProperties = {
  name: "Jana",
  lastname: "Merino",
  cmp: "abc123",
  email: "jana.merino@email.com",
  age: 30,
  specialty: "Traumatología",
  subSpecialty: "Traumatología Pediatrica",
  createdAt: new Date(),
};

const medic = new Medic(props);
console.log(medic);
