import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
          { email, password, role: "Admin" },
          { withCredentials: true, headers: { "Content-Type": "application/json" } })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail(""); setPassword("");
        });
    } catch (error) { toast.error(error.response.data.message); }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  const inputCls = "w-full text-base px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none ring-theme focus:bg-white placeholder-gray-400 transition-all";

  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center bg-theme-light px-6">
        <div className="bg-white rounded-3xl p-10 w-full max-w-lg shadow-2xl flex flex-col items-center gap-6">
          <img src="/nexora health.svg" alt="logo" className="w-44" />
          <div className="text-center">
            <h1 className="text-3xl font-black text-gray-900">Welcome to Nexora Health</h1>
            <p className="text-gray-500 text-base mt-2">Admin access only. Please sign in to continue.</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1.5 block">Email Address</label>
              <input type="email" placeholder="admin@nexorahealth.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1.5 block">Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
            </div>
            <div className="flex justify-center mt-2">
              <button type="submit" className="w-full py-3.5 text-white font-bold text-lg rounded-xl bg-theme-gradient-r hover:opacity-90 transition-opacity">
                Sign In →
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
