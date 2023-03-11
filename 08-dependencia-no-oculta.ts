class UserInformationPersonal {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class UserSalary {
  salary: number;
  information: UserInformationPersonal;

  constructor(information: UserInformationPersonal, salary: number) {
    this.information = information;
    this.salary = salary;
  }
}

const information = new UserInformationPersonal("Carla", "Buen día");
const userSalary = new UserSalary(information, 1000);
console.log(userSalary);
