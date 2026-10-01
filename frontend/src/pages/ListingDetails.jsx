import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/authContex";
import Nav from "../component/nav";
import { userDataContext } from "../context/Usercontext.jsx";

function ListingDetails() {
  let { id } = useParams();
  let navigate = useNavigate();

  let { serverUrl } = useContext(authDataContext);
  let { userData } = useContext(userDataContext);

  let [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      let result = await axios.get(
        serverUrl + `/api/listing/findlistingbyid/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log("Listing details:", result.data);

      setListing(result.data);
    } catch (error) {
      console.log("Error while getting listing details:", error);
    }
  };

  const handleAvailabilityToggle = async () => {
    try {
      let newStatus = !listing.isBooked;

      let result = await axios.post(
        serverUrl + `/api/listing/update/${id}`,
        {
          title: listing.title,
          description: listing.description,
          rent: listing.rent,
          landMark: listing.landMark,
          category: listing.category,
          city: listing.city,
          isBooked: newStatus,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Availability updated:", result.data);

      setListing((prev) => ({
        ...prev,
        isBooked: newStatus,
      }));
    } catch (error) {
      console.log("Error while updating availability:", error);
    }
  };

  const handleDeleteListing = async () => {
    try {
      let result = await axios.delete(
        serverUrl + `/api/listing/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log("Delete listing:", result.data);

      navigate("/my-listing");
    } catch (error) {
      console.log("Error while deleting listing:", error);
    }
  };

const handleChatWithOwner = async () => {
    try {
      let result = await axios.post(
        serverUrl + "/api/chat/conversation",
        { listingId: id },
        { withCredentials: true }
      );

      console.log("Conversation:", result.data);

      let conversationId = result.data._id;

      navigate(`/chat/${conversationId}`);
    } catch (error) {
      console.log("Error while creating conversation:", error);
    }
  };
  

const handleViewLocation = () => {
  if (listing?.latitude != null && listing?.longitude != null) {
    window.open(
      `https://www.google.com/maps?q=${listing.latitude},${listing.longitude}`,
      "_blank"
    );
  }
};


  useEffect(() => {
    getListingDetails();
  }, [id]);

  if (!listing) {
    return (
      <div className="w-full min-h-screen bg-blue-50">
        <Nav />

        <div className="w-full min-h-[70vh] flex items-center justify-center">
          <p className="text-gray-500">Loading listing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-blue-50">
      <Nav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-5 text-blue-600 font-medium hover:text-blue-800"
        >
          ← Back to listings
        </button>

        {/* Main Listing Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-100">

            {/* Image 1 */}
            <div className="w-full bg-white rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={listing.image1}
                alt={listing.title}
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>

            {/* Image 2 and Image 3 */}
            <div className="grid grid-cols-1 gap-3">

              {/* Image 2 */}
              <div className="w-full bg-white rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={listing.image2}
                  alt={listing.title}
                  className="w-full h-auto max-h-[245px] object-contain"
                />
              </div>

              {/* Image 3 */}
              <div className="w-full bg-white rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={listing.image3}
                  alt={listing.title}
                  className="w-full h-auto max-h-[245px] object-contain"
                />
              </div>

            </div>
          </div>

          {/* Listing Information */}
          <div className="p-5 sm:p-7 md:p-8">

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
              {listing.title}
            </h1>

            {/* Location */}
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              📍 {listing.city}, {listing.landMark}
            </p>

            {/* Category */}
            <div className="mt-5">
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                {listing.category}
              </span>
            </div>
            {/* Property Status */}
<div className="mt-4 flex items-center gap-2">
  <span
    className={`w-3 h-3 rounded-full ${
      listing.isBooked ? "bg-red-500" : "bg-green-500"
    }`}
  ></span>

  <span
    className={`font-semibold ${
      listing.isBooked ? "text-red-600" : "text-green-600"
    }`}
  >
    {listing.isBooked ? "Filled" : "Vacant"}
  </span>
</div>

            {/* Rent */}
            <div className="mt-6">
              <p className="text-gray-500 text-sm">
                Monthly Rent
              </p>

              <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1">
                ₹{listing.rent}

                <span className="text-base font-normal text-gray-500">
                  {" "}
                  / month
                </span>
              </p>
            </div>

            {/* Owner Details */}
            <div className="mt-7 bg-blue-50 border border-blue-100 rounded-xl p-5">

              <h2 className="text-xl font-semibold text-gray-800">
                Property Owner
              </h2>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
                  {listing.host?.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {listing.host?.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Property Owner
                  </p>
                </div>

              </div>
            </div>

            {/* Description */}
            <div className="mt-7">
              <h2 className="text-xl font-semibold text-gray-800">
                About this place
              </h2>

              <p className="text-gray-600 mt-3 leading-7">
                {listing.description}
              </p>
            </div>

            {/* Additional Details */}
            <div className="mt-7 border-t pt-6">

              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Property Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">
                    City
                  </p>

                  <p className="font-medium text-gray-800 mt-1">
                    {listing.city}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">
                    Landmark
                  </p>

                  <p className="font-medium text-gray-800 mt-1">
                    {listing.landMark}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">
                    Category
                  </p>

                  <p className="font-medium text-gray-800 mt-1">
                    {listing.category}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">
                    Monthly Rent
                  </p>

                  <p className="font-medium text-gray-800 mt-1">
                    ₹{listing.rent}
                  </p>
                </div>

              </div>
            </div>

            {/* Contact / Booking */}
            <div className="mt-8 border-t pt-6">

              {userData?._id === listing?.host?._id ? (

                /* OWNER VIEW */

                <div className="flex flex-col gap-4 bg-gray-50 border border-gray-200 rounded-xl p-5">

                  {/* Property Status */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Property Status
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {listing.isBooked
                          ? "This property is currently filled/reserved"
                          : "This property is currently vacant"}
                      </p>
                    </div>

                    <button
                      onClick={handleAvailabilityToggle}
                      className={`relative w-16 h-8 rounded-full transition ${
                        !listing.isBooked
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition ${
                          !listing.isBooked
                            ? "left-9"
                            : "left-1"
                        }`}
                      ></span>
                    </button>

                  </div>

                  {/* Owner Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 border-t pt-4">

                    <button
                      onClick={() =>
                        navigate(`/update-listing/${listing._id}`)
                      }
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
                    >
                      ✏️ Update Listing
                    </button>

                    <button
                      onClick={handleDeleteListing}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition"
                    >
                      🗑️ Delete Listing
                    </button>

                  </div>

                </div>

              ) : (

                /* NORMAL USER VIEW */

          
<div className="flex flex-col gap-3">

  <button
    onClick={handleChatWithOwner}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-base sm:text-lg transition flex items-center justify-center gap-2"
  >
    <span className="text-xl">💬</span>
    Contact Owner
  </button>

  {listing.latitude != null && listing.longitude != null && (
    <button
      onClick={handleViewLocation}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-base sm:text-lg transition flex items-center justify-center gap-2"
    >
      <span className="text-xl">📍</span>
      View Location
    </button>
  )}

</div>


                

              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;

