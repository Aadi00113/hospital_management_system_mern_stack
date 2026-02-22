import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:5000/api/v1/user/patient/logout", { withCredentials: true })
      .then((res) => { toast.success(res.data.message); setIsAuthenticated(false); })
      .catch((err) => { toast.error(err.response.data.message); });
  };

  const navigateTo = useNavigate();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/appointment", label: "Appointment" },
    { to: "/about", label: "About Us" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="px-6 xl:px-24 py-4 flex items-center justify-between">
          <Link to="/"><img src="/nexora health.svg" alt="Nexora Health Logo" className="w-36" /></Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}
                className="text-gray-600 font-semibold text-base hover:text-theme-primary transition-colors duration-200 no-underline">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <button onClick={handleLogout}
                className="px-6 py-2.5 text-white font-bold rounded-full text-sm bg-theme-gradient-r hover:opacity-90 transition-opacity">
                Logout
              </button>
            ) : (
              <button onClick={() => navigateTo("/login")}
                className="px-6 py-2.5 text-white font-bold rounded-full text-sm bg-theme-gradient-r hover:opacity-90 transition-opacity">
                Sign In
              </button>
            )}
          </div>

          <button className="lg:hidden text-gray-700 text-2xl" onClick={() => setShow(!show)}>
            {show ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </nav>

      {show && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 lg:hidden">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setShow(false)}
              className="text-gray-800 text-2xl font-bold no-underline hover:text-theme-primary transition-colors">
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <button onClick={() => { handleLogout(); setShow(false); }}
              className="px-8 py-3 text-white font-bold rounded-full text-lg bg-theme-gradient-r">
              Logout
            </button>
          ) : (
            <button onClick={() => { navigateTo("/login"); setShow(false); }}
              className="px-8 py-3 text-white font-bold rounded-full text-lg bg-theme-gradient-r">
              Sign In
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
