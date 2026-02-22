import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="px-6 xl:px-24 py-20 bg-white">
        <div className="flex gap-16 flex-col md:flex-row items-center">
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-theme-medium rounded-3xl rotate-3 opacity-60"></div>
              <img src={imageUrl} alt="About Nexora Health"
                className="relative rounded-3xl max-w-sm w-full object-cover shadow-xl" />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <span className="inline-flex items-center gap-2 bg-theme-light text-theme-dark px-4 py-1.5 rounded-full text-sm font-semibold w-fit">
              🩺 About Us
            </span>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">Who We Are</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Nexora Health was founded with a single mission — to make quality healthcare
              accessible to everyone. With over a decade of excellence, we have grown into one of the
              most trusted medical institutes in the region.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed">
              Our team of 50+ board-certified specialists covers everything from general medicine to
              complex surgical procedures, ensuring you receive the best care possible under one roof.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { icon: "✅", text: "Board-Certified Doctors" },
                { icon: "🔬", text: "Advanced Diagnostics" },
                { icon: "💊", text: "Comprehensive Treatment" },
                { icon: "❤️", text: "Patient-First Approach" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700 font-medium">
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Biography;
