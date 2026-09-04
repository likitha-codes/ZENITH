import dns from "dns";
import dotenv from "dotenv";

import app from "./app";

import { connectDatabase } from "./config/database";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8"]);

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `ZENITH backend running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });