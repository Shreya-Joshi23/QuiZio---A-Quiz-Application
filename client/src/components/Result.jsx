import React from "react";
import { useNavigate } from "react-router-dom";

const Result = ({ userscore }) => {
  const navigate=useNavigate()
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-center space-y-2 p-8 flex flex-col justify-center items-center rounded-lg w-5/12">
        <p className="text-2xl font-semibold">Congratulations 🎉🎉 Successfully completed the quiz.</p>
        <p className={`font-bold p-6 text-xl`}>You scored: <span className="text-green-600">{userscore}</span></p>
        <button className="p-2 bg-green-500 hover:bg-green-600 rounded-md" onClick={()=>navigate("/user-dashboard")}>
          Attempt more quizzes
        </button>
      </div>
    </div>
  );
};

export default Result;
