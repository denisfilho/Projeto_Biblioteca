import express from "express";
import { StudentRoutes } from "./modules/student/routes/student.routes";
import { BookRoutes } from "./modules/Book/routes/book.routes";

export const app = express();
app.use(express.json()); //receber JSON
app.use("/students", StudentRoutes());
app.use("/books", BookRoutes());

export async function startWebServer() {
  return new Promise((resolve) => {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
      resolve(null);
    });
  });
}
