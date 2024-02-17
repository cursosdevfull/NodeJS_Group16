const users: Array<string> = ["Luis", "Carla"];
const statusTask: Array<boolean> = [true, false, false, true];
const person: Array<{ name: string; age: number }> = [
  { name: "José", age: 20 },
  { name: "Rosa", age: 22 },
];

person.push({ name: "Perla", age: 25 });

const clients: Array<string | { name: string; id: number }> = [
  "Javier",
  { name: "Carmela", id: 30 },
];
