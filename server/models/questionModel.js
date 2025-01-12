import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctOption: { type: Number, required: true },
    marks: Number
  });

  const Question = mongoose.model('Question', questionSchema);

  export default Question