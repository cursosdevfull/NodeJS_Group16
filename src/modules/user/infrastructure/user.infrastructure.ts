import { IError } from '@core/interfaces/ierror.interface';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { User } from '@user/domain/roots/user';
import { injectable } from 'inversify';
import { err, ok, Result } from 'neverthrow';
import { DatabaseBootstrap } from 'src/bootstrap/database.bootstrap';
import { IsNull } from 'typeorm';

import { UserDto } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';

export type TResultSave = Result<User, IError>;
export type TResultGetAll = Result<User[], IError>;
export type TResultGetById = Result<User, IError>;
export type TResultGetByPage = Result<User[], IError>;
export type TResultGetByEmail = Result<User, IError>;
export type TResultGetByRefreshToken = Result<User, IError>;

@injectable()
export class UserInfrastructure implements UserRepository {
  async save(user: User): Promise<TResultSave> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);
      const userEntity = UserDto.fromDomainToData(user) as UserEntity;
      await repository.save(userEntity);
      return ok(user);
    } catch (error) {
      const objError: IError = new Error("Error saving user");
      objError.stack = JSON.stringify(error);
      objError.status = 500;

      return err(objError);
    }
  }

  async getAll(): Promise<TResultGetAll> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);
      const usersEntity = await repository.find({
        where: { deletedAt: IsNull() },
        relations: ["roles"],
      });

      return ok(UserDto.fromDataToDomain(usersEntity) as User[]);
    } catch (error) {
      const objError: IError = new Error("Error saving user");
      objError.stack = JSON.stringify(error);
      objError.status = 500;

      return err(objError);
    }
  }

  async getById(userId: number): Promise<TResultGetById> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);
      const userEntity = await repository.findOne({
        where: { userId, deletedAt: IsNull() },
        relations: ["roles"],
      });
      return ok(UserDto.fromDataToDomain(userEntity) as User);
    } catch (error) {
      const objError: IError = new Error("Error saving user");
      objError.stack = JSON.stringify(error);
      objError.status = 500;

      return err(objError);
    }
  }

  async getByPage(page: number, pageSize: number): Promise<TResultGetByPage> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);
      const [userEntities, total] = await repository.findAndCount({
        where: { deletedAt: IsNull() },
        take: pageSize,
        skip: (page - 1) * pageSize,
        relations: ["roles"],
      });
      return ok(UserDto.fromDataToDomain(userEntities) as User[]);
    } catch (error) {
      const objError: IError = new Error("Error saving user");
      objError.stack = JSON.stringify(error);
      objError.status = 500;

      return err(objError);
    }
  }

  async getByEmail(email: string): Promise<TResultGetByEmail> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);
      const userEntity = await repository.findOne({
        where: { email, deletedAt: IsNull() },
        relations: ["roles"],
      });
      if (!userEntity) {
        const objError: IError = new Error("user not found");
        objError.stack = "User not found with this email";
        objError.status = 404;

        return err(objError);
      }
      return ok(UserDto.fromDataToDomain(userEntity) as User);
    } catch (error) {
      const objError: IError = new Error("Error get user by email");
      objError.stack = JSON.stringify(error);
      objError.status = 500;

      return err(objError);
    }
  }

  async getByRefreshToken(
    refreshToken: string
  ): Promise<TResultGetByRefreshToken> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);
      const userEntity = await repository.findOne({
        where: { refreshToken, deletedAt: IsNull() },
        relations: ["roles"],
      });

      if (!userEntity) {
        const objError: IError = new Error("Not found user");
        objError.stack = "Not found user with this refresh token";
        objError.status = 404;

        return err(objError);
      }

      return ok(UserDto.fromDataToDomain(userEntity) as User);
    } catch (error) {
      const objError: IError = new Error("Error saving user");
      objError.stack = JSON.stringify(error);
      objError.status = 500;

      return err(objError);
    }
  }
}
