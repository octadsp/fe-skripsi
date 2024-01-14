import React from "react";
import BgImage from "../../assets/bengkel.jpg";
import Login from "../../components/Fragments/Login";

function AuthPage() {
  return (
    <div className="w-full h-screen flex">
      <div
        className="w-full h-screen bg-fixed bg-cover blur-sm"
        style={{ backgroundImage: `url(${BgImage})` }}
      ></div>
      <div className="flex justify-center items-center w-4/6 bg-white">
        {/* <Register/> */}
        <Login />
      </div>
    </div>
  );
}

export default AuthPage;
