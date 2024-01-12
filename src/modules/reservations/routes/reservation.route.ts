import { Router } from "express";
import reservationController from "../controllers/reservation.controller";

export const ReservationRoutes = (): Router => {
  const route = Router();

  // POST /reservations
  route.post("/", reservationController.createReservation);

  // GET /reservations
  route.get("/", reservationController.listAllReservations);

  // GET /reservations/by_student/:student_cpf
  route.get(
    "/by_student/:student_cpf",
    reservationController.listReservationsByStudent
  );

  // GET /reservations/by_book/:book_isbn
  route.get(
    "/by_book/:book_isbn",
    reservationController.listReservationsByBook
  );

  // DELETE /reservations/:reservation_id
  route.delete("/:reservation_id", reservationController.deleteReservation);

  return route;
};
