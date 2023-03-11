class User {
  private readonly userId: string;
  private email: string;
  private name: string;
  private age: number;

  constructor(email: string, name: string, age: number) {
    this.userId = Math.random().toString();
    this.email = email;
    this.name = name;
    this.age = age;
  }

  update(email: string, name: string, age: number) {
    this.email = "sergio@correo.com";
    this.name = "Sergio";
    this.age = 40;
  }

  /* setEmail(email: string) {
      this.email = email
    } */
}

const user = new User("email@email.com", "Sergio", 40);
/* user.userId = "abcd"
  user.email = "email@email.com"
  user.name = "Juan"
  user.age = 20
   */
// user.setEmail("sergio@correo.com")
// Procesamiento de user

//user.email = "Juan@email.com"

user.update("Julio@email.com", "Julio", 35);
console.log(user);
