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
        .status(500)
        .json({ ok: false, message: "Erro ao cadastrar livro" });
    }
  }
  async listAllBooks(req: Request, res: Response) {
    try {
      const books = await AppDataSource.getRepository(Book).find({
        select: [
          "ISBN",
          "title",
          "author",
          "type",
          "avaliable_copies",
          "reserved_copies",
          "reservations",
        ],
      });
      return res.status(201).json({ ok: true, books });
    } catch (error) {
      console.log("Error in listAllBooks");
      return res
        .status(400)
        .json({ ok: false, message: "Erro ao listar todos os livros" });
    }
  }
  async findBookByISBN(req: Request, res: Response) {
    try {
      const book = await AppDataSource.getRepository(Book).find({
        where: { ISBN: req.params.book_isbn },
      });
      return res.status(201).json({ ok: true, book });
    } catch (error) {
      console.log("Error in findBookByISBN");
      return res
        .status(500)
        .json({ ok: false, message: "Erro ao encontrar livro" });
    }
  }
  async deleteBook(req: Request, res: Response) {
    try {
      const book = await AppDataSource.getRepository(Book).findOne({
        where: { ISBN: req.params.book_isbn },
      });
      if (!book) {
        return res
          .status(404)
          .json({ ok: false, message: "Livro não encontrado" });
      }
      await AppDataSource.getRepository(Book).delete(book);
      console.log(`Book ${book.title} deleted`);
      return res
        .status(201)
        .json({ ok: true, message: "Livro deletado com sucessso" });
    } catch (error) {
      console.log("Error in deleteBook");
      return res.status(500).send("Erro ao deletar livro");
    }
  }

  async updateBook(req: Request, res: Response) {
    try {
      const { ISBN, title, author, type, avaliable_copies, reserved_copies } =
        req.body;
      const book = await AppDataSource.getRepository(Book).findOne({
        where: { ISBN: req.params.book_isbn },
      });
      if (!book) {
        return res.status(404).json("Livro não encontrado");
      }
      if (ISBN) book.ISBN = ISBN;
      if (title) book.title = title;
      if (author) book.author = author;
      if (type) book.type = type;
      if (avaliable_copies) book.avaliable_copies = avaliable_copies;
      if (reserved_copies) book.reserved_copies = reserved_copies;

      return res.status(201).json({ ok: true, book });
    } catch (error) {
      console.log("Error in updateBook");
      return res.status(500).send("Erro ao atualizar livro");
    }
  }
}

export default new BookController();
