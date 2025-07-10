import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import productRoutes from "./routes/product.route.js";
import serviceRoutes from "./routes/service.route.js";
import commentRoutes from "./routes/comment.route.js";
import sliderRoutes from "./routes/slider.route.js";
import brandRoutes from "./routes/brand.route.js";
import inquiryRoutes from "./routes/inquiry.route.js";
import testimonialRoutes from "./routes/testimonial.route.js";
import metatagsRoutes from "./routes/metatags.route.js";
import formsRoute from "./routes/forms.route.js";
import oilFormRoutes from "./routes/oilForm.route.js";
import projectRoutes from './routes/projects.route.js';
import warrantyCard from './routes/warrantyCard.route.js'
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
dotenv.config();
const url =
  process.env.MONGO_URI ||
  "mongodb+srv://ianupam001:roM6buna5Hgl2DvK@cluster0.8bnifxi.mongodb.net/grills-db?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();
const allowedOrigins = ["http://localhost:5173", "https://invhub-frontend.vercel.app/"];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cors());

app.use(express.json());
app.use(cookieParser());
const port = 4001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/product", productRoutes);
app.use("/api/warrantyCard", warrantyCard);
app.use("/api/service", serviceRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/forms", formsRoute);
app.use("/api/metatags", metatagsRoutes);
app.use("/api/oilForm", oilFormRoutes);
app.use("/api/projects", projectRoutes)

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
