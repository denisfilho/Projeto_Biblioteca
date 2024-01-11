import { Router } from "express";
import reservationController from "../controllers/reservation.controller";

export const ReservationRoutes = (): Router => {
  const route = Router();

  // POST /reservations
  route.post("/", reservationController.createReservation);

  return route;
};
