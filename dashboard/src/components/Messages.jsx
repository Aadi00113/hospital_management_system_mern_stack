import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { AiFillMessage } from "react-icons/ai";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/message/getall`, { withCredentials: true });
        setMessages(data.messages);
      } catch (error) { console.log(error.response.data.message); }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <section className="ml-0 xl:ml-[80px] bg-gray-100 min-h-screen pt-16 xl:pt-0">
      <div className="p-6 xl:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Patient Messages</h1>
          <p className="text-gray-500 mt-1">{messages.length} message{messages.length !== 1 ? "s" : ""} received</p>
        </div>
        {messages && messages.length > 0 ? (
          <div className="flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={msg._id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-theme-gradient flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {msg.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h4 className="font-bold text-gray-900 text-base">{msg.firstName} {msg.lastName}</h4>
                      <span className="text-xs text-gray-400">Message #{i + 1}</span>
                    </div>
                    <div className="flex gap-4 mt-1 text-sm text-gray-400 flex-wrap">
                      <span>📧 {msg.email}</span>
                      <span>📞 {msg.phone}</span>
                    </div>
                    <p className="mt-3 text-gray-600 bg-gray-50 rounded-xl px-4 py-3 text-sm leading-relaxed border-l-4 border-theme">
                      "{msg.message}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <AiFillMessage className="text-6xl text-gray-200 mb-4" />
            <p className="text-xl font-semibold">No Messages Yet</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Messages;
