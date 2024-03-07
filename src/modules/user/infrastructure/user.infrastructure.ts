import { UserRepository } from "@user/domain/repositories/user.repository";
import { User } from "@user/domain/roots/user";
import { DatabaseBootstrap } from "src/bootstrap/database.bootstrap";
import { IsNull } from "typeorm";

import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

export class UserInfrastructure implements UserRepository {
  async save(user: User): Promise<void> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);
    try {
      const userEntity = UserDto.fromDomainToData(user) as UserEntity;
      await repository.save(userEntity);
    } catch (error) {}
  }

  async getAll(): Promise<User[]> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);
    const usersEntity = await repository.find({
      where: { deletedAt: IsNull() },
      relations: ["roles"],
    });

    return UserDto.fromDataToDomain(usersEntity) as User[];
  }

  async getById(userId: number): Promise<User> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);
    const userEntity = await repository.findOne({
      where: { userId, deletedAt: IsNull() },
      relations: ["roles"],
    });
    return UserDto.fromDataToDomain(userEntity) as User;
  }

  async getByPage(page: number, pageSize: number): Promise<User[]> {
    const repository =
      DatabaseBootstrap.getDataSource().getRepository(UserEntity);
    const [userEntities, total] = await repository.findAndCount({
      where: { deletedAt: IsNull() },
      take: pageSize,
      skip: (page - 1) * pageSize,
      relations: ["roles"],
    });
    return UserDto.fromDataToDomain(userEntities) as User[];
  }
}
