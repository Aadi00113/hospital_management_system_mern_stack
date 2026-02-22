import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="flex gap-16 px-6 xl:px-24 pt-36 pb-28 relative flex-col md:flex-row hero-bg">
        <div className="flex-1 flex flex-col justify-center gap-8">
          <div className="inline-flex items-center gap-2 bg-theme-light text-theme-dark px-4 py-1.5 rounded-full text-sm font-semibold w-fit">
            🏥 Trusted Healthcare Provider
          </div>
          <h1 className="text-4xl lg:text-5xl font-black leading-tight text-gray-900">{title}</h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
            Experience world-class medical care from the comfort of your home.
            Our board-certified doctors are available 24/7 to provide expert
            consultations, diagnoses, and personalized treatment plans.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="/appointment"
              className="px-7 py-3 bg-theme-gradient-r text-white font-bold rounded-full text-base hover:opacity-90 transition-opacity no-underline">
              Book Appointment
            </a>
            <a href="/about"
              className="px-7 py-3 border-2 border-theme text-theme-primary font-bold rounded-full text-base hover:bg-theme-light transition-colors no-underline">
              Learn More
            </a>
          </div>
          <div className="flex gap-8 pt-2 flex-wrap">
            <div>
              <p className="text-2xl font-black text-theme-dark">10K+</p>
              <p className="text-gray-500 text-sm">Happy Patients</p>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div>
              <p className="text-2xl font-black text-theme-dark">50+</p>
              <p className="text-gray-500 text-sm">Specialist Doctors</p>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div>
              <p className="text-2xl font-black text-theme-dark">24/7</p>
              <p className="text-gray-500 text-sm">Support Available</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img src={imageUrl} alt="hero" className="animate-float max-w-full drop-shadow-2xl" />
        </div>
      </div>
    </>
  );
};

export default Hero;
