import { Request, Response } from "express";
import { AppDataSource } from "../../../services/database/app-data-source";
import { Book } from "../entities/book.entity";

class BookController {
  async createBook(req: Request, res: Response) {
    const { ISBN, title, author, type, avaliable_copies } = req.body;
    try {
      const book = await AppDataSource.getRepository(Book).save({
        ISBN: ISBN,
        title: title,
        author: author,
        type: type,
        avaliable_copies: avaliable_copies,
      });
      console.log(`Book ${book.ISBN} created`);
      res
        .status(201)
        .json({ ok: true, message: "Livro cadastrado com sucesso" });
    } catch (error) {
      console.log("Error in create book");
      return res
        .status(400)
        .json({ ok: false, message: "Erro ao criar usuário" });
    }
  }
}

export default new BookController();
