import { UserApplication } from "../application/user-application";
import { UserRepository } from "../domain/repositories/user-repository";
import { UserFactory } from "../domain/user-factory";
import { UserInfrastructure } from "../infrastructure/user-infrastructure";

(async () => {
  const infra: UserRepository = new UserInfrastructure();
  const app = new UserApplication(infra);

  const user = UserFactory.create(
    "670c8582-485d-48ee-a5b2-ef8b335438d5",
    "Juan",
    "Pérez",
    "juan@company.org",
    "FiestaT00do#",
    ["admin"]
  );

  await app.save(user);

  const users = await app.findAll();

  console.log(users);
})();
