// Domain

class Patient {
  firstName: string = "";
  lastName: string = "";
  age: number = 0;
}

interface PatientRepository {
  create(patient: Patient): Patient;
}

// Application

class PatientApplication {
  infra: PatientRepository;

  constructor(infra: PatientRepository) {
    this.infra = infra;
  }

  add(patient: Patient) {
    return this.infra.create(patient);
  }
}

// Infrastructure

class PatientInfrastructure implements PatientRepository {
  create(patient: Patient) {
    this.validate();
    this.sentMessage("Bienvenido");
    this.sentInformationAPI(patient.firstName);
    return patient;
  }

  validate() {
    return true;
  }

  sentMessage(message: string) {
    return message;
  }

  sentInformationAPI(name: string) {}
}

const firstName = "Sergio";
const lastName = "Hidalgo";
const age = 40;

const patient = new Patient();
patient.firstName = firstName;
patient.lastName = lastName;
patient.age = age;

const infra: PatientRepository = new PatientInfrastructure();
const application = new PatientApplication(infra);
const patientCreated = application.add(patient);

console.log(patientCreated);
