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

  constructor(firstName: string, lastName: string, salary: number) {
    this.information = new UserInformationPersonal(firstName, lastName);
    this.salary = salary;
  }
}

const userSalary = new UserSalary("Juana", "Arco", 1000);
console.log(userSalary);
