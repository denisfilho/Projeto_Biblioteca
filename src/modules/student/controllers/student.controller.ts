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
  async listAllStudents(req: Request, res: Response) {
    try {
      const students = await AppDataSource.getRepository(Student).find({
        select: ["cpf", "name", "password", "email"],
      });
      return res.status(201).json({ ok: true, students });
    } catch (error) {
      console.log("Error in listAllStudents");
      return res
        .status(400)
        .json({ ok: false, message: "Erro ao listar todos os estudantes" });
    }
  }

  async findStudentByEmail(req: Request, res: Response) {
    try {
      const student = await AppDataSource.getRepository(Student).find({
        where: { email: req.params.student_email },
      });
      return res.status(201).json({ ok: true, student });
    } catch (error) {
      console.log("Error in findStudentById");
      return res
        .status(500)
        .json({ ok: false, message: "Erro ao encontrar estudante" });
    }
  }

  async deleteStudent(req: Request, res: Response) {
    try {
      const student = await AppDataSource.getRepository(Student).findOne({
        where: { email: req.params.student_email },
      });
      if (!student) {
        return res
          .status(404)
          .json({ ok: true, message: "Estudante não encontrado" });
      }
      await AppDataSource.getRepository(Student).delete(student);
      console.log(`Student ${student.email} deleted`);
      return res
        .status(201)
        .json({ ok: true, message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.log("Error in deleteStudent");
      return res
        .status(500)
        .send({ ok: false, error: "Erro ao deletar usuário" });
    }
  }
}

export default new StudentController();
