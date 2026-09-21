// src/server.js
import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./database.js";
import { initScheduler } from "./services/horoscopeService.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();
  initScheduler();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();