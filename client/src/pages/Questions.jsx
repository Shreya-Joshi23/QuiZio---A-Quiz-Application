import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deletequestion, getquestions } from "../helpers/apicommunicators";
import AddQuestion from "../components/AddQuestion";
import { useRecoilValue } from "recoil";
import userState from "../atom/useratom";
import EditQuestion from "../components/EditQuestion";
import { toast } from "react-toastify";

const Questions = () => {
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openadd, setopenadd] = useState(false);

  const [editquestion, seteditquestion] = useState(null);

  const user = useRecoilValue(userState);
  // console.log(user.role);

  const examId = params.examId;
  // console.log("ExamId:", examId);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const result = await getquestions(examId);
        if (result.success) {
          // toast.success(result.message);
          // console.log(result.questions);
          setQuestions(result.questions);
          console.log("Questions fetched successfully");
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        // alert(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [examId]);

  const handleEdit = (question) => {
    seteditquestion(question);
  };

  const handleDelete = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        const result = await deletequestion(questionId, examId);
        if (result.success) {
          toast.success("Question deleted successfully");
          setQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question._id !== questionId)
          );
        } else {
          toast.error("Not able to delete...");
        }
        // console.log(result);
      } catch (error) {
        console.log(error.message);
        toast.error("Server error:Deletion failed");
      }
    }
  };

  return (
    <>
      <div className="bg-[rgb(10,11,16)] container mx-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center text-white">
              Questions
            </h2>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <div
                  key={question._id || index}
                  className="border rounded-lg p-4 mb-4 bg-white shadow-md"
                >
                  <p className="text-lg font-semibold mb-2">
                    Q{index + 1}: {question.questionText}
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    {question.options.map((option, i) => (
                      <li
                        key={i}
                        className={`${
                          question.correctOption === i
                            ? "text-green-500 font-bold"
                            : ""
                        }`}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-600 mb-4">
                    <strong>Correct Answer:</strong>{" "}
                    {question.options[question.correctOption]}
                  </p>

                  {user.role == "admin" ? (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleEdit(question)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(question._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))
            ) : (
              <p className="text-white">
                No questions available for this exam.
              </p>
            )}
          </div>
        )}
        <button
          onClick={() => setopenadd(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Question
        </button>
      </div>
      {openadd && user.role == "admin" && (
        <AddQuestion setopenadd={setopenadd} setQuestions={setQuestions} />
      )}
      {editquestion !== null && user.role == "admin" && (
        <EditQuestion
          setQuestions={setQuestions}
          editquestion={editquestion}
          seteditquestion={seteditquestion}
        />
      )}
    </>
  );
};

export default Questions;
