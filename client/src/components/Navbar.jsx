import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import userState from "../atom/useratom";
import authState from "../atom/authatom";
import { logout } from "../helpers/apicommunicators";
import quiziologo from "../assets/quiziologo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate=useNavigate()

  const user=useRecoilValue(userState)
  const [auth,setauth]=useRecoilState(authState)
  const setuser=useSetRecoilState(userState)

  const handlelogout=async ()=>{
    try{
      // console.log(user)
      const res=await logout(user)
      if(res.success){
        toast.success(res.message)
      }
      // console.log(res);
      if(res){
        localStorage.removeItem("user-threads")
        setuser(null)
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex flex-col p-2 bg-[rgb(10,11,16,1)] lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
      <img src={quiziologo} onClick={()=>navigate("/")} className="h-20 cursor-pointer w-56" alt="logo" />

        {user ? (
          <div className="flex justify-end items-center space-x-6">

            <div className="relative p-4">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <FontAwesomeIcon className="p-3 rounded-full bg-[#2d63e0] object-cover" icon={ faUserPlus} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-10">
                  <ul className="py-1">
                  <li>
                      <a
                        href={user?(user.role=="admin"?"/admin-dashboard":"/user-dashboard"):""}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Visit Dashboard
                      </a>
                    </li>
                  
                    <li>
                      <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handlelogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-end pr-7 items-center space-x-6">
            <div className="relative">
              <button className="text-black hover:bg-blue-500 rounded-md px-4 tracking-wide py-1 bg-blue-600 hover:text-gray-800 text-lg" onClick={()=>{setauth("login");navigate("/auth")}}>
                Login
              </button>
            </div>

            <div className="relative">
              <button className="text-black hover:bg-blue-500 rounded-md px-4 py-1 tracking-wide bg-blue-600 hover:text-gray-800 text-lg" onClick={()=>{setauth("signup");navigate("/auth")}}>
                Signup
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
