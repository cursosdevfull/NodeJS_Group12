import { Crypt } from '../../../helpers/Crypt';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/user';
import { UserCreateResult } from '../infrastructure/user.infrastructure';

export class UserApplication {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: User): Promise<UserCreateResult> {
    const passwordHash = await Crypt.toHash(user.properties().password);
    const userHash = User.reconstitute({
      ...user.properties(),
      password: passwordHash,
    });
    return await this.userRepository.save(userHash);
  }

  async update(user: User): Promise<UserCreateResult> {
    return await this.userRepository.save(user);
  }

  async delete(user: User): Promise<UserCreateResult> {
    return await this.userRepository.save(user);
  }

  async get(id: string) {
    return await this.userRepository.get(id);
  }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async getByPage(page: number, pageSize: number) {
    return await this.userRepository.getByPage(page, pageSize);
  }
}
