import { UserEntity } from "@user/infrastructure/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "role" })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
