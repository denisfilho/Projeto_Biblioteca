import { Column, Entity, PrimaryColumn } from "typeorm";

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
}
