import React, { useContext, useEffect, useState } from "react";
import Nav from "../component/nav";
import axios from "axios";
import { authDataContext } from "../context/authContex";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/Usercontext";

function Home() {
  const navigate = useNavigate();

  let { serverUrl } = useContext(authDataContext);
  let { userData, searchResults } = useContext(userDataContext);

  let [listings, setListings] = useState([]);

  const getListings = async () => {
    try {
      let result = await axios.get(
        serverUrl + "/api/listing/get",
        {
          withCredentials: true,
        }
      );

      console.log("All listings:", result.data);

      setListings(result.data);
    } catch (error) {
      console.log("Error while getting listings:", error);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  let displayedListings =
    searchResults !== null ? searchResults : listings;

  return (
    <div>
      <Nav />

      <div className="w-full min-h-screen bg-blue-50 px-4 py-8 sm:px-6 lg:px-8">

        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-700 text-center mb-8">
          {searchResults !== null ? "Search Results" : "Explore Homes"}
        </h1>

        {displayedListings.length === 0 ? (
          <p className="text-center text-gray-500">
            No listings available
          </p>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {displayedListings.map((listing) => (

              <div
                key={listing._id}
                onClick={() => {
                  if (!userData) {
                    navigate("/login");
                    return;
                  }

                  navigate(`/listing/${listing._id}`);
                }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
              >

                <img
                  src={listing.image1}
                  alt={listing.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-4">

                  <h2 className="text-lg font-semibold text-gray-800">
                    {listing.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    {listing.city}, {listing.landMark}
                  </p>

                  <div className="flex items-center gap-2 mt-3">

                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        listing.isBooked
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    ></span>

                    <span className="text-sm text-gray-600">
                      {listing.isBooked ? "Filled" : "Vacant"}
                    </span>

                  </div>

                  <p className="text-blue-600 font-semibold mt-3">
                    ₹{listing.rent} / month
                  </p>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {listing.description}
                  </p>

                  <p className="text-sm text-gray-500 mt-3">
                    {listing.category}
                  </p>

                </div>
              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Home;

