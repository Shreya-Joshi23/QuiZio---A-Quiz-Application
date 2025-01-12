import Exam from "../models/examModel.js";
import Question from "../models/questionModel.js";

export const addquestions=async (req,res)=>{
    const {examId}=req.params;
    const {questionText,options,correctOption,marks}=req.body;
    try{
        const newquestion=new Question({
            examId,
            questionText,
            options,
            correctOption,
            marks
        })
        const question=await newquestion.save();
        if(question){
        await Exam.findByIdAndUpdate(examId, { $push: { questions: question._id } });
        res.status(200).json({
            message:"Question saved successfully",
            question:newquestion
        })}
    }catch(error){
        res.status(400).json({
            message:"Error while saving question",
            error:error.message
        })
    }
}

export const updatequestion=async (req,res)=>{
    const {examId}=req.params;
    // console.log("ExamId",examId)
    const {questionId,questionText,options,correctOption}=req.body;
    // console.log("QuestionId",questionId)
    try{
        const updatedquestion={
            questionText,options,correctOption
        }
        // console.log(updatedquestion)
        await Question.findOneAndUpdate({examId:examId,_id:questionId},req.body)
        res.status(200).json({
            success:true,
            message:"Question updated successfully",
            updatedquestion
        })
    }catch(error){
        res.status(400).json({
            message:"Error while updating question",
            error:error.message
        })
    }
}

export const deletequestion=async (req,res)=>{
    const {examId}=req.params;
    const {questionId}=req.body
    try{
        // console.log("QuestionId:",questionId)
        // console.log("ExamId:",examId)

        const question=await Question.findOneAndDelete({examId,_id:questionId})
        if(!question){
            return res.status(400).json({
                message:"question not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Question deleted successfully",
            deletedquestion:question
        })
    }catch(error){
        res.status(400).json({
            success:false,
            message:"Error while deleting question",
            error:error.message
        })
    }
}

export const getquestions=async (req,res)=>{
    const {examId}=req.params;
    try{
        const questions=await Question.find({examId});
        res.status(200).json({
            success:true,
            message:"Questions fetched successfully",
            questions:questions
        })
    }catch(error){
        res.status(400).json({
            success:false,
            message:"Questions fetching failed",
            error:error.message
        })
    }
}