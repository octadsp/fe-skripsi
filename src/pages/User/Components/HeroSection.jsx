import React, { useContext } from "react";
import HeroImg from "../../../assets/Hero.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import ModalUserLogin from "../../../components/Fragments/ModalUserLogin";

const HeroSection = () => {
  const [state] = useContext(UserContext);

  const handleReservClick = (e) => {
    document.getElementById("modalAlert").close();
    document.getElementById("modalLogin").showModal();
  };

  return (
    <>
      {state?.isLogin ? (
        <section
          id="herosection"
          className="bg-white text-navBg h-screen flex flex-col justify-center items-center pt-10"
        >
          <img src={HeroImg} className="px-20" />
          <h1 className="text-5xl font-bold my-4">Repair Your Car With Us</h1>
          <p className="text-lg mb-8">
            The best car repair services at affordable prices.
          </p>
          <Link
            to="/reservation-page"
            className="ring-2 ring-mikado-yellow text-mikado-yellow font-bold py-2 px-6 rounded-full hover:bg-mikado-yellow hover:text-white transition duration-300"
          >
            Booking
          </Link>
          <p className="text-sm text-navBg/50">
            *sementara hanya menerima dari jabodetabek
          </p>
        </section>
      ) : (
        <section
          id="herosection"
          className="bg-white text-navBg h-screen flex flex-col justify-center items-center pt-10"
        >
          <img src={HeroImg} className="px-20" />
          <h1 className="text-5xl font-bold my-4">Repair Your Car With Us</h1>
          <p className="text-lg mb-8">
            The best car repair services at affordable prices.
          </p>

          <button
            onClick={() => document.getElementById("modalAlert").showModal()}
            className="ring-2 ring-mikado-yellow text-mikado-yellow font-bold py-2 px-6 rounded-full hover:bg-mikado-yellow hover:text-white transition duration-300"
          >
            Booking
          </button>
          <p className="text-sm text-navBg/50">
            *sementara hanya menerima dari jabodetabek
          </p>

          {/* MODAL ALERT */}
          <dialog id="modalAlert" className="modal text-navBg">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Oops!</h3>
              <p className="py-4">Anda belum login, apakah anda ingin login?</p>
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

          <ModalUserLogin />
        </section>
      )}
    </>
  );
};

export default HeroSection;
