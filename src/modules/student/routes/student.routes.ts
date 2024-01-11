import { Router } from "express";
import studentController from "../controllers/student.controller";

export const StudentRoutes = (): Router => {
  const router = Router();

  //POST /students
  router.post("/", studentController.createStudent);

  //GET /students
  router.get("/", studentController.listAllStudents);

  //GET /students/:student_email
  router.get("/:student_email", studentController.findStudentByEmail);

  //DELETE /students/:student_email
  router.delete("/:student_email", studentController.deleteStudent);

  //UPDATE /students/:student_email
  router.patch("/:student_email", studentController.updateStudent);

  return router;
};
