import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContex.jsx";
import { userDataContext } from "../context/Usercontext.jsx";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  let { serverUrl } = useContext(authDataContext);
  let { userData, setUserData } = useContext(userDataContext);
  let [errorMessage, setErrorMessage] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      let result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      );

      console.log(result);

let userResult = await axios.get(
  serverUrl + "/api/user/currentuser",
  { withCredentials: true }
);

setUserData(userResult.data);

localStorage.setItem("successMessage", "Login successful!");
navigate("/");
    } catch (error) {
  console.log("error in frontend login page", error);

  setErrorMessage(
    error.response?.data?.message || "Something went wrong. Please try again."
  );
}
  };

  return (

    <div className="w-full min-h-screen bg-blue-50 flex items-center justify-center px-4">

      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-700 text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Login to continue
        </p>


        <form onSubmit={handleLogin}>

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
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            />

          </div>

          <div className="text-right mb-5">
  <span
    onClick={() => navigate("/forgot-password")}
    className="text-blue-600 text-sm font-medium cursor-pointer hover:text-blue-800"
  >
    Forgot Password?
  </span>
</div>


          {/* Login Button */}

          {errorMessage && (
  <p className="text-red-500 text-sm text-center mb-4">
    {errorMessage}
  </p>
)}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>


          {/* Signup */}
          <p className="text-center text-gray-600 mt-5">

            Don't have an account?{" "}

            <span
              className="text-blue-600 font-medium cursor-pointer hover:text-blue-800"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;
