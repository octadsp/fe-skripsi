import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// ADMIN PAGE
import AuthPage from "./pages/Admin/AuthPage";
import HomePage from "./pages/Admin/HomePage";

// USER PAGE
import LandingPage from "./pages/User/LandingPage";
import ReservationPage from "./pages/User/ReservationPage";
import ProfilePage from "./pages/User/ProfilePage";


function App() {

  return (
    <>
      <Routes>
        <Route exact path="/auth" element={<AuthPage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/reservation-page" element={<ReservationPage/>}/>
        <Route exact path="/profile" element={<ProfilePage/>}/>
        <Route exact path="/landing-page" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
