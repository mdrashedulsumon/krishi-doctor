import express from "express";
import path from "path";
import dotenv from "dotenv";
import { apiRouter } from "./server/api.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware to permit telemetry from downloaded GitHub copies / local environments
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

// Mount API router
app.use("/api", apiRouter);

// Serve static frontend in production
const distPath = path.resolve(process.cwd(), "dist");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`🌾 Krishi Doctor AI server running at http://0.0.0.0:${PORT}`);
});
