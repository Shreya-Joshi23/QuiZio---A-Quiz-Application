import React, { useState } from "react";
import { editexam } from "../helpers/apicommunicators";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import examsState from "../atom/examatom";

const EditExam = ({ exam, seteditopen }) => {
  // console.log(exam._id);
  const [formValues, setformValues] = useState(exam);
  const setexam=useSetRecoilState(examsState)

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const examId = exam._id;
      const { _id, ...datatosend } = formValues;
      const result = await editexam(examId, datatosend);
      if (result.success) {
        toast.success(result.message);
        setexam((prev) =>
        prev.map((item) =>
          item._id === examId ? { ...item, ...datatosend } : item
        )
      );
      } else {
        console.log(result.error);
        toast.error("Error saving details")
      }
      seteditopen(false);
    } catch (error) {
      // alert(error.message);
      toast.error("Error saving details:Server error")
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-5/12">
        <h2 className="text-xl font-bold mb-4">Edit {exam.title}</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Exam Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter exam title"
              value={formValues.title}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Exam Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Enter exam description"
              value={formValues.description}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => seteditopen(false)}
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 ml-4"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExam;
