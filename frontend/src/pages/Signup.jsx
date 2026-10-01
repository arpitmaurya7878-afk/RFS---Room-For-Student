import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContex";
import { userDataContext } from "../context/Usercontext";
import axios from "axios";

function Signup() {

  const navigate = useNavigate();

  let { serverUrl } = useContext(authDataContext);
  let { userData, setUserData } = useContext(userDataContext);

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");


  const handleSignUp = async (e) => {

    e.preventDefault();

    try {

      console.log(serverUrl);

      let result = await axios.post(
        serverUrl + "/api/auth/signup",
        {
          name,
          email,
          password
        },
        {
          withCredentials: true
        }
      );

      setUserData(result.data);

localStorage.setItem("successMessage", "Signup successful!");

navigate("/");

    } catch (error) {

      console.log("error in frontend signup page", error);

    }
  };


  return (

    <div className="w-full min-h-screen bg-blue-50 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-700 text-center mb-2">
          Welcome
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Create your account
        </p>


        <form onSubmit={handleSignUp}>

          {/* Name */}
          <div className="mb-4">

            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>

            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            />

          </div>


          {/* Email */}
          <div className="mb-4">

            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            />

          </div>


          {/* Password */}
          <div className="mb-5">

            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            />

          </div>


          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign Up
          </button>


          {/* Login */}
          <p className="text-center text-gray-600 mt-5">

            Already have an account?{" "}

            <span
              className="text-blue-600 font-medium cursor-pointer hover:text-blue-800"
              onClick={() => navigate("/login")}
            >
              Login
            </span>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Signup;

