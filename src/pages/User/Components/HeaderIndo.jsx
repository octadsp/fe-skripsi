import logoGuns from "../../../assets/logo.png";
import ModalUserLogin from "../../../components/Fragments/ModalUserLogin";
import ModalUserRegister from "../../../components/Fragments/ModalUserRegister";
import AvatarProfile from "../../../components/Elements/AvatarProfile";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBell } from "react-icons/fa";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";
import IndoFlag from "../../../assets/indonesia.png";
import EngFlag from "../../../assets/english.png";

import { useContext, useState, useEffect } from "react";
import { API } from "../../../config/api";
import { useQuery, useMutation } from "react-query";
import { UserContext } from "../../../context/userContext";
import { LanguageContext } from "../../../context/useLanguage";

// Fungsi untuk menghitung jumlah notifikasi
const countNotifications = (notifications) => {
  return notifications ? notifications.length : 0;
};

const HeaderIndo = () => {
  const [state] = useContext(UserContext);
  const { dispatch: setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  const handleReservClick = (e) => {
    document.getElementById("modalAlert").close();
    document.getElementById("modalLogin").showModal();
  };

  const { data: notif, refetch: refetchNotif } = useQuery(
    "notifCache",
    async () => {
      const resp = await API.get(`/notifications/${state.user.id}`);
      return resp.data.data;
    },
    { refetchInterval: 2000 }
  );

  const updateNotificationStatus = async (notificationId) => {
    try {
      await API.patch(`/notification/${notificationId}`, {
        is_read: true, // Atau nilai yang sesuai dengan status notifikasi yang ingin Anda update
      });
      // Panggil refetch untuk memuat ulang data notifikasi setelah pembaruan
      refetchNotif();
      navigate("/profile");
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout success! 👌");
    // Back to Landing Page
    window.location.reload();
  };

  useEffect(() => {
    // Set jumlah notifikasi saat data notifikasi berubah
    setNotificationCount(countNotifications(notif));
  }, [notif]);

  const handleChangeLanguage = () => {
    // Set dispatch untuk mengubah bahasa menjadi Indonesia
    setLanguage({ type: "CHANGE_LANGUAGE", payload: "english" });
  };

  return (
    <>
      {state.isLogin ? (
        <Indo className="bg-navBg py-1 text-light-silver w-full sticky top-0">
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
                <li className="flex gap-5 justify-center items-center">
                  <div className="indicator">
                    <span className="indicator-item text-textError font-bold">
                      {notificationCount}
                    </span>
                    <div className="text-2xl dropdown dropdown-bottom dropdown-end">
                      <div tabIndex={0} role="button" className="p-1">
                        <IoMdMail />
                      </div>
                      <ul
                        tabIndex={0}
                        className="gap-2 dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-[350px]"
                      >
                        {notif?.map((item) => (
                          <li
                            key={item.id}
                            className="bg-light-silver/50 rounded-md text-navBg"
                          >
                            <div className="flex justify-between">
                              <div className="flex w-full items-center gap-3">
                                <div>
                                  <FaBell className="text-mikado-yellow text-lg" />
                                </div>
                                <div className="w-full h-full">
                                  <h1 className="font-bold">{item.title}</h1>
                                  <div>
                                    <p className="text-xs">{item.message}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="btn btn-xs border text-navBg hover:text-white hover:border-navBg bg-textSuccess/90 focus:bg-white">
                                <button
                                  onClick={() =>
                                    updateNotificationStatus(item.id)
                                  }
                                >
                                  View
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
        </Indo>
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
                    Beranda
                  </a>
                </li>
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#aboutus" className=" ">
                    Tentang Kami
                  </a>
                </li>
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#servicesection" className=" ">
                    Jasa
                  </a>
                </li>
                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#partnersection" className=" ">
                    Mitra
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
                    Reservasi
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

                <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <a href="#contactsection" className=" ">
                    Kontak
                  </a>
                </li>

                <li className="dropdown dropdown-hover dropdown-bottom dropdown-end p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline">
                  <div tabIndex={0} role="button" className="">
                    <img src={IndoFlag} alt="Indonesia" className="w-6" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-20"
                  >
                    <li className="flex items-center">
                      <button onClick={handleChangeLanguage}>
                        <img src={EngFlag} alt="English" className="w-6" />
                      </button>
                    </li>
                  </ul>
                </li>

                <li className="bg-white py-2 px-4 text-mikado-yellow font-semibold hover:bg-mikado-yellow hover:text-white  rounded-sm">
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className=""
                    onClick={() =>
                      document.getElementById("modalLogin").showModal()
                    }
                  >
                    Masuk
                  </button>
                  <ModalUserLogin />
                </li>
                <li className="bg-mikado-yellow py-2 px-4 text-white font-semibold hover:bg-white hover:text-mikado-yellow rounded-sm">
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className=" "
                    onClick={() =>
                      document.getElementById("modalRegister").showModal()
                    }
                  >
                    Daftar
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

export default HeaderIndo;
