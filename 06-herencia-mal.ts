class UserInformationPersonal {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class UserSalary extends UserInformationPersonal {
  salary: number;

  constructor(firstName: string, lastName: string, salary: number) {
    super(firstName, lastName);
    this.salary = salary;
  }
}
