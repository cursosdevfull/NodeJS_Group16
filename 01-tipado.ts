//let username:string = "arios"
let username = "crios";
//username = 10
username = "lcardenas";

let agePatient: number;
let isLogged: boolean;

//let listNames: string[] = ["luis", "carmen", "luz"]
let listNames: Array<string> = ["luis", "carmen", "luz"];
listNames.push("luisa");
//listNames.push(20)

let listStudents: Array<{
  name: string;
  age: number;
  addresses: Array<string>;
}> = [];
listStudents.push({
  name: "Carlos",
  age: 20,
  addresses: ["av. del sol 123", "jirón del puerto 343"],
});

let dataUsersToExport: Array<Array<{ name: string; age: number }>> = [
  [
    { name: "javier", age: 40 },
    { name: "carla", age: 23 },
  ],
  [{ name: "josé", age: 34 }],
];
