type Numerico = number;
const age: Numerico = 30;

type TypeId = number | string;
const userId: TypeId = "50f6b41c-2c69-446e-9a09-91bbb1582b31";
const medicId: TypeId = 28383838;

type CountryISO = "PE" | "CO" | "CL" | "MX";
const patientCountry: CountryISO = "PE";

class User {
  firstname: string;
  lastname: string;
}

class Printer {
  area: string;
  brand: string;
  model: string;
  year: number;
}

type ElementClass = User | Printer;
const obj: ElementClass = new User();
const printer: ElementClass = new Printer();
