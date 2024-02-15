class Animal {
  breed: string;
  color: string;

  constructor(breed: string, color: string) {
    this.breed = breed;
    this.color = color;
  }

  description() {
    return `breed: ${this.breed}, color: ${this.color}`;
  }
}

class Mamal extends Animal {
  origins: Array<string>;

  constructor(origins: Array<string>, breed: string, color: string) {
    super(breed, color);
    this.origins = origins;
  }
}

const animal = new Animal("Feline", "brown");
console.log(animal);
//const mamal = new Mamal("Feline", "yellow")
//const mamal = new Mamal(["Antartida", "Patagonia"])
const mamal = new Mamal(["Antartida", "Patagonia"], "Girafa", "orange");
console.log(mamal);
