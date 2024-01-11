import { Request, Response } from "express";
import { AppDataSource } from "../../../services/database/app-data-source";
import { Reservation } from "../entities/reservation.entity";
import { Student } from "../../student/entities/student.entity";

class ReservationController {
  async createReservation(req: Request, res: Response) {
    try {
      const { book_isbn, student_cpf } = req.body;
      const student = await AppDataSource.getRepository(Student).findOne({
        where: { cpf: student_cpf },
      });
      if (!student) {
        return res
          .status(404)
          .json({ ok: false, message: "Estudante não encontrado" });
      }
      console.log(`student.email: ${student.email}`);
      const reservation = await AppDataSource.getRepository(Reservation).save({
        book_id: book_isbn,
        student_id: student.email,
      });
      console.log(`Reservation ${reservation.id} created`);
      return res.status(201).json({ ok: true, reservation }); /**/
      //return res.status(201).json({ ok: true });
    } catch (error) {
      console.log("Error in createReservation");
      return res.status(500).send("Erro ao criar reserva");
    }
  }
}

export default new ReservationController();
