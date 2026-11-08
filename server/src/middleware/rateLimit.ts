import rateLimit from "express-rate-limit";

const isProduction = process.env.NODE_ENV === "production";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  skip: () => !isProduction,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    error: { message: "Too many login attempts, try again later" },
  },
});

export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  skip: () => !isProduction,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    error: { message: "Too many registration attempts, try again later" },
  },
});