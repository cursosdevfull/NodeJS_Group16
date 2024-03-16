import { User } from "@user/domain/roots/user";
import { Expose, plainToInstance, Type } from "class-transformer";

export class Role {
  @Expose()
  roleId: number;
}

export class UserResponse {
  @Expose()
  userId: string;

  @Expose()
  name: string;

  @Expose()
  lastname: string;

  @Expose()
  @Type(() => Role)
  roles: Role[];
}

export class UserResponseDto {
  static fromDomainToResponse(
    entity: User | User[]
  ): UserResponse | UserResponse[] {
    if (Array.isArray(entity)) {
      return entity.map((item) =>
        this.fromDomainToResponse(item)
      ) as UserResponse[];
    }

    return plainToInstance(UserResponse, entity.properties, {
      strategy: "excludeAll",
    });
  }
}
