import React from "react";
import Logo from "../assets/logo.png";
import BgImage from "../assets/bengkel.jpg";
import Register from "../components/Fragments/Register";

function LandingPage() {
  return (
    <div className="w-full h-screen flex">
      <div
        className="w-full h-screen bg-fixed bg-cover blur-sm"
        style={{ backgroundImage: `url(${BgImage})` }}
      ></div>
      <div className="flex justify-center items-center w-4/6 bg-white">
        <Register/>
      </div>
    </div>
  );
}

export default LandingPage;
