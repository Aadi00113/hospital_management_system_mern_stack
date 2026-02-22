import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/user/doctors", { withCredentials: true });
        setDoctors(data.doctors);
      } catch (error) { toast.error(error.response.data.message); }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <section className="ml-0 xl:ml-[80px] bg-gray-100 min-h-screen pt-16 xl:pt-0">
      <div className="p-6 xl:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Registered Doctors</h1>
          <p className="text-gray-500 mt-1">{doctors.length} doctor{doctors.length !== 1 ? "s" : ""} on record</p>
        </div>
        {doctors && doctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="relative h-52 bg-theme-light overflow-hidden">
                  <img src={doctor.docAvatar && doctor.docAvatar.url} alt={doctor.firstName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h4 className="text-gray-900 font-bold text-lg">Dr. {doctor.firstName} {doctor.lastName}</h4>
                  <span className="inline-block mt-1 mb-3 px-2.5 py-0.5 bg-theme-light text-theme-secondary text-xs font-semibold rounded-full">
                    {doctor.doctorDepartment}
                  </span>
                  <div className="flex flex-col gap-1 text-sm text-gray-500">
                    <p>📧 {doctor.email}</p>
                    <p>📞 {doctor.phone}</p>
                    <p>🎂 {doctor.dob?.substring(0, 10)}</p>
                    <p>🪪 Aadhar: {doctor.nic}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FaUserDoctor className="text-6xl text-gray-200 mb-4" />
            <p className="text-xl font-semibold">No Doctors Registered Yet</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Doctors;
