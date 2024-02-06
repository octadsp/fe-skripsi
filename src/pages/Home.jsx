import React, { useContext } from "react";

import AdminPage from "../pages/Admin/HomePage";
import UserPage from "../pages/User/LandingPage";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Home() {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      {state.isLogin ? (
        state?.user.roles == "Super Admin" ||
        state?.user.roles == "Service Advisor" ? (
          <div>
            <AdminPage />
          </div>
        ) : (
          <UserPage />
        )
      ) : (
        <UserPage />
      )}
    </>
  );
}

export default Home;
