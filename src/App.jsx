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
        <Route exact path="/auth-admin" element={<AuthPage />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/reservation-page" element={<ReservationPage/>}/>
        <Route exact path="/profile" element={<ProfilePage/>}/>
        <Route exact path="/admin-page" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
