import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
