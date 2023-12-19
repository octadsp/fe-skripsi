import React, { useState, useEffect, userContext, useContext } from "react";
import Logo from "../../assets/logo.png";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import CarBrand from "../Admin/pages/AddCarBrand";
import CarType from "../Admin/pages/AddCarType";
import CarClass from "../Admin/pages/AddCarClass";
import ReservationList from "../Admin/pages/ReservationList";
import Homes from "../Admin/pages/Homes";
import DemageListCategories from "../Admin/pages/DemageListCategories";
import DemageCategories from "../Admin/pages/DemageCategories";
import DemageSubCategories from "../Admin/pages/DemageSubCategories";
import PriceLists from "../Admin/pages/PriceList";
import CompanyPartners from "../Admin/pages/CompanyPartners";
import CompanyServices from "../Admin/pages/CompanyServices";

import { UserContext } from "../../context/userContext";

const pages = [
  {
    type: "Homes",
    name: "Homes",
    path: "homes",
    component: <Homes />,
  },
  {
    type: "Masters",
    name: "Car Brand",
    path: "add-car-brand",
    component: <CarBrand />,
  },
  {
    type: "Masters",
    name: "Car Type",
    path: "add-car-type",
    component: <CarType />,
  },
  {
    type: "Masters",
    name: "Car Class",
    path: "add-car-class",
    component: <CarClass />,
  },
  {
    type: "Reservations",
    name: "List",
    path: "reservation-list",
    component: <ReservationList />,
  },
  {
    type: "Demage Cars",
    name: "List Categories",
    path: "demage-list-categories",
    component: <DemageListCategories />,
  },
  {
    type: "Demage Cars",
    name: "Categories",
    path: "demage-categories",
    component: <DemageCategories />,
  },
  {
    type: "Demage Cars",
    name: "Sub Categories",
    path: "demage-sub-categories",
    component: <DemageSubCategories />,
  },
  {
    type: "Price List",
    name: "List",
    path: "price-list",
    component: <PriceLists />,
  },
  {
    type: "Companies",
    name: "Partner",
    path: "partner",
    component: <CompanyPartners />,
  },
  {
    type: "Companies",
    name: "Services",
    path: "services",
    component: <CompanyServices />,
  },
];

function HomePage() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage());
  const [state] = useContext(UserContext);

  function getCurrentPage() {
    const path = window.location.pathname.replace("/", "");
    const foundPage = pages.find((page) => page.path === path);
    return foundPage ? foundPage.path : "homes"; // Default to "homes" if the page is not found
  }

  useEffect(() => {
    // Mendengarkan perubahan URL
    const handleRouteChange = () => {
      setCurrentPage(getCurrentPage());
    };

    window.addEventListener("popstate", handleRouteChange);

    // Membersihkan listener ketika komponen di-unmount
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const changePage = (path) => {
    setCurrentPage(path);
    // Ganti URL tanpa mereload halaman
    window.history.pushState(null, null, `/${path}`);
  };

  return (
    <div className="flex w-screen h-screen bg-light-silver">
      <div className="bg-white w-64 float-left">
        <div className="flex justify-center py-7 mt-5 mb-10 bg-navBg text-white rounded-lg">
          <h1>
            Welcome, {state.user.fullname} {state.user.lastname} 😊
          </h1>
        </div>
        <Sidebar className="text-navBg border-t-2">
          {/* Masters */}
          <Menu
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            <SubMenu label="Masters">
              {pages
                .filter((page) => page.type === "Masters") // Filter only type "Masters"
                .map((page) => (
                  <MenuItem
                    key={page.path}
                    onClick={() => changePage(page.path)}
                    className={currentPage === page.path ? "active" : ""}
                  >
                    {page.name}
                  </MenuItem>
                ))}
            </SubMenu>
          </Menu>

          {/* Reservations */}
          <Menu
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            <SubMenu label="Reservations">
              {pages
                .filter((page) => page.type === "Reservations") // Filter only type "Masters"
                .map((page) => (
                  <MenuItem
                    key={page.path}
                    onClick={() => changePage(page.path)}
                    className={currentPage === page.path ? "active" : ""}
                  >
                    {page.name}
                  </MenuItem>
                ))}
            </SubMenu>
          </Menu>

          {/* Demage Cars */}
          <Menu
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            <SubMenu label="Demage Cars">
              {pages
                .filter((page) => page.type === "Demage Cars") // Filter only type "Masters"
                .map((page) => (
                  <MenuItem
                    key={page.path}
                    onClick={() => changePage(page.path)}
                    className={currentPage === page.path ? "active" : ""}
                  >
                    {page.name}
                  </MenuItem>
                ))}
            </SubMenu>
          </Menu>

          {/* Price List */}
          <Menu
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            <SubMenu label="Price">
              {pages
                .filter((page) => page.type === "Price List") // Filter only type "Masters"
                .map((page) => (
                  <MenuItem
                    key={page.path}
                    onClick={() => changePage(page.path)}
                    className={currentPage === page.path ? "active" : ""}
                  >
                    {page.name}
                  </MenuItem>
                ))}
            </SubMenu>
          </Menu>

          {/* Companies */}
          <Menu
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            <SubMenu label="Companies">
              {pages
                .filter((page) => page.type === "Companies") // Filter only type "Masters"
                .map((page) => (
                  <MenuItem
                    key={page.path}
                    onClick={() => changePage(page.path)}
                    className={currentPage === page.path ? "active" : ""}
                  >
                    {page.name}
                  </MenuItem>
                ))}
            </SubMenu>
          </Menu>
        </Sidebar>
      </div>
      <div className="w-full h-full flex p-3">
        <div className="bg-white overflow-y-auto w-full rounded-md">
          {pages
            .filter((page) => currentPage === page.path)
            .map((page) => (
              <div key={page.path}>{page.component}</div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
