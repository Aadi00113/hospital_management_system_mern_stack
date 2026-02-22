import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    { name: "Pediatrics", imageUrl: "/departments/pedia.jpg", desc: "Expert care for children of all ages" },
    { name: "Orthopedics", imageUrl: "/departments/ortho.jpg", desc: "Bone, joint & muscle specialists" },
    { name: "Cardiology", imageUrl: "/departments/cardio.jpg", desc: "Advanced heart & vascular care" },
    { name: "Neurology", imageUrl: "/departments/neuro.jpg", desc: "Brain & nervous system treatment" },
    { name: "Oncology", imageUrl: "/departments/onco.jpg", desc: "Comprehensive cancer care" },
    { name: "Radiology", imageUrl: "/departments/radio.jpg", desc: "State-of-the-art imaging diagnostics" },
    { name: "Physical Therapy", imageUrl: "/departments/therapy.jpg", desc: "Rehabilitation & recovery programs" },
    { name: "Dermatology", imageUrl: "/departments/derma.jpg", desc: "Skin, hair & nail specialists" },
    { name: "ENT", imageUrl: "/departments/ent.jpg", desc: "Ear, nose & throat treatment" },
  ];

  const responsive = {
    extraLarge: { breakpoint: { max: 3000, min: 1324 }, items: 4, slidesToSlide: 1 },
    large: { breakpoint: { max: 1324, min: 1005 }, items: 3, slidesToSlide: 1 },
    medium: { breakpoint: { max: 1005, min: 700 }, items: 2, slidesToSlide: 1 },
    small: { breakpoint: { max: 700, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  return (
    <>
      <div className="px-6 xl:px-24 py-20 bg-gray-50">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-theme-light text-theme-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            🏥 Our Specialties
          </span>
          <h2 className="text-4xl font-black text-gray-900 mb-3">Medical Departments</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            World-class specialists across all major medical disciplines, all under one roof.
          </p>
        </div>
        <Carousel responsive={responsive} removeArrowOnDeviceType={["tablet", "mobile"]}>
          {departmentsArray.map((depart, index) => (
            <div key={index}
              className="relative rounded-2xl flex flex-col justify-end min-h-[380px] mx-2 overflow-hidden group cursor-pointer shadow-md">
              <img src={depart.imageUrl} alt={depart.name}
                className="absolute w-full h-full object-cover top-0 left-0 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="relative z-10 p-5">
                <p className="text-white font-black text-xl uppercase tracking-wide">{depart.name}</p>
                <p className="text-gray-300 text-sm mt-1">{depart.desc}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;
