import React, { useState } from "react";
import { addexam } from "../helpers/apicommunicators";
import { useRecoilState, useSetRecoilState } from "recoil";
import examsState from "../atom/examatom";
import { toast } from "react-toastify";

const AddExam = ({ open, setopen }) => {
  const initialValues = {
    imgUrl: "",
    title: "",
    description: "",
  };
  const [formValues, setformValues] = useState(initialValues);
  const setexam=useSetRecoilState(examsState)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formValues);
      const result = await addexam(formValues);
      // console.log(result);
      if (result.success) {
        toast.success(result.message);
        setexam((prev)=>[...prev,formValues])
      } else {
        toast.error("Error adding exam");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
    setopen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-5/12">
        <h2 className="text-xl font-bold mb-4">Add New Exam</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="imgurl"
              className="block text-sm font-medium text-gray-700"
            >
              ImageUrl
            </label>
            <input
              type="text"
              id="imgUrl"
              name="imgUrl"
              placeholder="Exam img"
              value={formValues.imgUrl}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

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
            Submit
          </button>

          <button
            type="button"
            onClick={() => setopen(false)}
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 ml-4"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExam;
