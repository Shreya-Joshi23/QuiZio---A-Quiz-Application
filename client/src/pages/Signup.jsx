import React, { useEffect, useState } from "react";
import { signupvalidate } from "../validations/signupvalidate";
import { signup } from "../helpers/apicommunicators";
import { useSetRecoilState } from "recoil";
import userState from "../atom/useratom";
import authState from "../atom/authatom";
import { toast } from "react-toastify";

const Signup = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const [formValues, setformValues] = useState(initialValues);
  const [formerrors, setformerrors] = useState({});
  const [isAdmin, setisAdmin] = useState(false);
  const [loading, setloading] = useState(false);

  const setuser = useSetRecoilState(userState);
  const setauth = useSetRecoilState(authState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    setformerrors(signupvalidate(formValues));
    if (Object.keys(formerrors).length === 0) {
      try {
        const { confirmpassword, ...datatosend } = formValues;
        const result = await signup(isAdmin, datatosend);
        if (result.success) {
          toast.success(result.message);
          console.log(result.user)
          localStorage.setItem("user-threads", JSON.stringify(result.user));
          setuser(result.user);
        }else{
          setformerrors(result.errors)
          toast.error(result.errors[0].message)
          // console.log(result.errors[0].message)
          setloading(false)
        }
        console.log(result.message);
        setformerrors(result.errors)
        setloading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data.error || error.message);
        console.error(
          "Error during signup:",
          error.response?.data.message || error.message
        );
      }
      setformValues(initialValues);
    } else {
      console.log(formerrors);
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-indigo-600 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Sign Up
        </h2>

        <div className="flex justify-between my-4">
          <button
            type="button"
            onClick={() => {
              setisAdmin(true);
              console.log("isAdmin:", isAdmin);
            }}
            className={`px-4 py-2 rounded ${
              isAdmin ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            Signup as Admin
          </button>
          <button
            type="button"
            onClick={() => {
              setisAdmin(false);
              console.log("IsAdmin:", isAdmin);
            }}
            className={`px-4 py-2 rounded ${
              !isAdmin ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            Signup as User
          </button>
        </div>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formValues.firstName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <p className="text-red-600">{formerrors.firstName}</p>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formValues.lastName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
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
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              placeholder="Confirm your password"
              value={formValues.confirmpassword}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <p className="text-red-600">{formerrors.confirmpassword}</p>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setauth("login")}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
