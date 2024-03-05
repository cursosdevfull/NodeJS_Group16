import { UserRepository } from "@user/domain/repositories/user.repository";
import { User } from "@user/domain/roots/user";

export class UserGetById {
  constructor(private readonly repository: UserRepository) {}

  async execute(userId: number): Promise<User> {
    return await this.repository.getById(userId);
  }
}
