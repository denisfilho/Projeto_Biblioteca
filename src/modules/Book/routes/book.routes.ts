import { Router } from "express";
import bookController from "../controllers/book.controller";

export const BookRoutes = (): Router => {
  const route = Router();

  route.post("/", bookController.createBook);
  route.get("/", bookController.listAllBooks);

  return route;
};
