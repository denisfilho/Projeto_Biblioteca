import { Router } from "express";
import studentController from "../controllers/student.controller";

export const StudentRoutes = (): Router => {
  const router = Router();

  //POST /students
  router.post("/", studentController.createStudent);
  router.get("/", studentController.listAllStudents);
  router.get("/:student_email", studentController.findStudentById);

  return router;
};
