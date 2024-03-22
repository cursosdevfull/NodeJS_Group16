import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { UserEntity } from "./User";

@Entity({ name: "car" })
export class CarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  brand: string;

  @Column({ nullable: false })
  model: string;

  @Column({ nullable: false })
  year: number;

  @ManyToMany(() => UserEntity, (user) => user.cars)
  users: UserEntity[];
}