import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Intro = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out animation after 2.5s
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    //redirect
    const timer = setTimeout(() => {
      navigate("/home"); // Change to the desired route
    }, 4000);

    return () =>{
      clearTimeout(timer); // Cleanup timer on unmount
      clearTimeout(fadeTimer);
    } 
  }, [navigate]);


  return (

    <div
      className={`transition-opacity duration-[2000ms] fixed h-screen w-screen ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="bg-black" >
        <div className="horizontal text-[#ffffff] flex items-center justify-center h-screen">
          <div className="writing-vertical-lr text-5xl font-bold">
            <div className="first-letter:text-[#359BD2]">Availability</div>
            <div className="first-letter:text-[#359BD2]">Visionary</div>
            <div className="first-letter:text-[#359BD2]">Immediate</div>
            <div className="first-letter:text-[#359BD2]">Life-Saving</div>
            <div className="first-letter:text-[#359BD2]">Analytical</div>
            <div className="first-letter:text-[#359BD2]">
              Mining software for
            </div>
            <div>
              <span className="text-[#359BD2]">BH</span>arat
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
