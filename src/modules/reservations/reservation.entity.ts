import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "../Book/book.entity";
import { Student } from "../student/entities/student.entity";

@Entity("reservations")
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  book_id: number;

  @Column()
  student_id: number;

  @CreateDateColumn()
  created_reservation: Date;

  @ManyToOne(() => Student, (student) => student.reservations)
  @JoinColumn({ name: "book_id" })
  book: Book;

  @ManyToOne(() => Student, (student) => student.reservations)
  @JoinColumn({ name: "student_id" })
  student: Student;
}
