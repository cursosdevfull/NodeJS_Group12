class MedicBuilder {
  name: string = "";
  lastname: string = "";
  cmp: string = "";
  email: string = "";
  specialty: string = "";
  subSpecialty: string = "";

  addName(name: string): MedicBuilder {
    this.name = name;
    return this;
  }

  addLastname(lastname: string): MedicBuilder {
    this.lastname = lastname;
    return this;
  }

  addCmp(cmp: string): MedicBuilder {
    this.cmp = cmp;
    return this;
  }

  addEmail(email: string): MedicBuilder {
    this.email = email;
    return this;
  }

  addSpecialty(specialty: string): MedicBuilder {
    this.specialty = specialty;
    return this;
  }

  addSubSpecialty(subSpecialty: string): MedicBuilder {
    this.subSpecialty = subSpecialty;
    return this;
  }

  create(): Medic {
    return new Medic(this);
  }
}

interface IMedic {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  specialty: string;
  subSpecialty: string;
}

class Medic {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  specialty: string;
  subSpecialty: string;

  constructor(properties: IMedic) {
    this.name = properties.name;
    this.lastname = properties.lastname;
    this.cmp = properties.cmp;
    this.email = properties.email;
    this.specialty = properties.specialty;
    this.subSpecialty = properties.subSpecialty;
  }
}

/* const properties: IMedic = {
    name: "Juan",
    lastname: "Pérez",
    cmp: "abc-123",
    email: "juan.perez@correo.com",
    specialty: "Cardiólogo",
    subSpecialty: "Cardiólogo infantil"
  } */

const properties = new MedicBuilder();
const medi = properties
  .addName("Juan")
  .addLastname("Pérez")
  .addCmp("abc-123")
  .addEmail("juan.perez@correo.com")
  .addSpecialty("Cardiólogo")
  .addSubSpecialty("Cardiólogo infantil")
  .create();

//const medic = new Medic(properties)
