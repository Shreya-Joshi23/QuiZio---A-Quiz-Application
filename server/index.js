import express from "express";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import { connectToDatabase } from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
  
app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
const PORT = 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server Open on port ${PORT}`));
  })
  .catch((err) => console.log(err));
