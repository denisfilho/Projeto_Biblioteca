import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("books")
export class Book {
  @PrimaryColumn({ unique: true })
  ISBN: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  type: string;

  @Column()
  avaliable_copies: number;

  @Column({ default: 0 })
  reserved_copies: number;
}
