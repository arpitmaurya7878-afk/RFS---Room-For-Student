import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/authContex.jsx";

function ResetPassword() {

  let { token } = useParams();
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();

  let [newPassword, setNewPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [message, setMessage] = useState("");
  let [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!newPassword.trim()) {
      setError("Please enter a new password");
      return;
    }

    if (!confirmPassword.trim()) {
      setError("Please confirm your password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      let result = await axios.post(
        serverUrl + `/api/auth/reset-password/${token}`,
        {
          newPassword
        },
        {
          withCredentials: true
        }
      );

      setMessage(result.data.message);

      setNewPassword("");
      setConfirmPassword("");

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
          Reset Password
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Enter your new password
        </p>

        <form onSubmit={handleResetPassword}>

          <div className="mb-4">

            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              New Password
            </label>

            <input
              type="password"
              id="newPassword"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            />

          </div>

          <div className="mb-5">

            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
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
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

        {message && (
          <button
            onClick={() => navigate("/login")}
            className="w-full mt-4 text-blue-600 font-medium hover:text-blue-800"
          >
            Go to Login
          </button>
        )}

      </div>

    </div>
  );
}

export default ResetPassword;