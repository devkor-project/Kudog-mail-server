import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Scrap } from "./Scrap";
import { Category } from "./Category";

@Index("Notice_Category_categoryId_fk", ["categoryId"], {})
@Index("Notice_noticeId_uindex", ["noticeId"], { unique: true })
@Entity("Notice", { schema: "kudog" })
export class Notice extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "noticeId" })
  noticeId: number;

  @Column("varchar", { name: "title", length: 200 })
  title: string;

  @Column("longtext", { name: "content" })
  content: string;

  @Column("varchar", { name: "writer", length: 50 })
  writer: string;

  @Column("date", { name: "date" })
  date: string;

  @Column("varchar", { name: "provider", length: 50 })
  provider: string;

  @Column("int", { name: "categoryId" })
  categoryId: number;

  @Column("int", { name: "viewCount", default: () => "'0'" })
  viewCount: number;

  @OneToMany(() => Scrap, (scrap) => scrap.notice)
  scraps: Scrap[];

  @ManyToOne(() => Category, (category) => category.notices, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "categoryId", referencedColumnName: "categoryId" }])
  category: Category;
}
