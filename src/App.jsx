import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// ADMIN PAGE
import AuthPage from "./pages/Admin/AuthPage";
import HomePage from "./pages/Admin/HomePage";

// USER PAGE
import Home from "./pages/Home";
import ReservationPage from "./pages/User/ReservationPage";
import ProfilePage from "./pages/User/ProfilePage";
import LandingPage from "./pages/User/LandingPage";

// API CONFIG
import { API, setAuthToken } from "./config/api";

// UserContext
import { UserContext } from "./context/userContext";
import {
  PrivateRouteAdmin,
  PrivateRouteUser,
} from "./components/Fragments/PrivateRoute";

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log("check user success : ", response);
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route element={<PrivateRouteAdmin />}>
            <Route exact path="/admin-page" element={<HomePage />} />
            <Route exact path="/admin" element={<AuthPage />} />
          </Route>
          <Route element={<PrivateRouteUser />}>
            <Route exact path="/landing-page" element={<LandingPage />} />
            <Route
              exact
              path="/reservation-page"
              element={<ReservationPage />}
            />
            <Route exact path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
