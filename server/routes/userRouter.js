import express from "express";
import { logoutuser, signinuser, signupuser, userattempt } from "../controllers/userController.js";
import usermiddleware from "../middlewares/user.js";
import { getexams } from "../controllers/examController.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("userRouter working");
});

userRouter.post("/signup", signupuser);

userRouter.post("/signin", signinuser);

userRouter.post("/logout",logoutuser)

userRouter.get("/exams",usermiddleware,getexams);

userRouter.post("/attempt/:examId",usermiddleware,userattempt)

export default userRouter;
