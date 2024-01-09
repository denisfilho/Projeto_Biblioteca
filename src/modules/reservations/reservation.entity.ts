import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("reservations")
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_book: number;

  @Column()
  id_student: number;

  @CreateDateColumn()
  created_reservation: Date;
}
