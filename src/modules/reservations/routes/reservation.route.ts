import { Router } from "express";
import reservationController from "../controllers/reservation.controller";

export const ReservationRoutes = (): Router => {
  const route = Router();

  // POST /reservations
  route.post("/", reservationController.createReservation);

  // GET /reservations
  route.get("/", reservationController.listAllReservations);

  // GET /reservations/:student_cpf
  route.get("/:student_cpf", reservationController.listReservationsByStudent);

  return route;
};
