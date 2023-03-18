//type Gender = "M" | "F"
enum Gender {
  M = "Male",
  F = "Female",
}

interface PatientEssentials {
  name?: string;
  lastname: string;
  email: string;
}

interface PatientOptionals {
  id: string;
  gender: Gender;
  age: number;
}

interface PatientUpdate {
  name: string;
  lastname: string;
  gender: Gender;
  email: string;
}

type PatientProperties = Required<PatientEssentials> &
  Partial<PatientOptionals>;
type TPatientUpdate = Omit<PatientProperties, "id email">;

const essentials: Required<PatientEssentials> = {
  name: "Sergio",
  lastname: "Hidalgo",
  email: "sergio@correo.com",
};

const optionals: Partial<PatientOptionals> = {
  gender: Gender.M,
};

const update: Partial<TPatientUpdate> = { name: "Sergio Iván" };
