import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/api/v1/message/send",
          { firstName, lastName, email, phone, message },
          { withCredentials: true, headers: { "Content-Type": "application/json" } })
        .then((res) => {
          toast.success(res.data.message);
          setFirstName(""); setLastName(""); setEmail(""); setPhone(""); setMessage("");
        });
    } catch (error) { toast.error(error.response.data.message); }
  };

  const inputCls = "flex-1 text-base px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none ring-theme placeholder-gray-400 transition-all";

  return (
    <>
      <div className="px-6 xl:px-24 py-20 bg-theme-light">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-white text-theme-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              💬 Get In Touch
            </span>
            <h2 className="text-4xl font-black text-gray-900 mb-3">Send Us A Message</h2>
            <p className="text-gray-500 text-lg">Have questions? Our team typically responds within a few hours.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <form onSubmit={handleMessage} className="flex flex-col gap-5">
              <div className="flex gap-4 flex-col sm:flex-row">
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} />
              </div>
              <div className="flex gap-4 flex-col sm:flex-row">
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
                <input type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
              </div>
              <textarea rows={5} placeholder="Write your message here..." value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-base px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none ring-theme placeholder-gray-400 resize-none transition-all" />
              <button type="submit"
                className="w-full py-3.5 text-white font-bold text-lg rounded-xl bg-theme-gradient-r hover:opacity-90 transition-opacity">
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageForm;
