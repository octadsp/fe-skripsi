import React, { useState, useContext, useEffect } from "react";
import Header from "./Components/HeaderReservation";
import AvatarProfile from "../../components/Elements/AvatarProfile";
import EditModal from "../../components/Fragments/ModalEditProfile";
import { FcExpired } from "react-icons/fc";
import { FcSynchronize } from "react-icons/fc";
import { FcOk } from "react-icons/fc";

import { API } from "../../config/api";
import { useQuery } from "react-query";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "id-ID",
    options
  );
  const [day, month, year] = formattedDate.split(" ");
  const monthName = month.charAt(0).toUpperCase() + month.slice(1); // Ubah huruf pertama bulan menjadi kapital
  return `${day} ${monthName} ${year}`;
};

function ProfilePage() {
  const [state] = useContext(UserContext);
  const [openTab, setOpenTab] = useState(1);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    lastname: "",
    email: "",
    institute: "",
    phone: "",
    address: "",
    image: "",
  });

  const { data: user, refetch: refetchUser } = useQuery(
    "userCache",
    async () => {
      const resp = await API.get(`/user/${state.user.id}`);
      setPreview(resp.data.data.image);

      setForm({
        fullname: resp.data.data.fullname,
        lastname: resp.data.data.lastname,
        email: resp.data.data.email,
        institute: resp.data.data.institute,
        phone: resp.data.data.phone,
        address: resp.data.data.address,
        image: resp.data.data.image,
      });
    },
    {
      refetchInterval: 5000,
    }
  );

  const { data: history, refetch: refetchHistory } = useQuery(
    "historyReservCache",
    async () => {
      const response = await API.get("/reservations");
      return response.data.data;
    }
  );
  console.log("🚀 ~ ProfilePage ~ history:", history);

  // Fungsi untuk memfilter data berdasarkan user_id
  const filterHistoryByUserId = (userId) => {
    return history?.filter((item) => item.user_id === userId);
  };

  // Menggunakan fungsi filterHistoryByUserId dengan user_id dari state atau sesuai kebutuhan
  const filteredHistory = filterHistoryByUserId(state?.user.id);

  const filterHistoryStatus = (status) => {
    return filteredHistory?.filter((item) => item.status === status);
  };

  const filteredPending = filterHistoryStatus("Pending");
  const filteredProses = filterHistoryStatus("Proses");
  const filteredSelesai = filterHistoryStatus("Selesai");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <FcExpired className="text-6xl" />;
      case "proses":
        return <FcSynchronize className="text-6xl" />;
      case "selesai":
        return <FcOk className="text-6xl" />;
      default:
        return null; // Jika status tidak sesuai, tidak menampilkan ikon
    }
  };

  return (
    <>
      <Header />
      <div className="bg-white h-full pb-10">
        <div className="flex mx-16 pt-10 ">
          <div className="flex justify-between w-full">
            {/* KIRI */}
            <div className="w-2/6 px-20 ">
              <div className="h-full bg-white flex flex-col justify-center items-center shadow-md border border-light-silver rounded-lg py-5">
                <div className="px-5">
                  <img
                    className="object-cover rounded-xl h-48 w-96"
                    src={form.image}
                  />
                </div>
                <div className="mt-2">
                  <h1 className="text-xl text-navBg">
                    {form.fullname} {form.lastname}
                  </h1>
                </div>
                <div className="mt-1">
                  <h1 className="text-sm text-navBg/60">{form.institute}</h1>
                </div>
                <div>
                  <button
                    className="btn btn-block btn-sm mt-3 bg-mikado-yellow hover:text-white hover:bg-navBg text-navBg font-bold border-navBg/20"
                    onClick={() =>
                      document
                        .getElementById("my_modal_editProfile")
                        .showModal()
                    }
                  >
                    edit
                  </button>
                </div>
                <EditModal />
              </div>
            </div>
            {/* END */}
            {/* KANAN */}
            <div className="w-4/6 h-full text-navBg flex flex-col py-5 px-10 shadow-md border justify-center border-light-silver rounded-lg">
              <div className="border-b border-b-light-silver my-2"></div>
              <div className="flex gap-10 w-full py-3">
                <p className="w-1/4 font-semibold text-xl">Nama Depan</p>
                <p className="text-xl font-semibold">: {form.fullname}</p>
              </div>
              <div className="border-b border-b-light-silver my-2"></div>
              <div className="flex gap-10 w-full py-3">
                <p className="w-1/4 font-semibold text-xl">Nama Belakang</p>
                <p className="text-xl font-semibold">: {form.lastname}</p>
              </div>
              <div className="border-b border-b-light-silver my-2"></div>
              <div className="flex gap-10 w-full py-3">
                <p className="w-1/4 font-semibold text-xl">Handphone</p>
                <p className="text-xl font-semibold">: {form.phone}</p>
              </div>
              <div className="border-b border-b-light-silver my-2"></div>
              <div className="flex gap-10 w-full py-3">
                <p className="w-1/4 font-semibold text-xl">Alamat</p>
                <p className="text-xl font-semibold">: {form.address}</p>
              </div>
              <div className="border-b border-b-light-silver my-2"></div>
            </div>
            {/* END */}
          </div>
        </div>

        <div className="flex mx-5 pt-10 ">
          <div className="w-full flex flex-col gap-2 py-5 px-5 shadow-md border border-light-silver rounded-lg">
            {/* TITLE */}
            <div className="flex justify-center pb-4 mb-5">
              <h1 className="text-navBg text-3xl font-bold">
                History Reservation
              </h1>
            </div>

            <div className="text-navBg">
              <ul className="flex justify-around text-2xl">
                <li>
                  <a
                    onClick={() => setOpenTab(1)}
                    className={
                      openTab === 1
                        ? "border-b-2 px-10 py-2 bg-light-silver/10 rounded-t-box cursor-pointer"
                        : "px-10 py-2 text-navBg/50 cursor-pointer"
                    }
                  >
                    Pending
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setOpenTab(2)}
                    className={
                      openTab === 2
                        ? "border-b px-10 py-2 bg-light-silver/10 rounded-t-box cursor-pointer"
                        : "px-10 py-2 text-navBg/50 cursor-pointer"
                    }
                  >
                    Proses
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setOpenTab(3)}
                    className={
                      openTab === 3
                        ? "border-b px-10 py-2 bg-light-silver/10 rounded-t-box cursor-pointer"
                        : "px-10 py-2 text-navBg/50 cursor-pointer"
                    }
                  >
                    Selesai
                  </a>
                </li>
              </ul>
              <div className="mt-10">
                <div className={openTab === 1 ? "block" : "hidden"}>
                  {filteredPending && filteredPending?.length > 0 ? (
                    <div className="w-full grid grid-cols-3 gap-5 text-navBg">
                      {filteredPending?.map((item) => (
                        <div className="flex flex-col justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                          <div className="flex items-center gap-5">
                            <div className="flex flex-col">
                              <h1 className="text-lg">
                                {item.kode_order} -{" "}
                                {formatDate(item.created_at)}
                              </h1>
                              <p className="mt-3 text-sm">
                                Kendaraan merek {item.car_brand} dengan tipe{" "}
                                {item.car_type} berwarna {item.car_color}
                              </p>
                            </div>
                            <div>
                              <div className="flex flex-col items-center">
                                {getStatusIcon(item.status)}
                                <div>{item.status}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-center item-center">
                            <div>
                              <Link
                                to={`/detail-reservation/` + item.id}
                                className="text-navBg btn btn-wide btn-sm mt-5 transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold rounded-lg"
                              >
                                Detail
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center bg-light-gray/30 p-5 rounded-box shadow">
                      <div className="text-lg text-navBg/60">
                        Tidak ada data
                      </div>
                    </div>
                  )}
                </div>
                <div className={openTab === 2 ? "block" : "hidden"}>
                  {filteredProses && filteredProses.length > 0 ? (
                    <div className="w-full grid grid-cols-3 gap-5 text-navBg">
                      {filteredProses?.map((item) => (
                        <div className="flex flex-col justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                          <div className="flex items-center gap-5">
                            <div className="flex flex-col">
                              <h1 className="text-lg">
                                {item.kode_order} -{" "}
                                {formatDate(item.created_at)}
                              </h1>
                              <p className="mt-3 text-sm">
                                Kendaraan merek {item.car_brand} dengan tipe{" "}
                                {item.car_type} berwarna {item.car_color}
                              </p>
                            </div>
                            <div>
                              <div className="flex flex-col items-center">
                                {getStatusIcon(item.status)}
                                <div>{item.status}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-center item-center">
                            <div>
                              <Link
                                to={`/detail-reservation/` + item.id}
                                className="text-navBg btn btn-wide btn-sm mt-5 transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold rounded-lg"
                              >
                                Detail
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center bg-light-gray/30 p-5 rounded-box shadow">
                      <div className="text-lg text-navBg/60">
                        Tidak ada data
                      </div>
                    </div>
                  )}
                </div>
                <div className={openTab === 3 ? "block" : "hidden"}>
                  {filteredSelesai && filteredSelesai.length > 0 ? (
                    <div className="w-full grid grid-cols-3 gap-5 text-navBg">
                      {filteredSelesai?.map((item) => (
                        <div className="flex flex-col justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                          <div className="flex items-center gap-5">
                            <div className="flex flex-col">
                              <h1 className="text-lg">
                                {item.kode_order} -{" "}
                                {formatDate(item.created_at)}
                              </h1>
                              <p className="mt-3 text-sm">
                                Kendaraan merek {item.car_brand} dengan tipe{" "}
                                {item.car_type} berwarna {item.car_color}
                              </p>
                            </div>
                            <div>
                              <div className="flex flex-col items-center">
                                {getStatusIcon(item.status)}
                                <div>{item.status}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-center item-center">
                            <div>
                              <Link
                                to={`/detail-reservation/` + item.id}
                                className="text-navBg btn btn-wide btn-sm mt-5 transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold rounded-lg"
                              >
                                Detail
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center bg-light-gray/30 p-5 rounded-box shadow">
                      <div className="text-lg text-navBg/60">
                        Tidak ada data
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
