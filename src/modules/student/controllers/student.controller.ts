import { Request, Response } from "express";
import { AppDataSource } from "../../../services/database/app-data-source";
import { Student } from "../entities/student.entity";
import bcrypt from "bcrypt";

class StudentController {
  async createStudent(req: Request, res: Response) {
    const { cpf, name, password, email } = req.body;
    try {
      const student = await AppDataSource.getRepository(Student).save({
        cpf: cpf,
        name: name,
        password: bcrypt.hashSync(password, 8),
        email: email,
      });
      console.log(`Student created: ${student}`);
      res
        .status(201)
        .json({ ok: true, message: "Estudante criado com sucesso" });
    } catch (error) {
      console.log(error, "Error in createStudent");
      res.status(400).json({ ok: false, message: "Erro ao criar estudante" });
    }
  }
}

export default new StudentController();
