import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import logo from "../assets/logo.png";
import { userDataContext } from "../context/Usercontext.jsx";
import { authDataContext } from "../context/authContex.jsx";

function Nav() {
  const [showprofile, setshowprofile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [notification, setNotification] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  let { serverUrl } = useContext(authDataContext);

  let {
    userData,
    setUserData,
    setSearchResults
  } = useContext(userDataContext);

  useEffect(() => {
    let message = localStorage.getItem("successMessage");

    if (message) {
      setNotification(message);

      localStorage.removeItem("successMessage");

      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  }, []);

  const handleLogOut = async () => {
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setUserData(null);
      setshowprofile(false);
      setShowMenu(false);

      setNotification("Logout successful!");

      setTimeout(() => {
        setNotification("");
      }, 3000);

      console.log(result);

      navigate("/");
    } catch (error) {
      console.log("error in logout", error);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      return;
    }

    try {
      let result = await axios.post(
        serverUrl + `/api/listing/search?query=${search}`,
        {},
        { withCredentials: true }
      );

      console.log("Search result:", result.data);

      setSearchResults(result.data);

      navigate("/");
    } catch (error) {
      console.log("Error while searching:", error);
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setSearchResults(null);
    navigate("/");
  };

  const handleProfileClick = () => {
    setshowprofile(!showprofile);
    setShowMenu(false);
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    setshowprofile(false);
  };

  return (
    <div className="w-full">

      {/* Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-[100] bg-blue-600 text-white px-5 py-3 rounded-lg shadow-lg">
          {notification}
        </div>
      )}

      {/* Navbar */}
      <div className="w-full bg-white border-b border-gray-200 shadow-sm">

        <div className="min-h-[75px] flex items-center justify-between px-4 sm:px-6 lg:px-10">

          {/* Logo */}
      {/* Logo + Website Name */}
<div className="flex items-center gap-2 sm:gap-3">
  <img
    src={logo}
    alt="logo"
    className="w-[70px] sm:w-[80px] lg:w-[100px] cursor-pointer"
    onClick={() => navigate("/")}
  />

  <span className="text-sm sm:text-base lg:text-lg font-semibold text-blue-700 whitespace-nowrap">
    Room For Student
  </span>
</div>

          {/* Desktop Search */}
          <div className="hidden md:block relative w-[280px] lg:w-[380px]">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search here..."
              className="w-full px-5 py-2.5 pr-20 rounded-full border border-gray-300 outline-none focus:border-blue-500"
            />

            {search && (
              <button
                onClick={handleClearSearch}
                className="absolute right-10 top-2.5 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            )}

            <button
              onClick={handleSearch}
              className="absolute right-3 top-2.5 text-blue-600"
            >
              <FiSearch size={20} />
            </button>

          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* List Your Home */}
            <span
              onClick={() => {
                if (userData) {
                  navigate("/list-your-home");
                } else {
                  navigate("/login");
                }
              }}
              className="hidden sm:block text-sm lg:text-base text-blue-700 font-medium cursor-pointer hover:text-blue-900"
            >
              {/* LIST YOUR HOME */}
            </span>

            {/* Hamburger */}
            {userData && (
              <button
                onClick={handleMenuClick}
                className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition"
              >
                {showMenu ? (
                  <FiX size={22} />
                ) : (
                  <FiMenu size={22} />
                )}
              </button>
            )}

            {/* Profile */}
            <button
              onClick={handleProfileClick}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                userData
                  ? "bg-blue-600 text-white hover:bg-blue-700 font-semibold text-lg"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {userData ? (
                userData.name?.charAt(0).toUpperCase()
              ) : (
                <CgProfile size={23} />
              )}
            </button>

          </div>

          {/* Hamburger Menu */}
          {showMenu && userData && (
            <div className="absolute right-16 sm:right-20 lg:right-24 top-[65px] sm:top-[70px] w-[200px] bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-50">

              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/list-your-home");
                }}
                className="w-full text-left px-3 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                List your Home
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/my-listing");
                }}
                className="w-full text-left px-3 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                My Listing
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/chats");
                }}
                className="w-full text-left px-3 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                My Chats
              </button>

            </div>
          )}

          {/* Profile Menu */}
          {showprofile && (
            <div className="absolute right-4 sm:right-6 lg:right-10 top-[65px] sm:top-[70px] w-[200px] bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50">

              {!userData ? (
                <>
                  <button
                    onClick={() => {
                      setshowprofile(false);
                      navigate("/login");
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-blue-50 transition"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => {
                      setshowprofile(false);
                      navigate("/signup");
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-blue-50 transition"
                  >
                    Signup
                  </button>
                </>
              ) : (
                <>
                  {/* User Information */}
                  <div className="px-3 py-2 mb-2 border-b border-gray-200">

                    <p className="text-xs text-gray-500">
                      Welcome
                    </p>

                    <p className="font-semibold text-blue-700 truncate mt-1">
                      {userData.name}
                    </p>

                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              )}

            </div>
          )}

        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">

          <div className="relative w-full">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search here..."
              className="w-full px-5 py-2.5 pr-20 rounded-full border border-gray-300 outline-none focus:border-blue-500"
            />

            {search && (
              <button
                onClick={handleClearSearch}
                className="absolute right-10 top-2.5 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            )}

            <button
              onClick={handleSearch}
              className="absolute right-3 top-2.5 text-blue-600"
            >
              <FiSearch size={20} />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Nav;

