import logoGuns from "../../../assets/logo.png";
import ModalUserLogin from "../../../components/Fragments/ModalUserLogin";
import ModalUserRegister from "../../../components/Fragments/ModalUserRegister";
import AvatarProfile from "../../../components/Elements/AvatarProfile";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

import { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";

const Header = () => {
  const [state] = useContext(UserContext);

  const handleReservClick = (e) => {
    document.getElementById("modalAlert").close();
    document.getElementById("modalLogin").showModal();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout success! 👌");
    // Back to Landing Page
    window.location.reload();
  };

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
                  <div className="dropdown dropdown-hover dropdown-end">
                    <div tabIndex={0} role="button">
                      <AvatarProfile width={40} state={state} />
                    </div>
                    <ul
                      tabIndex={0}
                      className="text-navBg dropdown-content gap-1 z-[1] menu  p-2 shadow bg-white rounded-box w-28"
                    >
                      <li>
                        <div className="flex gap-3">
                          <span>
                            <FaUser />
                          </span>
                          <Link to={"/profile"}>Profile</Link>
                        </div>
                      </li>
                      <div className="ring-1 ring-light-silver"></div>
                      <li>
                        <div className="flex gap-3">
                          <span>
                            <HiArrowLeftOnRectangle />
                          </span>
                          <button onClick={handleLogout}>Logout</button>
                        </div>
                      </li>
                    </ul>
                  </div>
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
                  {/* <Link to={"/reservation-page"} className="">
                    Reservations
                  </Link> */}
                  <button
                    className=""
                    onClick={() =>
                      document.getElementById("modalAlert").showModal()
                    }
                  >
                    Reservations
                  </button>
                </li>

                {/* MODAL ALERT */}
                <dialog id="modalAlert" className="modal text-navBg">
                  <div className="modal-box bg-white">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">Oops!</h3>
                    <p className="py-4">
                      Anda belum login, apakah anda ingin login?
                    </p>
                    <div className="flex items-center gap-2 justify-end">
                      <div>
                        <form method="dialog">
                          {/* if there is a button, it will close the modal */}
                          <button className="hover:shadow hover:bg-navBg/10 hover:rounded-lg px-5 py-1 text-lg">
                            No
                          </button>
                        </form>
                      </div>
                      <div>
                        <button
                          className="bg-lightGreen hover:bg-textSuccess rounded-lg px-5 py-1 text-lg"
                          onClick={() => handleReservClick()}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </dialog>
                {/* END */}

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
