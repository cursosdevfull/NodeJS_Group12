import { Crypt } from "../../../helpers/Crypt";
import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/repositories/auth.repository";

export class AuthApplication {
  constructor(private readonly repository: AuthRepository) {}

  async login(auth: Auth) {
    const userResult = await this.repository.getByEmail(
      auth.properties().email
    );

    if (userResult.isErr()) return userResult;

    const user = userResult.value;
    const isMatch = await Crypt.compare(
      auth.properties().password,
      user.properties().password
    );

    if (isMatch) {
      return true;
    }

    return false;
  }
}
