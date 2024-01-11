import React, { useContext, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FcExpired } from "react-icons/fc";
import { FcSynchronize } from "react-icons/fc";
import { FcOk } from "react-icons/fc";

import { UserContext } from "../../../context/userContext";
import { API } from "../../../config/api";
import { useQuery, useMutation } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

// 1 Post punya banyak Photo
// 1 Reservation punya banyak Item

const items = [
  {
    id: 10,
    Image:
      "https://res.cloudinary.com/dpxazv6a6/image/upload/v1704687841/skripsi/no_image_btbbwy.png",
    item: "Bemper Depan",
    price: 450000,
  },
  {
    id: 21,
    Image:
      "https://res.cloudinary.com/dpxazv6a6/image/upload/v1704536262/skripsi/zxrgubz4yrk92qxlo6lw.png",
    item: "Pintu Samping",
    price: 200000,
  },
  {
    id: 32,
    Image:
      "https://res.cloudinary.com/dpxazv6a6/image/upload/v1704290798/skripsi/kjak0g7kancjg5pfoggf.jpg",
    item: "Kap Sun Roof",
    price: 320000,
  },
  {
    id: 44,
    Image:
      "https://res.cloudinary.com/dpxazv6a6/image/upload/v1704536435/skripsi/nnqunjrh9fcdxwk1iilc.jpg",
    item: "Sayap Belakang",
    price: 250000,
  },
];

function formatPrice(price) {
  // Convert price to string
  const priceString = price.toString();

  // Split the string into integer and decimal parts
  const [integerPart] = priceString.split(".");

  // Add dots for thousands separator
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  // Combine the integer and decimal parts
  const formattedPrice = `Rp. ${formattedIntegerPart}`;

  return formattedPrice;
}

