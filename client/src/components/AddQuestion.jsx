import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; 
import { addquestion } from "../helpers/apicommunicators";
import { toast } from "react-toastify";

const AddQuestion = ({ setopenadd,questions,setQuestions}) => {
  const params = useParams();
  const examId = params.examId; 
  const initialValues = {
    questionText: "",
    options: ["", "", "", ""], 
    correctOption: ""
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formValues.options];
    updatedOptions[index] = value;
    setFormValues({ ...formValues, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const correctIndex = Number(formValues.correctOption);
    if (
      !formValues.questionText ||
      formValues.options.some((opt) => !opt.trim()) ||
      isNaN(correctIndex) ||
      correctIndex < 0 ||
      correctIndex >= formValues.options.length 
    ) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    const questionData = {
      examId,
      questionText: formValues.questionText,
      options: formValues.options,
      correctOption: correctIndex,
    };

    console.log(questionData)

    try {
      const result = await addquestion(examId,questionData);
      console.log("Question added:", result.question);
      toast.success("Question added successfully.");
      setQuestions((prevQuestions)=>[...prevQuestions,result.question])
      setFormValues(initialValues); 
      setopenadd(false); 
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add question.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-5/12">
        <h2 className="text-xl font-bold mb-4">Add New Question</h2>
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter question text"
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

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setopenadd(false)}
              className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
