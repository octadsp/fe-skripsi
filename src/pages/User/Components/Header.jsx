import logoGuns from "../../../assets/logo.png";
import ModalUserLogin from "../../../components/Fragments/ModalUserLogin";
import ModalUserRegister from "../../../components/Fragments/ModalUserRegister";
import AvatarProfile from "../../../components/Elements/AvatarProfile";
import { Link } from "react-router-dom";

import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";

const Header = () => {
  const [state] = useContext(UserContext);

  return (
    <>
      {state.isLogin ? (
        <header className="bg-navBg py-1 text-light-silver w-full sticky top-0">
          <div className="mx-5 flex justify-between items-center">
            <Link to={"/landing-page"} className="flex flex-row w-32">
              <img src={logoGuns} />
            </Link>
            <nav>
              <ul className="flex space-x-3">
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#herosection" className="">
                    Home
                  </a>
                </li>
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#aboutus" className=" ">
                    About Us
                  </a>
                </li>
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#servicesection" className=" ">
                    Service
                  </a>
                </li>
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#partnersection" className=" ">
                    Partners
                  </a>
                </li>
                {/* <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline"><a href="#testimonialsection" className=" ">Testimonials</a></li> */}
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <Link to={"/reservation-page"} className=" ">
                    Reservations
                  </Link>
                </li>
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#contactsection" className=" ">
                    Contacts
                  </a>
                </li>
                <li className="flex justify-center">
                  <AvatarProfile width={40} />
                </li>
              </ul>
            </nav>
          </div>
        </header>
      ) : (
        <header className="bg-navBg py-1 text-light-silver w-full sticky top-0">
          <div className="mx-5 flex justify-between items-center">
            <Link to={"/landing-page"} className="flex flex-row w-32">
              <img src={logoGuns} />
            </Link>
            <nav>
              <ul className="flex space-x-3">
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#herosection" className="">
                    Home
                  </a>
                </li>
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#aboutus" className=" ">
                    About Us
                  </a>
                </li>
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#servicesection" className=" ">
                    Service
                  </a>
                </li>
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#partnersection" className=" ">
                    Partners
                  </a>
                </li>
                {/* <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline"><a href="#testimonialsection" className=" ">Testimonials</a></li> */}
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <Link to={"/reservation-page"} className=" ">
                    Reservations
                  </Link>
                </li>
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#contactsection" className=" ">
                    Contacts
                  </a>
                </li>
                <li className="bg-white py-2 px-4 text-mikado-yellow font-semibold hover:bg-mikado-yellow hover:text-white  rounded-sm">
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className=""
                    onClick={() =>
                      document.getElementById("modalLogin").showModal()
                    }
                  >
                    Login
                  </button>
                  <ModalUserLogin />
                </li>
                <li className="bg-mikado-yellow p-2 text-white font-semibold hover:bg-white hover:text-mikado-yellow rounded-sm">
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className=" "
                    onClick={() =>
                      document.getElementById("modalRegister").showModal()
                    }
                  >
                    Register
                  </button>
                  <ModalUserRegister />
                </li>
              </ul>
            </nav>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
