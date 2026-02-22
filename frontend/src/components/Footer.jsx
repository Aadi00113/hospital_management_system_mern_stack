import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
    { id: 2, day: "Tuesday", time: "12:00 PM - 12:00 AM" },
    { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
    { id: 4, day: "Thursday", time: "9:00 AM - 9:00 PM" },
    { id: 5, day: "Friday", time: "3:00 PM - 9:00 PM" },
    { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="px-6 xl:px-24 py-16">
        <div className="flex flex-wrap gap-10 justify-between">
          <div className="min-w-[200px] max-w-[260px]">
            <img src="/nexora health.svg" alt="Nexora Health" className="w-40 mb-4 brightness-0 invert" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Nexora Health — delivering compassionate, world-class healthcare to every patient.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-bold mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {[{ to: "/", label: "Home" }, { to: "/appointment", label: "Book Appointment" }, { to: "/about", label: "About Us" }].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 no-underline hover:text-theme-primary transition-colors duration-300 text-sm">
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-bold mb-5">Working Hours</h4>
            <ul className="flex flex-col gap-2.5">
              {hours.map((el) => (
                <li key={el.id} className="flex gap-3 text-sm">
                  <span className="text-gray-400 w-28 shrink-0">{el.day}</span>
                  <span className="text-gray-300">{el.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-bold mb-5">Contact Us</h4>
            <div className="flex flex-col gap-4">
              {[
                { Icon: FaPhone, text: "+91 12345 67890" },
                { Icon: MdEmail, text: "contact@nexorahealth.com" },
                { Icon: FaLocationArrow, text: "Toronto, Canada" },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-theme-primary/20 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="text-theme-primary text-sm" />
                  </div>
                  <span className="text-gray-300 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 px-6 xl:px-24 py-5">
        <p className="text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} Nexora Health. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
