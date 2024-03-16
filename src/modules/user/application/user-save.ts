import { TYPES } from "@container";
import { UserRepository } from "@user/domain/repositories/user.repository";
import { User } from "@user/domain/roots/user";
import { inject, injectable } from "inversify";

@injectable()
export class UserSave {
  constructor(
    @inject(TYPES.UserRepository) private readonly repository: UserRepository
  ) {}

  async execute(user: User): Promise<void> {
    return await this.repository.save(user);
  }
}
