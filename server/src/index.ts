import express from "express";
import router from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middleware/error.js";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import { logger } from "./utils/logger.js";

const app = express();

app.set("trust proxy", 1);

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());

app.get("/health", (req, res): void => {
  res.status(200).json({
    success: true,
    data: { status: "ok" },
    error: null,
  });
});

app.use("/api", router);
app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    logger.info("MongoDB connected");
    app.listen(port, () => logger.info(`Server running on port ${port}`));
  })
  .catch((err) => {
    logger.error("Connection error", { stack: err.stack });
  });