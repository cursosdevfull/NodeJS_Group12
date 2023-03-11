interface UserProperties {
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: boolean;
  email: string;
  tall: number;
}

class User {
  private readonly userId: string;
  private firstName: string;
  private lastName: string;
  private age: number;
  private gender: boolean;
  private readonly email: string;
  private tall: number;

  constructor(properties: UserProperties) {
    Object.assign(this, properties);
    /* this.userId = properties.userId
      this.firstName = properties.firstName
      this.lastName = properties.lastName
      this.age = properties.age
      this.gender = properties.gender
      this.email = properties.email
      this.tall = properties.tall */
  }
}

const properties: UserProperties = {
  userId: "42a7d1e4-a7bc-411b-ad47-316698682654",
  firstName: "Alondra",
  lastName: "Zavala",
  age: 25,
  gender: false,
  email: "alondra@email.com",
  tall: 180,
};

const user = new User(properties);
console.log(user);
