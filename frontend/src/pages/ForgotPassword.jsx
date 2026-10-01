import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/authContex.jsx";

function ForgotPassword() {

  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();

  let [email, setEmail] = useState("");
  let [loading, setLoading] = useState(false);
  let [message, setMessage] = useState("");
  let [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      let result = await axios.post(
        serverUrl + "/api/auth/forgot-password",
        {
          email
        },
        {
          withCredentials: true
        }
      );

      setMessage(result.data.message);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-50 flex items-center justify-center px-4">

      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-700 text-center mb-2">
          Forgot Password
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Enter your email to receive a password reset link
        </p>

        <form onSubmit={handleForgotPassword}>

          <div className="mb-5">

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

          {message && (
            <p className="text-green-600 text-sm mb-4">
              {message}
            </p>
          )}

          {error && (
            <p className="text-red-600 text-sm mb-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <button
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-blue-600 font-medium hover:text-blue-800"
        >
          ← Back to Login
        </button>

      </div>

    </div>
  );
}

export default ForgotPassword;