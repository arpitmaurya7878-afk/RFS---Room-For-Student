
import React, { useState, useContext } from "react";
import { authDataContext } from "../context/authContex";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListYourHome() {
    const navigate = useNavigate();

    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [rent, setRent] = useState("");
    let [landMark, setLandMark] = useState("");
    let [category, setCategory] = useState("");
    let [city, setCity] = useState("");
    let [image1, setImage1] = useState(null);
    let [image2, setImage2] = useState(null);
    let [image3, setImage3] = useState(null);

    // Location
    let [latitude, setLatitude] = useState("");
    let [longitude, setLongitude] = useState("");
    let [locationLoading, setLocationLoading] = useState(false);

    let { serverUrl } = useContext(authDataContext);

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by this browser");
            return;
        }

        setLocationLoading(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);

                console.log("Latitude:", position.coords.latitude);
                console.log("Longitude:", position.coords.longitude);

                setLocationLoading(false);
            },
            (error) => {
                console.log("Error getting location:", error);
                setLocationLoading(false);
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("rent", rent);
            formData.append("landMark", landMark);
            formData.append("category", category);
            formData.append("city", city);
            formData.append("image1", image1);
            formData.append("image2", image2);
            formData.append("image3", image3);

            // Add location only if owner selected it
            if (latitude && longitude) {
                formData.append("latitude", latitude);
                formData.append("longitude", longitude);
            }

            let result = await axios.post(
                serverUrl + "/api/listing/add",
                formData,
                { withCredentials: true }
            );

            console.log("Listing added successfully:", result.data);

            setTitle("");
            setDescription("");
            setRent("");
            setLandMark("");
            setCategory("");
            setCity("");
            setImage1(null);
            setImage2(null);
            setImage3(null);
            setLatitude("");
            setLongitude("");

            localStorage.setItem(
                "successMessage",
                "Home listed successfully!"
            );

            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {
            console.log("Error while adding listing:", error);
    console.log("Backend response:", error.response?.data);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">

                <h1 className="text-2xl sm:text-3xl font-semibold text-blue-700 text-center">
                    List Your Home
                </h1>

                <p className="text-gray-500 text-center mt-2 mb-8">
                    Add your property details
                </p>

                <form onSubmit={handleSubmit}>

                    {/* Title */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2">
                            Room type(1BHK/1RK/2BHK/1R)
                        </label>

                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter property title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2">
                            Description(tell everything about your room what fecility,You will give )
                        </label>

                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your property"
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 resize-none"
                        ></textarea>
                    </div>

                    {/* Rent */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2">
                            Rent
                        </label>

                        <input
                            type="number"
                            required
                            value={rent}
                            onChange={(e) => setRent(e.target.value)}
                            placeholder="Enter monthly rent"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Landmark */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2">
                            Landmark
                        </label>

                        <input
                            type="text"
                            required
                            value={landMark}
                            onChange={(e) => setLandMark(e.target.value)}
                            placeholder="Enter nearby landmark"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* City */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2">
                            City
                        </label>

                        <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2">
                            Category
                        </label>

                        <select
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 bg-white"
                        >
                            <option value="">Select category</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="House">House</option>
                            <option value="Room">Room</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Property Location
                        </label>

                        <button
                            type="button"
                            onClick={handleGetLocation}
                            disabled={locationLoading}
                            className="w-full sm:w-auto px-5 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:bg-gray-400"
                        >
                            {locationLoading
                                ? "Getting Location..."
                                : "📍 Use My Current Location"}
                        </button>

                        {latitude && longitude && (
                            <p className="text-green-600 text-sm mt-2">
                                ✓ Location selected successfully
                            </p>
                        )}

                        {!latitude && !longitude && (
                            <p className="text-gray-500 text-sm mt-2">
                                Optional: Share your property location with users
                            </p>
                        )}
                    </div>

                    {/* Images */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-3">
                            Property Images
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                            <div>
                                <p className="text-sm text-gray-500 mb-2">
                                    Home Entrance image(help's other to find home)
                                </p>

                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={(e) => setImage1(e.target.files[0])}
                                    className="w-full text-sm"
                                />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-2">
                                    Room Image 1
                                </p>

                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={(e) => setImage2(e.target.files[0])}
                                    className="w-full text-sm"
                                />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-2">
                                    Room Image 2
                                </p>

                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={(e) => setImage3(e.target.files[0])}
                                    className="w-full text-sm"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        List Your Home
                    </button>

                </form>
            </div>
        </div>
    );
}

export default ListYourHome;

