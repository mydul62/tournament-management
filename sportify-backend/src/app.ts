import express, { Application } from "express";
import cors from "cors";
import { applicationRoutes } from "./routes";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/not-found.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "SPORTIFY API Server is healthy and operational",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/v1", applicationRoutes);

// Middlewares
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
