import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

import cabinsRouter from "./routes/cabinsRoute.js";
import settingsRouter from "./routes/settingsRoute.js";
import usersRouter from "./routes/usersRoute.js";
import todayRouter from "./routes/todayActivityRoute.js";
import statsRouter from "./routes/statsRoute.js";
import globalErrorHandler from "./controller/errorController.js";
import AppError from "./utils/appError.js";

const app = express();

// 1) Global middlewares

app.use(helmet());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  max: 100,
  windowsMs: 60 * 60 * 1000,
  message: "Too many requests, please try again in one hour!",
});
app.use("/api", limiter);

// Body &&& cookie parser
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Data sanitization

//  Data sanitization to sanitize only req.body and req.params
app.use((req, res, next) => {
  if (req.body) {
    req.body = mongoSanitize.sanitize(req.body, { replaceWith: "_" });
  }
  if (req.params) {
    req.params = mongoSanitize.sanitize(req.params, { replaceWith: "_" });
  }
  next();
});

// 2) Routes
app.use("/api/v1/cabins", cabinsRouter);
app.use("/api/v1/settings", settingsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/today-activity", todayRouter);
app.use("/api/v1/stats", statsRouter);

// Health check route for the uptime robot to avoid the render(cloud platform) free hosting limit
app.get("/api/v1/health", (req, res, next) => {
  res.status(200).json({ status: "ok" });
});

// Handle unhandled routes
app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// error middleware
app.use(globalErrorHandler);

export default app;
