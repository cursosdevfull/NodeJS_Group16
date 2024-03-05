import { Role } from "@user/domain/entities/role";

import { RoleEntity } from "../entities/role.entity";

export class RoleDto {
  static fromDataToDomain(data: RoleEntity | RoleEntity[]): Role | Role[] {
    if (Array.isArray(data)) {
      return data.map((role) => this.fromDataToDomain(role)) as Role[];
    }

    const { roleId, name } = data;

    return new Role(roleId, name);
  }
}
