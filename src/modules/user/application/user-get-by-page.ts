import { TYPES } from "@container";
import { UserRepository } from "@user/domain/repositories/user.repository";
import { User } from "@user/domain/roots/user";
import { inject, injectable } from "inversify";

@injectable()
export class UserGetByPage {
  constructor(
    @inject(TYPES.UserRepository) private readonly repository: UserRepository
  ) {}

  async execute(page: number, pageSize: number): Promise<User[]> {
    return await this.repository.getByPage(page, pageSize);
  }
}