const getStatusIcon = (status) => {
  switch (status) {
    case "Pending":
      return <FcExpired className="text-6xl" />;
    case "Proses":
      return <FcSynchronize className="text-6xl" />;
    case "Selesai":
      return <FcOk className="text-6xl" />;
    default:
      return null; // Jika status tidak sesuai, tidak menampilkan ikon
  }
};

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
  const [selectedItems, setSelectedItems] = useState({});
  console.log(
    "🚀 ~ file: DetailReservation.jsx:94 ~ DetailReservation ~ selectedItems:",
    selectedItems
  );

  // Function to handle checkbox toggle
  const handleCheckboxToggle = (itemId) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: !prevSelectedItems[itemId],
    }));
  };

  const { data: reservation, refetch: refetchReservation } = useQuery(
    "reservationDetailCache",
    async () => {
      const resp = await API.get(`/reservation/${id}`);
      return resp.data.data;
    }
  );
  // console.log(
  //   "🚀 ~ file: DetailReservation.jsx:95 ~ DetailReservation ~ reservation:",
  //   reservation
  // );

  // Function to calculate total items and total estimated price
  const calculateTotal = () => {
    const selectedItemsArray = Object.entries(selectedItems);
    const totalItems = selectedItemsArray.length;
    const totalEstimatedPrice = selectedItemsArray.reduce(
      (accumulator, [itemId, isChecked]) => {
        const selectedItem = items?.find(
          (item) => item.id === parseInt(itemId, 10)
        );
        return isChecked ? accumulator + selectedItem.price : accumulator;
      },
      0
    );

    return { totalItems, totalEstimatedPrice };
  };

  const { totalItems, totalEstimatedPrice } = calculateTotal();
  // console.log(
  //   "🚀 ~ file: DetailReservation.jsx:137 ~ DetailReservation ~ totalEstimatedPrice:",
  //   totalEstimatedPrice
  // );

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
      <section className="bg-white h-full w-full">
        <div className="flex flex-col shadow mx-24 text-navBg py-5">
          <div className="flex justify-between my-5">
            {/* KODE RESERV */}
            <div className="mt-5 w-1/2">
              <div className="text-xl p-5">
                <div className="flex shadow w-10/12 h-10 items-center px-2">
                  Kode Reservation :&nbsp;
                  <span className="font-semibold">
                    {reservation?.kode_order}
                  </span>
                </div>
                {reservation?.insurance_name &&
                reservation?.insurance_name.length > 0 ? (
                  <>
                    {reservation?.is_insurance === 1 ? (
                      <div className="mx-2 mt-2 font-medium">
                        {reservation?.insurance_name}
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
                  <div>{getStatusIcon(reservation?.status)}</div>
                  <div>{reservation?.status}</div>
                </div>
              </div>
              <div className="flex items-center font-semibold">
                {formatDate(reservation?.created_at)}
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
                  {reservation?.user.fullname} {reservation?.user.lastname}
                </span>
              </p>
            </div>
            <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
              <p className="w-1/6 text-lg text-navBg/80">Perusahaan</p>
              <p className="text-lg">
                :&nbsp;
                <span className="font-semibold">
                  {reservation?.user.institute}
                </span>
              </p>
            </div>
            <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
              <p className="w-1/6 text-lg text-navBg/80">Telepon</p>
              <p className="text-lg">
                :&nbsp;
                <span className="font-semibold">{reservation?.user.phone}</span>
              </p>
            </div>
            <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
              <p className="w-1/6 text-lg text-navBg/80">Alamat</p>
              <p className="text-lg">
                :&nbsp;
                <span className="font-semibold">
                  {reservation?.user.address}
                </span>
              </p>
            </div>
          </div>

          {reservation?.is_insurance === 1 ? (
            <>
              <div className="flex gap-3 mx-5 mt-5">
                {/* DATA KENDARAAN */}
                {/* KIRI */}
                <div className="w-1/2 shadow rounded-lg p-2">
                  <div className="flex justify-center text-lg text-navBg font-semibold mb-2">
                    <h1 className="underline underline-offset-8">
                      Data Kendaraan
                    </h1>
                  </div>
                  <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                    <p className="w-1/6 text-lg text-navBg/80">Merek</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.car_brand}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                    <p className="w-1/6 text-lg text-navBg/80">Tipe</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.car_type}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                    <p className="w-1/6 text-lg text-navBg/80">Tahun</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.car_year}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                    <p className="w-1/6 text-lg text-navBg/80">Warna</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.car_color}
                      </span>
                    </p>
                  </div>
                </div>
                {/* KANAN */}
                <div className="w-1/2 shadow rounded-lg p-2">
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
                        {formatDate(reservation?.event_date)}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                    <p className="w-1/6 text-lg text-navBg/80">Tempat</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.place}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                    <p className="w-1/6 text-lg text-navBg/80">Waktu</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">{reservation?.time}</span>
                    </p>
                  </div>
                  <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                    <p className="w-1/6 text-lg text-navBg/80">Kecepatan</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.driver_speed} km/s
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Pengemudi Kendaraan Saat Kejadian */}
              <div className="flex flex-col gap-3 mx-5 shadow rounded-lg mt-3 p-2">
                <div className="flex justify-center text-lg text-navBg font-semibold mb-2">
                  <h1 className="underline underline-offset-8">
                    Informasi Pengemudi Kendaraan
                  </h1>
                </div>
                <div className="flex gap-11 w-full py-1 border-b border-navBg/10">
                  <p className="text-lg text-navBg/80">Nama Lengkap</p>
                  <p className="text-lg">
                    :&nbsp;
                    <span className="font-semibold">
                      {reservation?.driver_name}
                    </span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex w-1/2 gap-20 py-1 border-b border-navBg/10">
                    <p className="text-lg text-navBg/80">Hubungan</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.driver_relation}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-20 w-1/2 py-1 border-b border-navBg/10">
                    <p className="w-1/6 text-lg text-navBg/80">Umur</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.driver_age}{" "}
                        <span className="text-navBg/80">tahun</span>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex w-1/2 gap-20 py-1 border-b border-navBg/10">
                    <p className="text-lg text-navBg/80 mr-2">Pekerjaan</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.driver_job}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-20 w-1/2 py-1 border-b border-navBg/10">
                    <p className="w-1/6 text-lg text-navBg/80">SIM</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.driver_license}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-3 mx-5 mt-5">
                {/* DATA KENDARAAN */}
                {/* KIRI */}
                <div className="w-full shadow rounded-lg p-2">
                  <div className="flex justify-center text-lg text-navBg font-semibold mb-2">
                    <h1 className="underline underline-offset-8">
                      Data Kendaraan
                    </h1>
                  </div>
                  <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                    <p className="w-1/6 text-lg text-navBg/80">Merek</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.car_brand}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                    <p className="w-1/6 text-lg text-navBg/80">Tipe</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.car_type}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                    <p className="w-1/6 text-lg text-navBg/80">Tahun</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.car_year}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-5 w-full py-1 border-b border-navBg/10">
                    <p className="w-1/6 text-lg text-navBg/80">Warna</p>
                    <p className="text-lg">
                      :&nbsp;
                      <span className="font-semibold">
                        {reservation?.car_color}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ITEMS KERUSAKAN */}
          <div className="mx-5 mt-3 p-5 shadow bg-light-gray/50 rounded-lg">
            <div className="flex justify-center mb-10">
              <h1 className="text-2xl">Items Kerusakan</h1>
            </div>
            <div className="p-2 shadow bg-white/80 rounded-xl mb-5 flex flex-col gap-2">
              <div>
                Total Item : <span className="font-medium">{totalItems}</span>
              </div>
              <div>
                Total Perkiraan Harga :{" "}
                <span className="font-medium">
                  {formatPrice(totalEstimatedPrice)}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {items?.map((item) => (
                <div className="mb-10">
                  <div className="flex justify-center">
                    <img
                      className="w-72 h-64 object-cover rounded-xl border border-light-silver shadow"
                      src={item.Image}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2 mx-2 mt-2">
                    <p className="text-lg font-medium">{item.item}</p>
                    <p>{formatPrice(item.price)}</p>
                  </div>
                  <label className="flex justify-center mt-5">
                    <input
                      type="checkbox"
                      checked={selectedItems[item.id] || false}
                      onChange={() => handleCheckboxToggle(item.id)}
                      className="mr-2"
                    />
                    <span>Approve</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-center w-full">
              <button className="btn btn-wide btn-sm bg-white hover:bg-textSuccess hover:text-white ring-1 ring-light-silver hover:ring-textSuccess hover:shadow">
                <p>Submit</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailReservation;
