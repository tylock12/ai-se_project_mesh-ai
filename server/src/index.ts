import express from "express";
import router from "./routes/index.js";
import { logger } from "./middleware/logger.js";
import { notFoundHandler, errorHandler } from "./middleware/error.js";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.get("/health", (req, res): void => {
  res.status(200).json({
    "success": true,
    "data": { "status": "ok" },
    "error": null
  });
});
app.get('/test-error', (_req, _res) => {
  throw new Error('Test error');
});
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(logger);
app.use(express.json());
app.use(router);
app.use(notFoundHandler);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error('Connection error', err);
  });
