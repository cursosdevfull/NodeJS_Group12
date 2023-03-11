class User {
  /* firstName: string
    lastName: string
  
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName
      this.lastName = lastName
    } */

  constructor(public firstName: string, public lastName: string) {}
}

interface UserRepository {
  insert(user: User): User;
  getAll(): User[];
}

class UserInfrastructure implements UserRepository {
  insert(user: User): User {
    console.log(user);
    return user;
  }
  getAll(): User[] {
    return [new User("Juan", "Pérez")];
  }

  trace(user: User) {
    console.log(user);
  }
}

class UserApplication {
  constructor(private readonly userRepository: UserRepository) {}

  addUser(user: User) {
    this.userRepository.insert(user);
  }
}

const userInfrastructure: UserRepository = new UserInfrastructure();
const userApplication = new UserApplication(userInfrastructure);

const user = new User("Jorge", "Ávila");
userApplication.addUser(user);
