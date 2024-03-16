import { IError } from "@core/interfaces/ierror.interface";
import { UserRepository } from "@user/domain/repositories/user.repository";
import { User } from "@user/domain/roots/user";
import { inject, injectable } from "inversify";
import { err, ok, Result } from "neverthrow";

export type TResultGetByPage = Result<User[], IError>;

@injectable()
export class UserGetByPage {
  constructor(
    @inject("UserRepository") private readonly repository: UserRepository
  ) {}

  async execute(page: number, pageSize: number): Promise<TResultGetByPage> {
    const getByPageResult = await this.repository.getByPage(page, pageSize);
    if (getByPageResult.isErr()) {
      return err(getByPageResult.error);
    }

    return ok(getByPageResult.value);
  }
}
