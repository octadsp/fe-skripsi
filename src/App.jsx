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
  PrivateRouteVisible,
} from "./components/Fragments/PrivateRoute";
import AddCarBrand from "./pages/Admin/pages/AddCarBrand";
import AddCarType from "./pages/Admin/pages/AddCarType";
import AddCarClass from "./pages/Admin/pages/AddCarClass";
import ReservationList from "./pages/Admin/pages/ReservationList";
import DemageListCategories from "./pages/Admin/pages/DemageListCategories";
import DemageCategories from "./pages/Admin/pages/DemageCategories";
import DemageSubCategories from "./pages/Admin/pages/DemageSubCategories";
import PriceList from "./pages/Admin/pages/PriceList";
import CompanyPartners from "./pages/Admin/pages/CompanyPartners";
import CompanyServices from "./pages/Admin/pages/CompanyServices";

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
          <Route element={<PrivateRouteVisible />}>
            <Route exact path="/add-car-brand" element={<AddCarBrand />} />
            <Route exact path="/add-car-type" element={<AddCarType />} />
            <Route exact path="/add-car-class" element={<AddCarClass />} />
            <Route
              exact
              path="/reservation-list"
              element={<ReservationList />}
            />
            <Route
              exact
              path="/demage-list-categories"
              element={<DemageListCategories />}
            />
            <Route
              exact
              path="/demage-categories"
              element={<DemageCategories />}
            />
            <Route
              exact
              path="/demage-sub-categories"
              element={<DemageSubCategories />}
            />
            <Route exact path="/price-list" element={<PriceList />} />
            <Route exact path="/partner" element={<CompanyPartners />} />
            <Route exact path="/services" element={<CompanyServices />} />
            <Route
              exact
              path="/reservation-list"
              element={<ReservationList />}
            />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
