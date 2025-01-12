import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faUserShield,
  faCalculator,
  faClock,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import preview from "../assets/preview.png"

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="m-0 bg-gradient-to-r from-black to-indigo-600 flex flex-col text-white min-h-screen">
        <div className="text-center mb-16 px-6">
          <h1 className="text-5xl font-extrabold mt-20 lg:tracking-widest sm:text-6xl">
            Free online quizzes
          </h1>
          <h1 className="text-5xl font-extrabold mt-4 lg:tracking-widest sm:text-6xl">
            for assessments and tests
          </h1>
          <p className="mt-8 tracking-wider sm:text-lg lg:text-xl max-w-3xl mx-auto">
            One platform for giving quizzes, tracking your progress, and
            enhancing your learning experience.
          </p>
          <button
            className="p-4 bg-white text-black mt-12 text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-500 hover:text-white hover:scale-105 transition-transform"
            onClick={() => navigate("/auth")}
          >
            Get started 
          </button>
        </div>
      </div>

      <div className="relative flex justify-center items-center">
        <div className="lg:absolute lg:-top-72 sm:absolute sm:-top-0 bg-gray-100 rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden shadow-indigo-600 transition-shadow duration-300">
          <img
            src={preview}
            alt="Quiz Interface Preview"
            className="w-full h-[35em] cursor-pointer rounded-xl hover:shadow-indigo-900 shadow-2xl"
          />
        </div>
      </div>

      <div className="h-80 bg-[#0f0e2b] shadow-lg shadow-transparent"></div>
      <div className="bg-[#0f0e2b] py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            Features
          </h2>
          <p className="mt-4 text-white">
            Discover the unique features designed to enhance your quiz
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 text-center md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          <div className="p-6 bg-[#1c1a51] rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-indigo-600 text-center text-4xl mb-4">
              <FontAwesomeIcon icon={faUserShield} />
            </div>
            <h3 className="text-xl font-bold text-white">
              Secure Authentication
            </h3>
            <p className="mt-2 text-white">
              Login with ease and ensure your data stays safe with robust
              security.
            </p>
          </div>

          <div className="p-6 bg-[#1c1a51] rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="text-green-600 text-center  text-4xl mb-4">
              <FontAwesomeIcon icon={faCalculator} />
            </div>
            <h3 className="text-xl font-bold text-white">Automated Scoring</h3>
            <p className="mt-2 text-white">
              Get instant and accurate results right after completing your quiz.
            </p>
          </div>

          <div className="p-6 bg-[#1c1a51] rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-center  text-4xl mb-4">
              <FontAwesomeIcon icon={faClock} />
            </div>
            <h3 className="text-xl text-white  font-bold ">Timed Quizzes</h3>
            <p className="mt-2 text-white">
              Answer each question within 10 seconds to test your speed and
              accuracy.
            </p>
          </div>

          <div className="p-6 bg-[#1c1a51] rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-center  text-4xl mb-4">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <h3 className="text-xl text-white font-bold ">Progress Tracking</h3>
            <p className="mt-2 text-white">
              Monitor your growth and performance over time with detailed
              analytics.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
