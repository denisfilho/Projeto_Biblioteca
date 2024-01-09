import dotenv from "dotenv";
dotenv.config();

import { startDatabase } from "./services/database/app-data-source";
import { startWebServer } from "./app";

async function main() {
  try {
    await startDatabase();
    console.log("Database initialized");
    await startWebServer();
    console.log("Web server initialized");
  } catch (error) {
    console.log(error, "Error initializing app");
  }
}

main();
