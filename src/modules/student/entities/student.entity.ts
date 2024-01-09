import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Reservation } from "../../reservations/reservation.entity";

@Entity("students")
export class Student {
  @Column({ unique: true })
  cpf: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @PrimaryColumn({ unique: true })
  email: string;

  @OneToMany(() => Reservation, (reservation) => reservation.book)
  reservations: Reservation[];
}
