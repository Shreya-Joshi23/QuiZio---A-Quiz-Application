import axios from "axios";

export const signup = async (isAdmin, datatosend) => {
  const url = isAdmin ? "admin/signup" : "user/signup";
  const response = await axios.post(url, datatosend);
  // console.log(response.data);
  return response.data;
};

export const signin = async (isAdmin, datatosend) => {
  const url = isAdmin ? "admin/signin" : "user/signin";
  const response = await axios.post(url, datatosend);
  // console.log(response.data);
  return response.data;
};

export const logout = async (user) => {
  try {
    // console.log(user);
    const url = user?.role == "admin" ? "/admin/logout" : "/user/logout";
    const response = await axios.post(url);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchexams = async () => {
  try {
    console.log("Call to exams collection")
    const response = await axios.get("/admin/exams");
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const addexam = async (exam) => {
  try {
    const response = await axios.post("/admin/newexam", exam);
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error.message);
    return error;
  }
};

export const deleteexam = async (examId) => {
  try {
    // console.log(examId);
    const response = await axios.delete(`/admin/deleteExam/${examId}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const editexam = async (examId, datatosend) => {
  try {
    const response = await axios.put(`/admin/updateExam/${examId}`, datatosend);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getquestions = async (examId) => {
  try {
    const response = await axios.get(`/admin/questions/${examId}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const editquestions=async (examId,formValues)=>{
  try{
    // console.log("ExamId:",examId)
    // console.log("QuestionId:",formValues.questionId);
    // console.log("FormValues",JSON.stringify(formValues))
    const response=await axios.put(`/admin/questions/${examId}`,formValues);
    // console.log(response);
    return response.data;
  }catch(error){
    console.log(error.message);
    return error;
  }
}

export const deletequestion = async (questionId, examId) => {
  try {
    const response = await axios.delete(`/admin/questions/${examId}`, {
      data: { questionId }, 
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error.message);
    return error;
  }
};

export const addquestion=async (examId,question)=>{
  try{
    const response=await axios.post(`/admin/questions/${examId}`,question)
    // console.log(response)
    return response.data
  }catch(error){
    // console.log(error.message)
    return error;
  }
}

export const getexamforuser=async ()=>{
  try {
    const response = await axios.get("/user/exams");
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const userattempted=async (examId,userscore)=>{
  try{
    // console.log(examId)
    // console.log(userscore)
    const response=await axios.post(`/user/attempt/${examId}`,{userscore})
    // console.log(response);
    return response.data;
  }catch(error){
    console.log(error.message)
  }
}