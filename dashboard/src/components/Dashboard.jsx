import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCalendarCheck, FaUserDoctor } from "react-icons/fa6";
import { MdPendingActions } from "react-icons/md";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/appointment/getall", { withCredentials: true });
        setAppointments(data.appointments);
      } catch { setAppointments([]); }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/api/v1/appointment/update/${appointmentId}`, { status }, { withCredentials: true });
      setAppointments((prev) => prev.map((a) => (a._id === appointmentId ? { ...a, status } : a)));
      toast.success(data.message);
    } catch (error) { toast.error(error.response.data.message); }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) return <Navigate to={"/login"} />;

  const total = appointments.length;
  const pending = appointments.filter((a) => a.status === "Pending").length;
  const accepted = appointments.filter((a) => a.status === "Accepted").length;

  const statusBadge = (status) => {
    const base = "px-2.5 py-1 rounded-full text-xs font-bold";
    if (status === "Pending") return `${base} bg-yellow-100 text-yellow-700`;
    if (status === "Accepted") return `${base} bg-green-100 text-green-700`;
    return `${base} bg-red-100 text-red-700`;
  };

  return (
    <>
      <section className="ml-0 xl:ml-[80px] bg-gray-100 min-h-screen">
        <div className="p-6 xl:p-10 flex flex-col gap-6">

          {/* Welcome Banner */}
          <div className="bg-theme-sidebar rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 overflow-hidden relative">
            <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-[-30px] right-[120px] w-28 h-28 bg-white/10 rounded-full"></div>
            <img src="/doc.png" alt="Doctor" className="h-40 object-contain drop-shadow-xl relative z-10" />
            <div className="relative z-10 text-white">
              <p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-1">Admin Panel</p>
              <h2 className="text-3xl font-black mb-2">
                Welcome back, <span className="text-theme-accent">{admin && `${admin.firstName} ${admin.lastName}`}!</span>
              </h2>
              <p className="text-white/70 text-base max-w-md">
                Here's a quick overview of today's appointments and activity across Nexora Health.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: <FaCalendarCheck className="text-theme-secondary text-2xl" />, bg: "bg-theme-light", label: "Total Appointments", value: total },
              { icon: <MdPendingActions className="text-yellow-600 text-2xl" />, bg: "bg-yellow-100", label: "Pending", value: pending },
              { icon: <FaUserDoctor className="text-theme-accent text-2xl" />, bg: "bg-theme-light", label: "Accepted", value: accepted },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm">
                <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center shrink-0`}>{s.icon}</div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">{s.label}</p>
                  <p className="text-3xl font-black text-gray-900">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h5 className="text-xl font-black text-gray-900">Appointments</h5>
                <p className="text-gray-400 text-sm mt-0.5">{total} total records</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                    <th className="px-6 py-4 text-left font-semibold">Patient</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                    <th className="px-6 py-4 text-left font-semibold">Department</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Visited</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appointments && appointments.length > 0 ? appointments.map((a) => (
                    <tr key={a._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">{`${a.firstName} ${a.lastName}`}</td>
                      <td className="px-6 py-4 text-gray-500">{a.appointment_date.substring(0, 10)}</td>
                      <td className="px-6 py-4 text-gray-700">{`Dr. ${a.doctor.firstName} ${a.doctor.lastName}`}</td>
                      <td className="px-6 py-4 text-gray-500">{a.department}</td>
                      <td className="px-6 py-4">
                        <select className={`${statusBadge(a.status)} border-none outline-none cursor-pointer pr-2 appearance-none`}
                          value={a.status} onChange={(e) => handleUpdateStatus(a._id, e.target.value)}>
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        {a.hasVisited ? <GoCheckCircleFill className="text-green-500 text-xl" /> : <AiFillCloseCircle className="text-red-400 text-xl" />}
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <FaCalendarCheck className="text-4xl text-gray-200" />
                        <p className="text-base font-semibold">No Appointments Found</p>
                      </div>
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Dashboard;
