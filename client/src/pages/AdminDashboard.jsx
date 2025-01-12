import React, { useEffect, useState } from "react";
import { deleteexam, fetchexams } from "../helpers/apicommunicators";
import AddExam from "../components/AddExam";
import EditExam from "../components/EditExam";
import { useNavigate } from "react-router-dom";
import examsState from "../atom/examatom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

const AdminDashboard = () => {
  const [loading, setloading] = useState(true);
  const [open, setopen] = useState(false);
  const [editopen, seteditopen] = useState(false);
  const [examedit, setexamedit] = useState({});

  const [exam, setexam] = useRecoilState(examsState); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamsIfNeeded = async () => {
      if (exam.length === 0 && loading) { 
        try {
          const result = await fetchexams();
          if (result.success) {
            setexam(result.data); 
            // toast.success("Exams fetched successfully");
          } else {
            toast.error(result.response?.data?.message || "Error fetching exams");
          }
        } catch (error) {
          toast.error("Failed to fetch exams");
          console.error(error);
        } finally {
          setloading(false); 
        }
      }
    };  
    fetchExamsIfNeeded();
  }, [loading, setexam]); 

  const handleDelete = async (examId, event) => {
    event.stopPropagation();
    try {
      const result = await deleteexam(examId);
      if (result.success) {
        setexam((prev) => prev.filter((ex) => ex._id !== examId)); 
        toast.success("Exam deleted successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error deleting exams");
    }
  };

  return (
    <>
      <div className="min-h-screen p-8 bg-[rgb(10,11,16)]">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Welcome Admin</h1>
        {loading && <p className="text-center text-white">Loading...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exam.length===0?<p className="text-white">No exams added</p>:exam.map((ex) => (
            <div
              key={ex._id}
              className="bg-[rgb(3,7,18)] shadow-lg rounded-lg p-6  cursor-pointer "
              onClick={() => navigate(`/admin-dashboard/${ex._id}/questions`)}
            >
              <img
                src={ex.imgUrl}
                alt="Exam"
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-white">{ex.title}</h2>
              <p className="text-white mt-2">{ex.description}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    seteditopen(true);
                    setexamedit(ex);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDelete(ex._id, e)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            onClick={() => setopen(true)}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Add New Exam
          </button>
        </div>
      </div>
      {open && <AddExam setopen={setopen} />}
      {editopen && <EditExam exam={examedit} seteditopen={seteditopen} />}
    </>
  );
};

export default AdminDashboard;
