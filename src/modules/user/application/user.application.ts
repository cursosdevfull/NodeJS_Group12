import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";

export class UserApplication {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: User) {
    await this.userRepository.save(user);
  }

  async update(user: User) {
    await this.userRepository.save(user);
  }

  async delete(user: User) {
    await this.userRepository.save(user);
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
