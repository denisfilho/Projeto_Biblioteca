import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "../../book/entities/book.entity";
import { Student } from "../../student/entities/student.entity";

@Entity("reservations")
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  book_id: string;

  @Column()
  student_id: string;

  @CreateDateColumn()
  created_reservation: Date;

  @ManyToOne(() => Book, (book) => book.reservations)
  @JoinColumn({ name: "book_id" })
  book: Book;

  @ManyToOne(() => Student, (student) => student.reservations)
  @JoinColumn({ name: "student_id" })
  student: Student;
}
