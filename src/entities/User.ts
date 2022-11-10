import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoryPerUser } from "./CategoryPerUser";
import { Scrap } from "./Scrap";

@Index("IDX_4a257d2c9837248d70640b3e36", ["email"], { unique: true })
@Index("IDX_934039affb7cbfdaa73946df7d", ["studentId"], { unique: true })
@Index("User_email_uindex", ["email"], { unique: true })
@Index("User_userId_uindex", ["userId"], { unique: true })
@Entity("User", { schema: "kudog" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "userId" })
  userId: number;

  @Column("varchar", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("varchar", { name: "status", length: 1, default: () => "'Y'" })
  status: string;

  @Column("text", { name: "password" })
  password: string;

  @Column("text", { name: "refreshToken", nullable: true })
  refreshToken: string | null;

  @Column("varchar", { name: "receiveEmail", length: 100 })
  receiveEmail: string;

  @Column("int", { name: "studentID", unique: true })
  studentId: number;

  @Column("int", { name: "grade" })
  grade: number;

  @Column("text", { name: "major" })
  major: string;

  @OneToMany(() => CategoryPerUser, (categoryPerUser) => categoryPerUser.user)
  categoryPerUsers: CategoryPerUser[];

  @OneToMany(() => Scrap, (scrap) => scrap.user)
  scraps: Scrap[];
}
