import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/admin/addnew`,
          { firstName, lastName, email, phone, nic, dob, gender, password },
          { withCredentials: true, headers: { "Content-Type": "application/json" } })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName(""); setLastName(""); setEmail(""); setPhone("");
          setNic(""); setDob(""); setGender(""); setPassword("");
        });
    } catch (error) { toast.error(error.response.data.message); }
  };

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  const inputCls = "flex-1 text-base px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none ring-theme focus:bg-white placeholder-gray-400 transition-all";
  const Label = ({ children }) => <label className="text-sm font-semibold text-gray-600 mb-1.5 block">{children}</label>;

  return (
    <section className="ml-0 xl:ml-[80px] bg-gray-100 min-h-screen pt-16 xl:pt-0">
      <div className="p-6 xl:p-10 flex flex-col items-center gap-6">
        <img src="/nexora health.svg" alt="logo" className="w-44" />
        <h1 className="text-3xl font-black text-gray-900">ADD NEW ADMIN</h1>
        <form onSubmit={handleAddNewAdmin} className="flex flex-col gap-5 w-full max-w-2xl">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1"><Label>First Name</Label><input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} /></div>
            <div className="flex-1"><Label>Last Name</Label><input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} /></div>
          </div>
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1"><Label>Email Address</Label><input type="email" placeholder="admin@zeecare.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></div>
            <div className="flex-1"><Label>Phone Number</Label><input type="number" placeholder="9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} /></div>
          </div>
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1"><Label>Aadhar Number</Label><input type="number" placeholder="1234 5678 9012" value={nic} onChange={(e) => setNic(e.target.value)} className={inputCls} /></div>
            <div className="flex-1"><Label>Date of Birth</Label><input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={inputCls} /></div>
          </div>
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1"><Label>Gender</Label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputCls}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="flex-1"><Label>Password</Label><input type="password" placeholder="Min. 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} /></div>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="px-9 py-3.5 text-white font-bold text-lg rounded-xl bg-theme-gradient-r hover:opacity-90 transition-opacity">
              ADD NEW ADMIN
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewAdmin;
