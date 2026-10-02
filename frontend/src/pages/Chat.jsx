import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/authContex";
import { userDataContext } from "../context/Usercontext";
import Nav from "../component/nav";

function Chat() {
  let { conversationId } = useParams();
  let navigate = useNavigate();

  let { serverUrl } = useContext(authDataContext);
  let { userData } = useContext(userDataContext);

  let [conversation, setConversation] = useState(null);
  let [messages, setMessages] = useState([]);
  let [text, setText] = useState("");

  let messagesContainerRef = useRef(null);

  const getConversation = async () => {
    try {
      let result = await axios.get(
        serverUrl + "/api/chat/conversations",
        { withCredentials: true }
      );

      let currentConversation = result.data.find(
        (item) => item._id === conversationId
      );

      setConversation(currentConversation);
    } catch (error) {
      console.log("Error while getting conversation:", error);
    }
  };

  const getMessages = async () => {
    try {
      let result = await axios.get(
        serverUrl + `/api/chat/messages/${conversationId}`,
        { withCredentials: true }
      );

      console.log("Messages:", result.data);

      setMessages(result.data);
    } catch (error) {
      console.log("Error while getting messages:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      return;
    }

    try {
      let result = await axios.post(
        serverUrl + "/api/chat/message",
        {
          conversationId,
          text
        },
        { withCredentials: true }
      );

      console.log("Message sent:", result.data);

      setText("");

      getMessages();
    } catch (error) {
      console.log("Error while sending message:", error);
    }
  };

  useEffect(() => {
    getConversation();
    getMessages();

    const interval = setInterval(() => {
      getMessages();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [conversationId]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  let otherUser = conversation?.participants?.find(
    (participant) => participant._id !== userData?._id
  );

  return (
    <div className="w-full h-screen bg-blue-50 overflow-hidden">
      <Nav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-[calc(100vh-75px)]">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 font-medium hover:text-blue-800"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[calc(100%-40px)] flex flex-col">

          {/* Chat Header */}
          <div className="bg-blue-600 text-white px-5 py-4 flex-shrink-0">
            <h1 className="text-lg sm:text-xl font-semibold">
              {otherUser?.name || "Chat"}
            </h1>

            <p className="text-sm text-blue-100 mt-1 truncate">
              {conversation?.listing?.title || "Listing"}
            </p>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6"
          >
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">
                  No messages yet.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">

                {messages.map((message) => {
                  let isMyMessage =
  String(message.sender) === String(userData?._id);

                  return (
                    <div
                      key={message._id}
                      className={`flex ${
                        isMyMessage
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-xl p-3 max-w-[80%] ${
                          isMyMessage
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="break-words">
                          {message.text}
                        </p>

                        <p
                          className={`text-xs mt-1 ${
                            isMyMessage
                              ? "text-blue-100"
                              : "text-gray-400"
                          }`}
                        >
                          {new Date(
                            message.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}

              </div>
            )}
          </div>

          {/* Message Input */}
          <form
            onSubmit={sendMessage}
            className="border-t border-gray-200 p-4 flex flex-col sm:flex-row gap-3 flex-shrink-0"
          >
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition mb-8 sm:mb-0"
            >
              Send
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Chat;