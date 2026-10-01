import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Nav from "../component/nav";
import { authDataContext } from "../context/authContex.jsx";
import { useNavigate } from "react-router-dom";

function MyListing() {
  let { serverUrl } = useContext(authDataContext);
  let [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const getMyListings = async () => {
    try {
      let result = await axios.get(
        serverUrl + "/api/user/currentuser",
        {
          withCredentials: true
        }
      );

      console.log("My Listings:", result.data.listing);

      setListings(result.data.listing);
    } catch (error) {
      console.log("Error while getting my listings:", error);
    }
  };

  useEffect(() => {
    getMyListings();
  }, []);

  return (
    <div>
      <Nav />

      <div className="w-full min-h-screen bg-blue-50 px-4 py-8 sm:px-6 lg:px-8">

        <h1 className="text-2xl sm:text-3xl font-semibold text-blue-700 text-center mb-8">
          My Listing
        </h1>

        {listings.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven't listed any property yet.
          </p>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {listings.map((listing) => (
             <div
  key={listing._id}
  onClick={() => navigate(`/listing/${listing._id}`)}
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

export default MyListing;

