import React from "react";
import {BsArrowLeft} from "react-icons/bs"
import AvatarProfile from "../../../components/Elements/AvatarProfile"

function HeaderReservation() {
  return (
    <>
      <header className="flex justify-between bg-light-gray py-1 text-light-silver w-full">
        <div className="mx-5 items-center">
          <button className="btn btn-sm my-2 border-none ring-1 ring-navBg/20 hover:bg-light-silver/70 shadow-xl rounded-full bg-white text-navBg">
            <span><BsArrowLeft/></span>
            back
            </button>
        </div>
        <div className="mx-5 flex justify-center">
            <AvatarProfile width={40}/>
        </div>
      </header>
    </>
  );
}

export default HeaderReservation;
