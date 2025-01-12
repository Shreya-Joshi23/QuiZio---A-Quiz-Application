import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getquestions, userattempted } from "../helpers/apicommunicators";
import Result from "../components/Result";
import { toast } from "react-toastify";

const ExamPanel = () => {
  const params = useParams();
  const examId = params.examId;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10);
  const [currQuestIdx, setCurrQuestIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState();

  const [opencomplete, setopencomplete] = useState(false);

  const [userscore, setuserscore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const result = await getquestions(examId);
        if (result.success) {
          toast.success(result.message);
          setQuestions(result.questions);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
      setLoading(false);
    };
    fetchQuestions();
  }, [examId]);

  useEffect(() => {
    if (questions.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            moveToNextQuestion();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currQuestIdx, questions]);

  // useEffect(() => {
  //   console.log(selectedOption);
  // }, [selectedOption]);

  const moveToNextQuestion = () => {
    if (currQuestIdx < questions.length - 1) {
      setCurrQuestIdx((prev) => prev + 1);
      setSelectedOption(null);
      setTimeLeft(10);
    } else {
      endQuiz();
    }
  };

  const handleOptionSelect = (index, correctOption) => {
    // console.log(index);
    setSelectedOption(index);
    // console.log(
    //   `Selected Option Index:${index} CorrectOptionIndex:${correctOption}`
    // );
    if (index === correctOption) {
      setuserscore((prevscore) => prevscore + 1);
      // console.log("CorrectAnswer", userscore);
    }
    // console.log(answers)
  };

  const endQuiz = async () => {
    const result = await userattempted(examId, userscore);
    if (result.success) {
      console.log("Quiz completed!");
      setopencomplete(true);
    }
  };

  if (loading) {
    return (
      <div className="flex text-white justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="h-[40em] bg-[rgb(10,11,16)] flex flex-col items-center justify-center py-8 px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Attempt Quiz</h1>
        {questions.length > 0 ? (
          <div className=" bg-white shadow-lg rounded-lg p-6 w-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Question {currQuestIdx + 1}/{questions.length}
            </h2>

            <p className="text-gray-600 text-lg mb-6">
              {questions[currQuestIdx].questionText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[currQuestIdx].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // console.log("Correctanswer:",questions[currQuestIdx].correctOption);
                    // console.log("UserAnswer:",index)
                    handleOptionSelect(
                      index,
                      questions[currQuestIdx].correctOption
                    );
                  }}
                  className={`py-2 px-4 rounded-lg shadow-md transition ${
                    selectedOption === index
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-gray-500">
                Time left: <span className="text-red-500">{timeLeft}s</span>
              </p>
              <div className="w-full bg-gray-300 h-2 rounded-full mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${(timeLeft / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={moveToNextQuestion}
              className={`mt-4 py-2 px-6 rounded-lg text-white font-bold ${
                selectedOption !== null && selectedOption !== undefined
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={selectedOption === null || selectedOption === undefined}
            >
              Next
            </button>
          </div>
        ) : (
          <p className="text-gray-700 text-lg">No questions available.</p>
        )}
      </div>
      {opencomplete && (
        <Result userscore={userscore} setopencomplete={setopencomplete} />
      )}
    </>
  );
};

export default ExamPanel;
