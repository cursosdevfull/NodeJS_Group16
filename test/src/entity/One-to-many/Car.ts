import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @ManyToOne(() => UserEntity, (user) => user.cars)
  user: UserEntity;
}
