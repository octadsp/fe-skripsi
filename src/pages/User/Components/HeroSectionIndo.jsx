import React, { useContext } from "react";
import HeroImg from "../../../assets/Hero.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import ModalUserLogin from "../../../components/Fragments/ModalUserLogin";

const HeroSectionIndo = () => {
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
          <h1 className="text-5xl font-bold my-4">
            Perbaiki Mobil Anda Bersama Kami
          </h1>
          <p className="text-lg mb-8">
            Layanan perbaikan mobil terbaik dengan harga terjangkau.
          </p>
          <Link
            to="/reservation-page"
            className="ring-2 ring-mikado-yellow text-mikado-yellow font-bold py-2 px-6 rounded-full hover:bg-mikado-yellow hover:text-white transition duration-300"
          >
            Reservasi
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
          <h1 className="text-5xl font-bold my-4">
            Perbaiki Mobil Anda Bersama Kami
          </h1>
          <p className="text-lg mb-8">
            Layanan perbaikan mobil terbaik dengan harga terjangkau.
          </p>

          <button
            onClick={() =>
              document.getElementById("modalAlertIndo").showModal()
            }
            className="ring-2 ring-mikado-yellow text-mikado-yellow font-bold py-2 px-6 rounded-full hover:bg-mikado-yellow hover:text-white transition duration-300"
          >
            Reservasi
          </button>
          <p className="text-sm text-navBg/50">
            *sementara hanya menerima dari jabodetabek
          </p>

          {/* MODAL ALERT */}
          <dialog id="modalAlertIndo" className="modal text-navBg">
            <div className="modal-box bg-white">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Oops!</h3>
              <p className="py-4">Anda belum masuk, apakah anda ingin masuk?</p>
              <div className="flex items-center gap-2 justify-end">
                <div>
                  <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button className="hover:shadow hover:bg-navBg/10 hover:rounded-lg px-5 py-1 text-lg">
                      Tidak
                    </button>
                  </form>
                </div>
                <div>
                  <button
                    className="bg-lightGreen hover:bg-textSuccess rounded-lg px-5 py-1 text-lg"
                    onClick={() => handleReservClick()}
                  >
                    Iya
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

export default HeroSectionIndo;
