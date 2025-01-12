import express from "express";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import { connectToDatabase } from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const allowedOrigins = ["https://quiziofrontend.vercel.app", "http://localhost:5173"];

app.use(
  cors({
    credentials: "include",
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
const PORT =process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server Open on port ${PORT}`));
  })
  .catch((err) => console.log(err));
