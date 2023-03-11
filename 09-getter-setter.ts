class UserInformationPersonal {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class UserSalary {
  private _salary: number;
  private _information: UserInformationPersonal;

  constructor(information: UserInformationPersonal, salary: number) {
    this._information = information;
    this._salary = salary;
  }

  get salary() {
    return this._salary;
  }

  set salary(salary: number) {
    if (salary < 500) {
      throw new Error("Salary is too low");
    } else {
      this._salary = salary;
    }
  }
}

const information = new UserInformationPersonal("Carla", "Buen día");
const userSalary = new UserSalary(information, 1000);

console.log(userSalary.salary);
userSalary.salary = 400;
console.log(userSalary.salary);
