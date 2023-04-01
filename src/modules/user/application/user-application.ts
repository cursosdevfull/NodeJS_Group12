import { UserRepository } from "../domain/repositories/user-repository";
import { User } from "../domain/user";

export class UserApplication {
  constructor(private readonly userRepository: UserRepository) {}

  async save(user: User): Promise<void> {
    return await this.userRepository.save(user);
  }

  async find(id: string): Promise<User | null> {
    return await this.userRepository.find(id);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
