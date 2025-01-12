import express from "express";
import {  logoutadmin, signinadmin, signupadmin } from "../controllers/adminController.js";
import adminmiddleware from "../middlewares/admin.js";
import { createnewexam, deleteExam, getAllExams, updateExam } from "../controllers/examController.js";
import { addquestions, deletequestion, getquestions, updatequestion } from "../controllers/questionController.js";

const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
  res.send("userRouter working");
});

adminRouter.post("/signup", signupadmin);
adminRouter.post("/signin", signinadmin);
adminRouter.post("/logout",logoutadmin)

adminRouter.post("/newexam",adminmiddleware,createnewexam)
adminRouter.delete("/deleteExam/:examId",adminmiddleware,deleteExam);
adminRouter.put("/updateExam/:examId",adminmiddleware,updateExam);
adminRouter.get("/exams",adminmiddleware,getAllExams);

adminRouter.post("/questions/:examId",adminmiddleware,addquestions)
adminRouter.put("/questions/:examId",adminmiddleware,updatequestion)
adminRouter.delete("/questions/:examId",adminmiddleware,deletequestion)
adminRouter.get("/questions/:examId",getquestions)

export default adminRouter;
