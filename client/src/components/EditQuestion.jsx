import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editquestions } from "../helpers/apicommunicators";

const EditQuestion = ({ setQuestions, editquestion, seteditquestion }) => {
  const params = useParams();
  const examId = params.examId;
  // console.log(examId);

  // console.log("Question to be edited", editquestion);
  // console.log("ExamId", examId);

  const [formValues, setformValues] = useState(editquestion);

  const handleSave =async (e) => {
    e.preventDefault();
    try{
      const {_id,questionText,options,correctOption}=formValues;
      const datatosend={questionId:_id,questionText,options,correctOption};
      // console.log(JSON.stringify(datatosend))
      const result=await editquestions(examId,datatosend);
      if(result.success){
        toast.success("Question updated successfully");
        setQuestions((prevquestion)=> prevquestion.map((question) =>
        question._id === _id
          ? { ...question, ...formValues }
          : question
      ))
        seteditquestion(null)
      }
    }catch(error){
      console.log(error.message)
      toast.error("Server Error:Updation failed")
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formValues.options];
    updatedOptions[index] = value;
    setformValues({ ...formValues, options: updatedOptions });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-5/12">
        <h2 className="text-xl font-bold mb-4">Edit Question</h2>

        <form onSubmit={handleSave}>

          <div className="mb-4">
            <label
              htmlFor="questionText"
              className="block text-sm font-medium text-gray-700"
            >
              Question Text
            </label>
            <input
              type="text"
              id="questionText"
              name="questionText"
              placeholder="Enter exam title"
              value={formValues.questionText}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Options
            </label>
            {formValues.options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
              />
            ))}
          </div>

          <div className="mb-4">
            <label
              htmlFor="correctOption"
              className="block text-sm font-medium text-gray-700"
            >
              Correct Option (Index)
            </label>
            <input
              type="number"
              id="correctOption"
              name="correctOption"
              placeholder="Enter correct option index"
              value={formValues.correctOption}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600"
          >
            Update
          </button>

          <button
            type="button"
            onClick={() => seteditquestion(null)}
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 ml-4"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;
