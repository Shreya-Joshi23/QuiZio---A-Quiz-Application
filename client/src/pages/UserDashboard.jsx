import React, { useEffect, useRef, useState } from "react";
import { getexamforuser } from "../helpers/apicommunicators";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [exams, setexams] = useState([]);
  const [loading, setloading] = useState(true);
  const [open, setopen] = useState(false);
  const [examId,setexamId]=useState();

  const navigate = useNavigate();

  const dashboardRef = useRef(null);
  useEffect(() => {
    const getexams = async () => {
      setloading(true);
      const result = await getexamforuser();
      // console.log(result);
      if (result.success) {
        setloading(false);
        setexams(result.data);
      } else {
        toast.error("Error fetching exams", result.response?.data.message);
      }
    };
    getexams();
  }, []);

  const handletakeexam = () => {
    navigate(`/user-dashboard/${examId}/questions`);

    // const elem=dashboardRef.current;
    // console.log(elem)
    // console.log(elem)
    // if (elem.requestFullscreen) {
    //   elem.requestFullscreen();
    // } else if (elem.webkitRequestFullscreen) { /* Safari */
    //   elem.webkitRequestFullscreen();
    // } else if (elem.msRequestFullscreen) { /* IE11 */
    //   elem.msRequestFullscreen();
    // }
  };


  return (
    <>
      <div ref={dashboardRef} className="min-h-full p-8 bg-[rgb(10,11,16)]">
        <h1 className="text-2xl text-center text-white font-bold mb-6">User Dashboard</h1>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="bg-[rgb(3,7,18)] shadow-slate-800 shadow-2xl rounded-lg p-6  cursor-pointer "
            >
              <img
                src={exam.imgUrl}
                alt="Exam"
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-white">
                {exam.title}
              </h2>
              <p className="text-white mt-2">{exam.description}</p>
              <p className="text-white mt-2">
                <strong>CreatedBy</strong> {exam?.createdBy?.firstName}{exam?.createdBy?.lastName}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {setopen(true);setexamId(exam._id)}}
                  className="bg-white hover:bg-slate-300 px-6 py-2 rounded "
                >
                  Take quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-5/12">
            <p>Are you confirm to start the exam?</p>
            <button
              onClick={handletakeexam}
              className="bg-green-500 text-white px-4 py-2 m-5 rounded hover:bg-green-600"
            >
              Confirm
            </button>
            <button
              onClick={() => setopen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </>
  );
};

export default UserDashboard;
