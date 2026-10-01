import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/authContex.jsx";
import Nav from "../component/nav";
import { useNavigate } from "react-router-dom";

function UpdateListing() {

  let { id } = useParams();
  let { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  let [listing, setListing] = useState(null);
  let [title, setTitle] = useState("");
let [description, setDescription] = useState("");
let [rent, setRent] = useState("");
let [landMark, setLandMark] = useState("");
let [category, setCategory] = useState("");
let [city, setCity] = useState("");
let [image1, setImage1] = useState(null);
let [image2, setImage2] = useState(null);
let [image3, setImage3] = useState(null);
const getListingDetails = async () => {
    try {
      let result = await axios.get(
        serverUrl + `/api/listing/findlistingbyid/${id}`,
        {
          withCredentials: true
        }
      );

      console.log("Listing for update:", result.data);

      setListing(result.data);
      setTitle(result.data.title);
setDescription(result.data.description);
setRent(result.data.rent);
setLandMark(result.data.landMark);
setCategory(result.data.category);
setCity(result.data.city);

    } catch (error) {
      console.log("Error while getting listing for update:", error);
    }
  };

const handleUpdateListing = async (e) => {
  e.preventDefault();

  try {
    let formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("rent", rent);
    formData.append("landMark", landMark);
    formData.append("category", category);
    formData.append("city", city);

    if (image1) {
      formData.append("image1", image1);
    }

    if (image2) {
      formData.append("image2", image2);
    }

    if (image3) {
      formData.append("image3", image3);
    }

   let result = await axios.post(
  serverUrl + `/api/listing/update/${id}`,
  formData,
  { withCredentials: true }
);

console.log("Listing updated:", result.data);

localStorage.setItem(
  "successMessage",
  "Listing updated successfully!"
);

navigate(`/listing/${id}`);

  } catch (error) {
    console.log("Error while updating listing:", error);
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
          <p className="text-gray-500">
            Loading listing...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-blue-50">

      <Nav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">

          <h1 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-6">
            Update Listing
          </h1>

<form
  onSubmit={handleUpdateListing}
  className="space-y-5"
>

  {/* Title */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">
      Title
    </label>

    <input
      type="text"
      value={title}
onChange={(e) => setTitle(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">
      Description
    </label>

    <textarea
      value={description}
onChange={(e) => setDescription(e.target.value)}
      rows="5"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
    />
  </div>

  {/* Rent */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">
      Monthly Rent
    </label>

    <input
      type="number"
      value={rent}
onChange={(e) => setRent(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
    />
  </div>

  {/* Landmark */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">
      Landmark
    </label>

    <input
      type="text"
      value={landMark}
onChange={(e) => setLandMark(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
    />
  </div>

  {/* Category */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">
      Category
    </label>

    <input
      type="text"
      value={category}
onChange={(e) => setCategory(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
    />
  </div>

  {/* City */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">
      City
    </label>

    <input
      type="text"
     value={city}
onChange={(e) => setCity(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
    />
    {/* Images */}

<div>
  <label className="block text-gray-700 font-medium mb-2">
    Image 1
  </label>

  <img
    src={listing.image1}
    alt="Current image 1"
    className="w-full h-48 object-contain bg-gray-100 rounded-lg mb-3"
  />

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage1(e.target.files[0])}
    className="w-full"
  />
</div>

<div>
  <label className="block text-gray-700 font-medium mb-2">
    Image 2
  </label>

  <img
    src={listing.image2}
    alt="Current image 2"
    className="w-full h-48 object-contain bg-gray-100 rounded-lg mb-3"
  />

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage2(e.target.files[0])}
    className="w-full"
  />
</div>

<div>
  <label className="block text-gray-700 font-medium mb-2">
    Image 3
  </label>

  <img
    src={listing.image3}
    alt="Current image 3"
    className="w-full h-48 object-contain bg-gray-100 rounded-lg mb-3"
  />

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage3(e.target.files[0])}
    className="w-full"
  />
</div>
  </div>

  <button
  type="submit"
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
>
  Update Listing
</button>

</form>
        </div>

      </div>

    </div>
  );
}

export default UpdateListing;