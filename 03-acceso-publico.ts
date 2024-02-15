class Animal {
  /*public raza: string = "Siberian Husky"
    public color: string = "negro"
    public esMamifero: boolean = true*/

  /*public raza = "Siberian Husky"
    public color = "negro"
    public esMamifero = true*/

  raza: string;
  color: string;
  esMamifero: boolean;

  constructor() {
    this.raza = "Siberian Husky";
    this.color = "negro";
    this.esMamifero = true;
  }

  descripcion() {
    return {
      raza: this.raza,
      color: this.color,
      esMamifero: this.esMamifero,
    };
  }
}

const animal = new Animal();
console.log("raza", animal.raza);
console.log("color", animal.color);
console.log("esMamifero", animal.esMamifero);
console.log("Descripción", animal.descripcion());
