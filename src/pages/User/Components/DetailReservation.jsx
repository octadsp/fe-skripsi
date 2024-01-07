import React, { useContext } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FcExpired } from "react-icons/fc";
import { FcSynchronize } from "react-icons/fc";
import { FcOk } from "react-icons/fc";

import { UserContext } from "../../../context/userContext";
import { API } from "../../../config/api";
import { useQuery, useMutation } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

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

function DetailReservation() {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: reservation, refetch: refetchReservation } = useQuery(
    "reservationDetailCache",
    async () => {
      const resp = await API.get(`/reservation/` + id);
      return resp.data.data;
    }
  );
  console.log(
    "🚀 ~ file: DetailReservation.jsx:13 ~ DetailReservation ~ reservation:",
    reservation
  );

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
      <header className="flex justify-between bg-light-gray py-1 text-light-silver w-full">
        <div className="mx-5 items-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-sm my-2 border-none ring-1 ring-navBg/20 hover:bg-light-silver/70 shadow-xl rounded-full bg-white text-navBg"
          >
            <span>
              <BsArrowLeft />
            </span>
            back
          </button>
        </div>
      </header>
      <section className="bg-white h-full w-full py-5">
        <div className="flex flex-col shadow mx-24 text-navBg">
          <div className="flex justify-between my-5">
            {/* KODE RESERV */}
            <div className="mt-5 w-1/2">
              <div className="text-xl p-5">
                <div className="flex shadow w-10/12 h-10 items-center px-2">
                  Kode Reservation :&nbsp;
                  <span className="font-semibold">
                    {reservation.kode_order}
                  </span>
                </div>
                {reservation?.insurance_name &&
                reservation?.insurance_name.length > 0 ? (
                  <>
                    {reservation?.is_insurance === 1 ? (
                      <div className="mx-2 mt-2 font-medium">
                        {reservation.insurance_name}
                      </div>
                    ) : (
                      <div>Tidak menggunakan Asuransi</div>
                    )}
                  </>
                ) : (
                  <div>Tidak menggunakan Asuransi</div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center pr-5">
              <div className="flex">
                <div className="">
                  <div>{getStatusIcon(reservation.status)}</div>
                  <div>{reservation.status}</div>
                </div>
              </div>
              <div className="flex items-center font-semibold">
                {formatDate(reservation.created_at)}
              </div>
            </div>
          </div>

          {/* PROFILE USER */}
          <div className="flex flex-col gap-3 mx-5">
            <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
              <p className="w-1/6 text-lg text-navBg/80">Nama</p>
              <p className="text-lg">
                :&nbsp;
                <span className="font-semibold">
                  {reservation.user.fullname} {reservation.user.lastname}
                </span>
              </p>
            </div>
            <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
              <p className="w-1/6 text-lg text-navBg/80">Perusahaan</p>
              <p className="text-lg">
                :&nbsp;
                <span className="font-semibold">
                  {reservation.user.institute}
                </span>
              </p>
            </div>
            <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
              <p className="w-1/6 text-lg text-navBg/80">Telepon</p>
              <p className="text-lg">
                :&nbsp;
                <span className="font-semibold">{reservation.user.phone}</span>
              </p>
            </div>
            <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
              <p className="w-1/6 text-lg text-navBg/80">Alamat</p>
              <p className="text-lg">
                :&nbsp;
                <span className="font-semibold">
                  {reservation.user.address}
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-3 mx-5 mt-5">
            {/* DATA KENDARAAN */}
            {/* KIRI */}
            <div className="w-1/2 shadow rounded-lg px-2">
              <div className="flex justify-center text-lg text-navBg font-semibold mb-2">
                <h1 className="underline underline-offset-8">Data Kendaraan</h1>
              </div>
              <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                <p className="w-1/6 text-lg text-navBg/80">Merek</p>
                <p className="text-lg">
                  :&nbsp;
                  <span className="font-semibold">{reservation.car_brand}</span>
                </p>
              </div>
              <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                <p className="w-1/6 text-lg text-navBg/80">Tipe</p>
                <p className="text-lg">
                  :&nbsp;
                  <span className="font-semibold">{reservation.car_type}</span>
                </p>
              </div>
              <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                <p className="w-1/6 text-lg text-navBg/80">Tahun</p>
                <p className="text-lg">
                  :&nbsp;
                  <span className="font-semibold">{reservation.car_year}</span>
                </p>
              </div>
              <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                <p className="w-1/6 text-lg text-navBg/80">Warna</p>
                <p className="text-lg">
                  :&nbsp;
                  <span className="font-semibold">{reservation.car_color}</span>
                </p>
              </div>
            </div>
            {/* KANAN */}
            <div className="w-1/2 shadow rounded-lg px-2">
              <div className="flex justify-center text-lg text-navBg font-semibold mb-2">
                <h1 className="underline underline-offset-8">
                  Keterangan - Keterangan Kejadian
                </h1>
              </div>
              <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                <p className="w-1/6 text-lg text-navBg/80">Tanggal</p>
                <p className="text-lg">
                  :&nbsp;
                  <span className="font-semibold">
                    {formatDate(reservation.event_date)}
                  </span>
                </p>
              </div>
              <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                <p className="w-1/6 text-lg text-navBg/80">Tempat</p>
                <p className="text-lg">
                  :&nbsp;
                  <span className="font-semibold">{reservation.place}</span>
                </p>
              </div>
              <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                <p className="w-1/6 text-lg text-navBg/80">Waktu</p>
                <p className="text-lg">
                  :&nbsp;
                  <span className="font-semibold">{reservation.time}</span>
                </p>
              </div>
              <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                <p className="w-1/6 text-lg text-navBg/80">Kecepatan</p>
                <p className="text-lg">
                  :&nbsp;
                  <span className="font-semibold">
                    {reservation.driver_speed} km/s
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailReservation;
