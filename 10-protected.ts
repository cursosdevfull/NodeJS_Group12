class User {
  readonly userId: string = "42a7d1e4-a7bc-411b-ad47-316698682654";
  protected readonly password: string = "mN7_#NU9R87Hw26";
}

class Developer extends User {
  getPasswordLength() {
    return this.password.length;
  }
}

class DeveloperCloud extends Developer {
  constructor() {
    super();
    console.log(this.password);
  }
}

const developer = new Developer();
//console.log(developer.password)
console.log(developer.getPasswordLength());

const developerCloud = new DeveloperCloud();
//console.log(developerCloud.password)
