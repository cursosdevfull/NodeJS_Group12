type MedicProperties = {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  specialty: string;
  subSpecialty: string;
};

class Medic {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  specialty: string;
  subSpecialty: string;

  /*   constructor(name: string, lastname: string, cmp: string, email: string, specialty: string, subSpecialty: string) {
   */
  constructor(properties: MedicProperties) {
    this.name = properties.name;
    this.lastname = properties.lastname;
    this.cmp = properties.cmp;
    this.email = properties.email;
    this.specialty = properties.specialty;
    this.subSpecialty = properties.subSpecialty;
  }
}

const properties: MedicProperties = {
  name: "Jorge",
  lastname: "Lozada",
  cmp: "abc-234",
  email: "jorge.lozada@correo.com",
  specialty: "Cardiólgo",
  subSpecialty: "Cardiólog geriátrico",
};

//const medic = new Medic("Jorge", "Lozada", "abc-234", "jorge.lozada@correo.com", "Cardiólogo", "Cardiólogo geriátrico")
const medic = new Medic(properties);
