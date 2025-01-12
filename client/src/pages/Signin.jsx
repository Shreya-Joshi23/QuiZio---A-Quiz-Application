import React, { useEffect, useState } from "react";
import { signin } from "../helpers/apicommunicators";
import { useRecoilState, useSetRecoilState } from "recoil";
import authState from "../atom/authatom";
import userState from "../atom/useratom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [formValues, setformValues] = useState(initialValues);
  const [formerrors, setformerrors] = useState({});
  const [isAdmin, setisAdmin] = useState(false);
  const [loading,setloading]=useState(false)
  const [user,setuser]=useRecoilState(userState)
  const navigate=useNavigate();

  const setauth = useSetRecoilState(authState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (Object.keys(formerrors).length === 0) {
      try {
        const { confirmpassword, ...datatosend } = formValues;
        const result = await signin(isAdmin, datatosend);
        if(result.success){
          toast.success(result.message)
          localStorage.setItem("user-threads",JSON.stringify(result.user))
          setuser(result.user)
          // console.log(result.user.role)
          const nav=user.role=="admin"?"/admin-dashboard":"/user-dashboard"
          setloading(false)
          navigate(nav)
        }
      } catch (error) {
        toast.error(error.response?.data?.message)
        console.error("Error during signin:", error.message)
      }
      setformValues(initialValues)

    } else {
      console.log(formerrors);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-black to-indigo-600 min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Sign In
        </h2>

        <div className="flex justify-between my-4">
          <button
            type="button"
            onClick={() => {setisAdmin(true);console.log("isAdmin:",isAdmin)}}
            className={`px-4 py-2 rounded ${
              isAdmin ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            Signin as Admin
          </button>
          <button
            type="button"
            onClick={() => {setisAdmin(false);console.log("IsAdmin:",isAdmin)}}
            className={`px-4 py-2 rounded ${
              !isAdmin ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            Signin as User
          </button>
        </div>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>          
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <p className="text-red-600">{formerrors.email}</p>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <p className="text-red-600">{formerrors.password}</p>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading?"Logging in...":"Sign in"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setauth("signup")}
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
