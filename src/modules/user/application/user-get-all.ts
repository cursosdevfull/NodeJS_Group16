import { IError } from "@core/interfaces/ierror.interface";
import { UserRepository } from "@user/domain/repositories/user.repository";
import { User } from "@user/domain/roots/user";
import { inject, injectable } from "inversify";
import { err, ok, Result } from "neverthrow";

export type TResultGetAll = Result<User[], IError>;

@injectable()
export class UserGetAll {
  constructor(
    @inject("UserRepository") private readonly repository: UserRepository
  ) {}

  async execute(): Promise<TResultGetAll> {
    const getAllResult = await this.repository.getAll();
    if (getAllResult.isErr()) {
      return err(getAllResult.error);
    }

    return ok(getAllResult.value);
  }
}
