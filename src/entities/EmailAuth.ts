import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("EmailAuth_delete_uindex", ["createdAt"], {})
@Index("EmailAuth_email_uindex", ["email"], { unique: true })
@Index("IDX_4ef7895f2ff67ba24dc9adaaab", ["email"], { unique: true })
@Entity("EmailAuth", { schema: "kudog" })
export class EmailAuth extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "uid" })
  uid: number;

  @Column("varchar", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("varchar", { name: "authCode", length: 6 })
  authCode: string;

  @Column("datetime", {
    name: "createdAt",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;
}
