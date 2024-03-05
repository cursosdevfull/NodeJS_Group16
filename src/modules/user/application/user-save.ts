import { UserRepository } from "@user/domain/repositories/user.repository";
import { User } from "@user/domain/roots/user";

export class UserSave {
  constructor(private readonly repository: UserRepository) {}

  async execute(user: User): Promise<void> {
    return await this.repository.save(user);
  }
}
