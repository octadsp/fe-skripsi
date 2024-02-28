import React, { useContext } from "react";
import { BsArrowLeft } from "react-icons/bs";
import AvatarProfile from "../../../components/Elements/AvatarProfile";
import logoGuns from "../../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { FaUser, FaHome } from "react-icons/fa";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

function HeaderReservationIndo() {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout success! 👌");
    // Back to Landing Page
    window.location.reload();
  };

  return (
    <>
      <header className="bg-navBg py-1 text-light-silver w-full sticky top-0">
        <div className="mx-5 flex justify-between items-center">
          <Link to={"/landing-page"} className="flex flex-row w-32">
            <img src={logoGuns} />
          </Link>
          <nav>
            <ul className="flex space-x-3">
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
                        <FaHome />
                      </span>
                      <Link to={"/landing-page/id"}>Beranda</Link>
                    </div>
                  </li>
                  <div className="ring-1 ring-light-silver"></div>
                  <li>
                    <div className="flex gap-3">
                      <span>
                        <HiArrowLeftOnRectangle />
                      </span>
                      <button onClick={handleLogout}>Keluar</button>
                    </div>
                  </li>
                </ul>
              </div>
            </ul>
          </nav>
        </div>
      </header>
      <header className="flex justify-between bg-light-gray py-1 text-light-silver w-full">
        <div className="mx-5 items-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-sm my-2 border-none ring-1 ring-navBg/20 hover:bg-light-silver/70 shadow-xl rounded-full bg-white text-navBg"
          >
            <span>
              <BsArrowLeft />
            </span>
            kembali
          </button>
        </div>
      </header>
    </>
  );
}

export default HeaderReservationIndo;
