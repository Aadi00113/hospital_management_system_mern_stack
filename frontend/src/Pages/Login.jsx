import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
          { email, password, confirmPassword, role: "Patient" },
          { withCredentials: true, headers: { "Content-Type": "application/json" } })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail(""); setPassword(""); setConfirmPassword("");
        });
    } catch (error) { toast.error(error.response.data.message); }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  const inputCls = "w-full text-base px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none ring-theme focus:bg-white placeholder-gray-400 transition-all";

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-theme-light px-6 pt-20">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-theme-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">🔐</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900">Welcome Back</h2>
              <p className="text-gray-400 mt-2 text-base">Sign in to manage your appointments</p>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-1.5 block">Email Address</label>
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-1.5 block">Password</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-1.5 block">Confirm Password</label>
                <input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputCls} />
              </div>
              <div className="flex justify-end items-center gap-2 mt-1">
                <p className="text-gray-500 text-sm">Don't have an account?</p>
                <Link to={"/register"} className="text-theme-primary font-bold text-sm no-underline hover:text-theme-dark transition-colors">
                  Register Now
                </Link>
              </div>
              <button type="submit"
                className="w-full py-3.5 text-white font-bold text-lg rounded-xl bg-theme-gradient-r hover:opacity-90 transition-opacity mt-2">
                Sign In →
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
