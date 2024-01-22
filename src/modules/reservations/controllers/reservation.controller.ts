import { Request, Response } from "express";
import { AppDataSource } from "../../../services/database/app-data-source";
import { Reservation } from "../entities/reservation.entity";
import { Student } from "../../student/entities/student.entity";
import { Book } from "../../book/entities/book.entity";

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
      const book = await AppDataSource.getRepository(Book).findOne({
        where: { ISBN: book_isbn },
      });
      if (!book) {
        return res
          .status(404)
          .json({ ok: false, message: "Livro não encontrado" });
      }
      const reservation = await AppDataSource.getRepository(Reservation).save({
        book_id: book_isbn,
        student_id: student.email,
      });
      console.log(`Reservation ${reservation.id} created`);
      return res.status(201).json({ ok: true, reservation });
    } catch (error) {
      console.log("Error in createReservation");
      return res.status(500).send("Erro ao criar reserva");
    }
  }
  async listAllReservations(req: Request, res: Response) {
    try {
      const reservations = await AppDataSource.getRepository(Reservation).find({
        select: ["id", "book_id", "student_id", "created_reservation"],
      });
      return res.status(201).json({ ok: true, reservations });
    } catch (error) {
      console.log("Error in listAllReservations");
      return res.status(500).send("Erro ao listar todas as reservas");
    }
  }
  async listReservationsByStudent(req: Request, res: Response) {
    try {
      const student = await AppDataSource.getRepository(Student).findOne({
        where: { cpf: req.params.student_cpf },
      });
      if (!student) {
        return res
          .status(404)
          .json({ ok: false, message: "Erro ao encontrar estudante" });
      }
      const reservations = await AppDataSource.getRepository(Reservation).find({
        where: { student_id: student.email },
      });
      if (reservations.length <= 0) {
        return res.status(404).json({
          ok: false,
          message: `Não há reservas para o estudante: ${student.name}`,
        });
      }
      console.log(`Reserves found! ${reservations}`);
      return res.status(201).json({ ok: true, reservations });
    } catch (error) {
      console.log("Error in listReservationsByStudent");
      return res.status(500).send("Erro ao listar as reservas do estudante");
    }
  }

  async listReservationsByBook(req: Request, res: Response) {
    try {
      const book = await AppDataSource.getRepository(Book).findOne({
        where: { ISBN: req.params.book_isbn },
      });
      if (!book) {
        return res
          .status(404)
          .json({ ok: false, message: "Erro ao encontrar livro" });
      }
      const reservations = await AppDataSource.getRepository(Reservation).find({
        where: { book_id: req.params.book_isbn },
      });
      if (reservations.length <= 0) {
        return res.status(404).json({
          ok: false,
          message: `Não há reservas para o livro: ${book.title}`,
        });
      }
      console.log(`Reserves found! ${reservations}`);
      return res.status(201).json({ ok: true, reservations });
    } catch (error) {
      console.log("Error in listReservationsByBook");
      return res.status(500).send("Erro ao listar as reservas do livro");
    }
  }
  async deleteReservation(req: Request, res: Response) {
    try {
      const reservation = await AppDataSource.getRepository(
        Reservation
      ).findOne({
        where: { id: +req.params.reservation_id },
      });
      if (!reservation) {
        return res
          .status(404)
          .json({ ok: false, message: "Reserva não encontrada" });
      }
      await AppDataSource.getRepository(Reservation).remove(reservation);
      console.log(`Reserva deletada: ${reservation.id}`);
      return res.status(201).json({ ok: true, message: "Reserva deletada" });
    } catch (error) {
      console.log("Error in deleteReservation");
      return res.status(500).send("Erro ao deletar reserva");
    }
  }
}

export default new ReservationController();
