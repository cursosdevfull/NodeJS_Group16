import { UserRepository } from "@user/domain/repositories/user.repository";
import { User } from "@user/domain/roots/user";

export class UserGetByPage {
  constructor(private readonly repository: UserRepository) {}

  async execute(page: number, pageSize: number): Promise<User[]> {
    return await this.repository.getByPage(page, pageSize);
  }
}
