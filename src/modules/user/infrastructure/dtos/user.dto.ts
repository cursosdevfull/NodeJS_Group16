import { RoleDto } from "@role/infrastructure/dtos/role.dto";
import { Role } from "@user/domain/entities/role";
import { User, UserProperties } from "@user/domain/roots/user";
import { plainToInstance } from "class-transformer";

import { UserEntity } from "../entities/user.entity";

export class UserDto {
  static fromDataToDomain(data: UserEntity | UserEntity[]): User | User[] {
    if (Array.isArray(data)) {
      return data.map((user) => this.fromDataToDomain(user)) as User[];
    }

    const props: UserProperties = {
      userId: data.userId,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      roles: RoleDto.fromDataToDomain(data.roles) as Role[],
      refreshToken: data.refreshToken,
      secret: data.secret,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };

    return new User(data);
  }

  static fromDomainToData(data: User | User[]): UserEntity | UserEntity[] {
    if (Array.isArray(data)) {
      return data.map((user) => this.fromDomainToData(user)) as UserEntity[];
    }

    const props = data.properties;

    return plainToInstance(UserEntity, props);
  }
}
