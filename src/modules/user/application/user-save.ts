import { UserRepository } from "@user/domain/repositories/user.repository";
import { User } from "@user/domain/roots/user";

import { UserService } from "./user.service";

export class UserSave {
  constructor(private readonly repository: UserRepository) {}

  async execute(user: User): Promise<void> {
    const { password } = user.properties;
    const encryptedPassword = await UserService.encryptPassword(password);

    user.update({ password: encryptedPassword });

    return await this.repository.save(user);
  }
}
