import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    imgUrl:{type:String},
    title: { type: String, required: true },
    description: String,
    duration: Number,
    totalMarks: Number,
    monitoring:String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  const Exam = mongoose.model('Exam', examSchema);

  export default Exam