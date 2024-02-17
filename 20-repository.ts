class User {
  private readonly id: string;

  constructor(private fullname: string, private email: string) {
    this.id = new Date().getTime().toString();
  }

  properties() {
    return {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
    };
  }
}

interface UserRepository {
  findUserByEmail(email: string): boolean;
  insert(user: User): void;
}

class UserCreate {
  private user!: User;
  private usersInMemory: Array<User> = [];

  constructor(private userMemory: UserRepository) {
    this.userMemory = userMemory;
  }

  execute(user: User) {
    this.user = user;

    //const userMemory:UserRepository = new UserMemory()

    const userFound = this.userMemory.findUserByEmail(user.properties().email);

    if (userFound === false) {
      this.userMemory.insert(user);
    }
  }
}

class UserMemory implements UserRepository {
  private usersInMemory: Array<User> = [];

  findUserByEmail(email: string) {
    const userFound = this.findUser(email);
    return userFound ? true : false;
  }

  findUser(email: string) {
    return this.usersInMemory.find(
      (item: User) => item.properties().email === email
    );
  }

  insert(user: User) {
    this.usersInMemory.push(user);
    console.log(this.usersInMemory);
  }
}

const user1 = new User("Cristina Valdez", "cvaldez@email.com");
const user2 = new User("Alfonso Valdez", "avaldez@email.com");
const userMemory = new UserMemory();
const userCreate = new UserCreate(userMemory);
userCreate.execute(user1);
userCreate.execute(user2);
