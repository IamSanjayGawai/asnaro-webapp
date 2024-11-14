import express from "express";
import { app, server } from "./socket.js";
import cors from "cors";
import db_connect from "./db_connect.js";
import dotenv from "dotenv";
import userRoutes from "./routers/user.js";
import processRoutes from "./routers/process.js";
import quotationRoutes from "./routers/quotation.js";
import transactionRoutes from "./routers/transaction.js";
import catRoutes from "./routers/category.js";
import cityRoutes from "./routers/city.js";
import paymentRoutes from "./routers/payment.js";
import adminRoutes from "./routers/admin.js";
import newsRoutes from "./routers/news.js";
import morgan from "morgan";
import xssReqSanitizer from "xss-req-sanitizer";
import review from "./routers/review.js";

app.set("view engine", "ejs");

// Middlewares
dotenv.config();
app.use(express.json({ limit: "130mb" }));
app.use(express.text({ type: "text/html" }));
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: process.env.FRONT_END_URL,
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);

app.use(morgan("dev")); // Log HTTP requests
app.use(xssReqSanitizer());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", process.env.FRONT_END_URL || "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });

// Request Interceptor Middleware
app.use((req, res, next) => {
  // Perform pre-processing tasks here
  console.log(`Incoming Request: ${req.method} ${req.url}`);

  next(); // Call next() to pass control to the next middleware or route handler
});

// Response Interceptor Middleware
app.use((req, res, next) => {
  // Override the send method to intercept the response data
  const originalSend = res.send;
  res.send = function (data) {
    console.log(`Outgoing Response: ${res.statusCode}`);
    originalSend.call(this, data);
  };
  next(); // Call next() to pass control to the next middleware or route handler
});

app.set("views", "invoicesTemplates");

// Routes
app.use("/user", userRoutes);
app.use("/process", processRoutes);
app.use("/categories", catRoutes);
app.use("/areas", cityRoutes);
app.use("/admin", adminRoutes);
app.use("/news", newsRoutes);
app.use("/quotation", quotationRoutes);
app.use("/transaction", transactionRoutes);
app.use("/review", review);
app.use("/payment", paymentRoutes);

const port = process.env.PORT || 8000;
const appStart = async () => {
  try {
    db_connect(process.env.MONGO_URI);
    server.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

appStart();
