import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    score: Number,
    completedAt: { type: Date, default: Date.now },
  });
  const ExamAttempt = mongoose.model('ExamAttempt', attemptSchema);

  export default ExamAttempt