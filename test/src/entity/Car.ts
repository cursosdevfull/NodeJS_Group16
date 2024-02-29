import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToOne(() => UserEntity, (user) => user.car)
  user: UserEntity;
}
