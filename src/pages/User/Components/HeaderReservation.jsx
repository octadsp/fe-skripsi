import React from "react";
import {BsArrowLeft} from "react-icons/bs"
import AvatarProfile from "../../../components/Elements/AvatarProfile"
import logoGuns from "../../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";

function HeaderReservation() {
  const navigate = useNavigate();
  return (
    <>
    <header className="bg-navBg py-1 text-light-silver w-full sticky top-0">
            <div className="mx-5 flex justify-between items-center">
                <Link to={"/landing-page"} className="flex flex-row w-32">
                    <img src={logoGuns} />
                </Link>
                <nav>
                    <ul className="flex space-x-3">
                        <AvatarProfile width={40}/>
                    </ul>
                </nav>
            </div>
        </header>
      <header className="flex justify-between bg-light-gray py-1 text-light-silver w-full">
        <div className="mx-5 items-center">
          <button onClick={()=> navigate (-1)} className="btn btn-sm my-2 border-none ring-1 ring-navBg/20 hover:bg-light-silver/70 shadow-xl rounded-full bg-white text-navBg">
            <span><BsArrowLeft/></span>
            back
            </button>
        </div>
      </header>
    </>
  );
}

export default HeaderReservation;
