import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// ADMIN PAGE
import AuthPage from "./pages/Admin/AuthPage";
import HomePage from "./pages/Admin/HomePage";

// USER PAGE
import Home from "./pages/Home";
import HomeIndo from "./pages/HomeIndo";
import ReservationPage from "./pages/User/ReservationPage";
import ReservationPageIndo from "./pages/User/ReservationPageIndo";
import ProfilePage from "./pages/User/ProfilePage";
import ProfilePageIndo from "./pages/User/ProfilePageIndo";
import LandingPage from "./pages/User/LandingPage";
import LandingPageIndo from "./pages/User/LandingPageIndo";
import DetailReservation from "./pages/User/Components/DetailReservation";
import DetailReservationIndo from "./pages/User/Components/DetailReservationIndo";

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
import DemageCategories from "./pages/Admin/pages/DemageCategories";
import DemageSubCategories from "./pages/Admin/pages/DemageSubCategories";
import PriceList from "./pages/Admin/pages/PriceList";
import CompanyPartners from "./pages/Admin/pages/CompanyPartners";
import CompanyServices from "./pages/Admin/pages/CompanyServices";
import AddPriceList from "./pages/Admin/pages/AddPriceList";
import Laporan from "./pages/Admin/pages/Laporan";
import { LanguageContext } from "./context/useLanguage";

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { state: languageState } = useContext(LanguageContext);

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
    // Redirect jika pengguna belum login dan isLoading adalah false
    if (!isLoading && !state.isLogin) {
      // Cek bahasa yang dipilih
      if (languageState.language === "indonesian") {
        navigate("/id");
      } else {
        navigate("/");
      }
    }
  }, [isLoading, state.isLogin, navigate, languageState.language]);

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/id" element={<HomeIndo />} />
          <Route element={<PrivateRouteAdmin />}>
            <Route exact path="/admin-page" element={<HomePage />} />
            <Route exact path="/admin" element={<AuthPage />} />
          </Route>
          <Route element={<PrivateRouteUser />}>
            <Route exact path="/landing-page" element={<LandingPage />} />
            <Route
              exact
              path="/landing-page/id"
              element={<LandingPageIndo />}
            />
            <Route
              exact
              path="/reservation-page"
              element={<ReservationPage />}
            />
            <Route
              exact
              path="/reservation-page/id"
              element={<ReservationPageIndo />}
            />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/profile/id" element={<ProfilePageIndo />} />
            <Route
              exact
              path="/detail-reservation/:id"
              element={<DetailReservation />}
            />
            <Route
              exact
              path="/detail-reservation/:id/id"
              element={<DetailReservationIndo />}
            />
          </Route>
          <Route element={<PrivateRouteVisible />}>
            <Route exact path="/add-car-brand" element={<AddCarBrand />} />
            <Route exact path="/add-car-type" element={<AddCarType />} />
            <Route exact path="/add-car-class" element={<AddCarClass />} />
            <Route exact path="/add-price_lists" element={<AddPriceList />} />
            <Route exact path="/laporan" element={<Laporan />} />
            <Route
              exact
              path="/reservation-list"
              element={<ReservationList />}
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
