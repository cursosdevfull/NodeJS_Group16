import { IError } from "@core/interfaces/ierror.interface";
import { UserRepository } from "@user/domain/repositories/user.repository";
import { User } from "@user/domain/roots/user";
import { inject, injectable } from "inversify";
import { err, Result } from "neverthrow";

export type TResultSaveUser = Result<void, IError>;

@injectable()
export class UserSave {
  constructor(
    @inject("UserRepository") private readonly repository: UserRepository
  ) {}

  async execute(user: User): Promise<TResultSaveUser> {
    const saveResult = await this.repository.save(user);
    if (saveResult.isErr()) {
      return err(saveResult.error);
    }

    return;
  }
}
