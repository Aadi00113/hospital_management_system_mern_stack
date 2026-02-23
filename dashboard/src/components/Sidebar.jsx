import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const location = useLocation();

  const handleLogout = async () => {
    await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/admin/logout`, { withCredentials: true })
      .then((res) => { toast.success(res.data.message); setIsAuthenticated(false); })
      .catch((err) => { toast.error(err.response.data.message); });
  };

  const navigateTo = useNavigate();

  const navItems = [
    { icon: <TiHome className="text-2xl" />, path: "/", title: "Dashboard" },
    { icon: <FaUserDoctor className="text-xl" />, path: "/doctors", title: "Doctors" },
    { icon: <MdAddModerator className="text-xl" />, path: "/admin/addnew", title: "Add Admin" },
    { icon: <IoPersonAddSharp className="text-xl" />, path: "/doctor/addnew", title: "Add Doctor" },
    { icon: <AiFillMessage className="text-xl" />, path: "/messages", title: "Messages" },
  ];

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden xl:flex fixed top-0 left-0 h-full w-[80px] bg-theme-sidebar flex-col items-center py-8 gap-2 z-30 shadow-2xl">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6">
          <span className="text-white font-black text-lg">Z</span>
        </div>
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <button key={i} onClick={() => navigateTo(item.path)} title={item.title}
              className={`relative group w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200
                ${isActive ? "bg-white text-theme-secondary shadow-lg" : "text-white/70 hover:bg-white/15 hover:text-white"}`}>
              {item.icon}
              <span className="absolute left-14 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {item.title}
              </span>
            </button>
          );
        })}
        <div className="flex-1" />
        <button onClick={handleLogout} title="Logout"
          className="group relative w-12 h-12 rounded-xl flex items-center justify-center text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200">
          <RiLogoutBoxFill className="text-xl" />
          <span className="absolute left-14 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">Logout</span>
        </button>
      </aside>

      {/* Mobile top bar */}
      <div className="xl:hidden fixed top-0 left-0 right-0 z-40 bg-theme-sidebar flex items-center justify-between px-5 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">N</span>
          </div>
          <span className="text-white font-bold text-lg">Nexora Health</span>
        </div>
        <button onClick={() => setShow(!show)} className="text-white text-2xl">
          {show ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile overlay */}
      {show && (
        <div className="xl:hidden fixed inset-0 z-30 bg-theme-sidebar flex flex-col items-center justify-center gap-6 pt-16">
          {navItems.map((item, i) => (
            <button key={i} onClick={() => { navigateTo(item.path); setShow(false); }}
              className="flex items-center gap-4 text-white/80 hover:text-white text-xl font-semibold transition-colors px-8 py-3 rounded-xl hover:bg-white/10 w-64">
              {item.icon}{item.title}
            </button>
          ))}
          <button onClick={() => { handleLogout(); setShow(false); }}
            className="flex items-center gap-4 text-red-300 hover:text-red-200 text-xl font-semibold px-8 py-3 rounded-xl hover:bg-white/10 w-64 mt-4">
            <RiLogoutBoxFill className="text-xl" />Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
