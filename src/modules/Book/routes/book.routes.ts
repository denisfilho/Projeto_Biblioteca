import { Router } from "express";
import bookController from "../controllers/book.controller";

export const BookRoutes = (): Router => {
  const route = Router();

  //POST /books
  route.post("/", bookController.createBook);

  //GET /books
  route.get("/", bookController.listAllBooks);

  //GET /books/:book_isbn
  route.get("/:book_isbn", bookController.findBookByISBN);

  //DELETE /books/:book_isbn
  route.delete("/:book_isbn", bookController.deleteBook);

  return route;
};
