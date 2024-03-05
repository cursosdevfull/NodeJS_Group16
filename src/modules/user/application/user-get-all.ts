import { UserRepository } from "@user/domain/repositories/user.repository";
import { User } from "@user/domain/roots/user";

export class UserGetAll {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.repository.getAll();
  }
}
