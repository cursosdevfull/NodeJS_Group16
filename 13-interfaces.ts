interface UserProperties {
  userId: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;
  tall: number;
}

interface Actions {
  update: () => void;
  delete: () => void;
  reconstitute: () => void;
}

const props: UserProperties = {
  userId: "146b2dd4-a1d5-4744-bbc0-61f9bfff9a7d",
  firstname: "Joe",
  lastname: "Doe",
  age: 20,
  gender: "male",
  email: "joe@email.com",
  tall: 180,
};

class User implements Actions, UserProperties {
  userId: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;
  tall: number;

  /*constructor(userId: string, firstname: string,
        lastname: string,
        age: number,
        gender: string,
        email: string,
        tall: number) {
        this.userId = userId
        this.firstname = firstname
        this.lastname = lastname
        this.age = age
        this.gender = gender
        this.email = email
        this.tall = tall
    }*/

  constructor(props: UserProperties) {
    this.userId = props.userId;
    this.firstname = props.firstname;
    this.lastname = props.lastname;
    this.age = props.age;
    this.gender = props.gender;
    this.email = props.email;
    this.tall = props.tall;
  }

  update() {}

  delete() {}

  reconstitute() {}
}

const userProps: UserProperties = {
  userId: "0ec52532-5a7e-438d-ad7b-a709d4348349",
  firstname: "Sergio",
  lastname: "Hidalgo",
  age: 43,
  gender: "male",
  email: "sergio@email.com",
  tall: 177,
};

console.log(userProps.lastname);

//const user = new User("0ec52532-5a7e-438d-ad7b-a709d4348349", "Sergio", "Hidalgo", 43, "male", "sergio@email.com", 177)
const user = new User(userProps);

console.log(user);
