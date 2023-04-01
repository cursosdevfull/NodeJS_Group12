export class User {
  private id: string;
  private name: string;
  private lastname: string;
  private email: string;
  private password: string;
  private roles: string[];

  constructor(
    id: string,
    name: string,
    lastname: string,
    email: string,
    password: string,
    roles: string[]
  ) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}

//const user = new User("1", "John", "Doe", "john.doe@email.com", "1345", []);
