import express from "express";
export const app = express();
app.use(express.json()); //receber JSON
export async function startWebServer() {
  return new Promise((resolve) => {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
      resolve(null);
    });
  });
}
