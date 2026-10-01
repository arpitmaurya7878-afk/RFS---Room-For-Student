import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/authContex";
import { userDataContext } from "../context/Usercontext";
import Nav from "../component/nav";

function Chats() {
  let { serverUrl } = useContext(authDataContext);
  let { userData } = useContext(userDataContext);

  let navigate = useNavigate();

  let [conversations, setConversations] = useState([]);

  const getConversations = async () => {
    try {
      let result = await axios.get(
        serverUrl + "/api/chat/conversations",
        { withCredentials: true }
      );

      console.log("Conversations:", result.data);

      setConversations(result.data);
    } catch (error) {
      console.log("Error while getting conversations:", error);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <div className="w-full min-h-screen bg-blue-50">
      <Nav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

 <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6">
  My Chats
</h1>

        {conversations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-500">
              No chats available.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">

            {conversations.map((conversation) => {

              let otherUser = conversation.participants.find(
                (participant) => participant._id !== userData?._id
              );

              return (
                <div
                  key={conversation._id}
                  onClick={() => navigate(`/chat/${conversation._id}`)}
                  className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={conversation.listing?.image1}
                      alt="listing"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                    />

                    <div className="flex-1 min-w-0">

                      <h2 className="font-semibold text-lg text-gray-800 truncate">
                        {conversation.listing?.title}
                      </h2>

                      <p className="text-blue-600 font-medium mt-1">
                        {otherUser?.name}
                      </p>

                      <p className="text-gray-500 text-sm mt-1 truncate">
                        {conversation.lastMessage
                          ? conversation.lastMessage
                          : "No messages yet"}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}

export default Chats;
