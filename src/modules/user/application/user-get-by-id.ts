import { TYPES } from '@container';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { User } from '@user/domain/roots/user';
import { inject, injectable } from 'inversify';

@injectable()
export class UserGetById {
  constructor(@inject(TYPES.UserRepository) private readonly repository: UserRepository) {}

  async execute(userId: number): Promise<User> {
    return await this.repository.getById(userId);
  }
}
