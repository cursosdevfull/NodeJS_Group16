import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "course" })
export class CourseEntity {
  @PrimaryColumn({ type: "varchar", length: 36 })
  courseId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  slug: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  status: string;

  @Column({ type: "datetime", nullable: false })
  createdAt: Date;

  @Column({ type: "datetime", nullable: true })
  updatedAt: Date;

  @Column({ type: "datetime", nullable: true })
  deletedAt: Date;
}
