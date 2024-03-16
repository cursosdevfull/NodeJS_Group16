import { IError } from "@core/interfaces/ierror.interface";
import { UserRepository } from "@user/domain/repositories/user.repository";
import { User } from "@user/domain/roots/user";
import { inject, injectable } from "inversify";
import { err, ok, Result } from "neverthrow";

export type TResultGetById = Result<User, IError>;

@injectable()
export class UserGetById {
  constructor(
    @inject("UserRepository") private readonly repository: UserRepository
  ) {}

  async execute(userId: number): Promise<TResultGetById> {
    const getByIdResult = await this.repository.getById(userId);
    if (getByIdResult.isErr()) {
      return err(getByIdResult.error);
    }

    return ok(getByIdResult.value);
  }
}
