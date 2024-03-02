import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { CarEntity } from "./Car";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, type: "varchar", length: 60 })
  password: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  secret: string;

  @OneToMany(() => CarEntity, (car) => car.user, { cascade: true })
  cars: CarEntity[];
}
