import Exam from "../models/examModel.js";

export const createnewexam = async (req, res) => {
  const { imgUrl, title, description, duration, totalMarks, monitoring } =
    req.body;
  try {
    const newExam = new Exam({
      imgUrl,
      title,
      description,
      duration,
      totalMarks,
      monitoring,
      createdBy: req.userId,
      questions: [],
    });
    await newExam.save();
    res.status(200).json({
      success: true,
      message: "Exam Created successfully",
      exam: newExam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Exam creation failed",
      error: error.message,
    });
  }
};

export const deleteExam = async (req, res) => {
  const { examId } = req.params;
  console.log(req.params);
  try {
    const exam = await Exam.findByIdAndDelete({ _id: examId });
    if (exam)
      return res.status(200).json({
        success:true,
        message: "Exam deleted successfully",
        exam: exam,
      });
    else {
      return res.status(200).json({
        success:false,
        message: "No exam with such id",
        exam: exam,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Exam deletion failed",
      error: error.message,
    });
  }
};

export const updateExam = async (req, res) => {
  const { examId } = req.params;
  const { imgUrl, title, description, duration, totalMarks, monitoring } =
    req.body;
  try {
    const exam = await Exam.findByIdAndUpdate(examId, {
      imgUrl,
      title,
      description,
      duration,
      totalMarks,
      monitoring,
    });
    res.status(200).json({
      success: true,
      message: "Exam updatad successfully",
      updatedexam: exam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Exam updation failed",
      error: error.message,
    });
  }
};

export const getAllExams = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("UserId", req.userId);
    const exams = await Exam.find({ createdBy: userId });
    return res.status(200).json({
      success: true,
      message: `Exams fetched successfully`,
      data: exams,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({
        success: false,
        message: `Error in getting content ${error.message}`,
      });
    else
      return res.status(400).json({
        success: false,
        message: `Unexpected error`,
      });
  }
};

export const getexams = async (req, res) => {
  try {
    // const userId = req.userId;
    // console.log("UserId ",req.userId)
    const exams = await Exam.find().populate("createdBy")
    console.log("NODEENV",process.env.NODE_ENV)

    // console.log(exams);
    return res.status(200).json({
      success: true,
      message: `Exams fetched successfully`,
      data: exams,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({
        success: false,
        message: `Error in getting content ${error.message}`,
      });
    else
      return res.status(400).json({
        success: false,
        message: `Unexpected error`,
      });
  }
};
