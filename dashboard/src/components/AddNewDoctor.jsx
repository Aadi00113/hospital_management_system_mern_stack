import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const navigateTo = useNavigate();

  const departmentsArray = ["Pediatrics", "Orthopedics", "Cardiology", "Neurology", "Oncology", "Radiology", "Physical Therapy", "Dermatology", "ENT"];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => { setDocAvatarPreview(reader.result); setDocAvatar(file); };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctor/addnew`, formData,
          { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
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

  const inputCls = "w-full text-base px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none ring-theme focus:bg-white placeholder-gray-400 transition-all";
  const Label = ({ children }) => <label className="text-sm font-semibold text-gray-600 mb-1.5 block">{children}</label>;

  return (
    <section className="ml-0 xl:ml-[80px] bg-gray-100 min-h-screen pt-16 xl:pt-0">
      <div className="p-6 xl:p-10 flex flex-col items-center gap-6">
        <img src="/nexora health.svg" alt="logo" className="w-44" />
        <h1 className="text-3xl font-black text-gray-900">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleAddNewDoctor} className="w-full max-w-4xl">
          <div className="flex gap-8 flex-col lg:flex-row">
            <div className="flex-1">
              <img src={docAvatarPreview ? docAvatarPreview : "/docHolder.jpg"} alt="Doctor Avatar"
                className="w-full h-[515px] object-cover mb-5 rounded-2xl lg:h-auto" />
              <input type="file" onChange={handleAvatar} className="w-full py-2 text-sm text-gray-500" />
            </div>
            <div className="flex-[2] flex flex-col gap-5">
              <div><Label>First Name</Label><input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} /></div>
              <div><Label>Last Name</Label><input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} /></div>
              <div><Label>Email Address</Label><input type="email" placeholder="doctor@zeecare.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></div>
              <div><Label>Phone Number</Label><input type="number" placeholder="9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} /></div>
              <div><Label>Aadhar Number</Label><input type="number" placeholder="1234 5678 9012" value={nic} onChange={(e) => setNic(e.target.value)} className={inputCls} /></div>
              <div><Label>Date of Birth</Label><input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={inputCls} /></div>
              <div><Label>Gender</Label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputCls}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div><Label>Password</Label><input type="password" placeholder="Min. 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} /></div>
              <div><Label>Department</Label>
                <select value={doctorDepartment} onChange={(e) => setDoctorDepartment(e.target.value)} className={inputCls}>
                  <option value="">Select Department</option>
                  {departmentsArray.map((d, i) => <option value={d} key={i}>{d}</option>)}
                </select>
              </div>
              <button type="submit" className="py-3.5 text-white font-bold text-lg rounded-xl bg-theme-gradient-r hover:opacity-90 transition-opacity mb-8">
                Register New Doctor
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;
