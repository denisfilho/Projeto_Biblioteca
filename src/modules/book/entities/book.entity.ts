import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Reservation } from "../../reservations/entities/reservation.entity";

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

  @OneToMany(() => Reservation, (reservation) => reservation.book)
  reservations: Reservation[];
}
