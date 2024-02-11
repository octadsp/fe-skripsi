import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";
import Logo from "../../../assets/kop.png";
import { FaPrint } from "react-icons/fa";

import autoTable, { jsPDFDocument } from "jspdf-autotable";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DataTable from "react-data-table-component";

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

const currentDate = new Date(); // Membuat objek Date yang merepresentasikan tanggal dan waktu saat ini
const year = currentDate.getFullYear(); // Mendapatkan tahun saat ini
const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Mendapatkan bulan saat ini (dalam format 01-12)
const day = ("0" + currentDate.getDate()).slice(-2); // Mendapatkan hari saat ini (dalam format 01-31)

// Gabungkan tahun, bulan, dan hari menjadi format 'yyyy-mm-dd'
const formattedDate = `${year}-${month}-${day}`;

function TestLaporan() {
  const [status, setStatus] = useState("Selesai");
  const [dateFrom, setDateFrom] = useState(`${formattedDate}`);
  const [dateUntil, setDateUntil] = useState(`${formattedDate}`);
  const [reservation, setReservation] = useState([]);

  //   const { data: reservation, refetch: reservRefetch } = useQuery(
  //     "reservListCache",
  //     async () => {
  //       const resp = await API.get(
  //         `/reservations?status=${status}&from=${dateFrom}&until=${dateUntil}`
  //       );
  //       return resp.data.data;
  //     }
  //   );

  // Mengambil data pertama kali saat komponen dimuat
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Kirim permintaan GET ke API dengan nilai default
        const response = await API.get(
          `/reservationstatusfromuntil?status=${status}&from=${dateFrom}&until=${dateUntil}`
        );

        // Periksa apakah respons sukses
        if (response.status === 200) {
          // Simpan data reservasi yang diterima ke dalam state
          setReservation(response.data.data);
        } else {
          console.error("Failed to fetch reservations");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error.message);
      }
    };

    fetchReservations();
  }, []); // Efek ini akan dijalankan sekali setelah komponen dimuat

  const handleOnChangeFrom = (e) => {
    const val = e.target.value;
    setDateFrom(val);
  };

  const handleOnChangeUntil = (e) => {
    const val = e.target.value;
    setDateUntil(val);
  };

  const handleSearch = async () => {
    try {
      // Kirim permintaan GET ke API dengan parameter yang sesuai
      const response = await API.get(
        `/reservationstatusfromuntil?status=${status}&from=${dateFrom}&until=${dateUntil}`
      );

      // Periksa apakah respons sukses
      if (response.status === 200) {
        // Simpan data reservasi yang diterima ke dalam state
        setReservation(response.data.data);
      } else {
        console.error("Failed to fetch reservations");
      }
    } catch (error) {
      console.error("Error fetching reservations:", error.message);
    }
  };

  const downloadPDF = () => {
    const capture = document.querySelector("#laporan");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png", 1.0);
      const doc = new jsPDF("l", "mm", [340, 250]);
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "JPEG", 10, 5);
      doc.save("laporan.pdf");
    });
  };

  //   console.log(reservation);

  return (
    <div className="px-10 text-navBg">
      <div className="p-2 mb-2 mt-10 rounded-md shadow">
        <div className="w-1/2 flex gap-5 items-center">
          <div className="grid gap-2 w-1/2">
            <div className="flex justify-between items-center">
              <label className="">Periode Dari</label>
              <input
                type="date"
                name="from"
                value={dateFrom}
                onChange={(e) => handleOnChangeFrom(e)}
                className="bg-white  border border-navBg/50 rounded-lg px-2 py-1"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="">Periode Sampai</label>
              <input
                type="date"
                name="until"
                value={dateUntil}
                onChange={(e) => handleOnChangeUntil(e)}
                className="bg-white border  border-navBg/50 rounded-lg px-2 py-1"
              />
            </div>
          </div>
          <div className="btn flex">
            <button onClick={(e) => handleSearch(e)}>Search</button>
          </div>
        </div>
      </div>
      <div className="flex justify-end mr-10 text-navBg/70 mt-5 items-center gap-1">
        <FaPrint />
        <button type="button" onClick={downloadPDF}>
          PDF
        </button>
      </div>
      <div className="overflow-x-auto" id="laporan">
        <div className="flex justify-center px-36 mb-2">
          <img src={Logo} width={"100%"} />
        </div>
        <div className="">
          {/* <DataTable columns={columns} data={reservation} pagination /> */}
          <div className="text-navBg flex justify-center text-sm">
            <table className="">
              <thead>
                <tr className="border h-12 bg-mikado-yellow">
                  <th className="border w-10">No</th>
                  <th className="border w-32">Kode</th>
                  <th className="border w-32">Tanggal</th>
                  <th className="border w-64">Customer</th>
                  <th className="border w-52">Asuransi</th>
                  <th className="border w-44">Kendaraan</th>
                  <th className="border w-48">Detail Kejadian</th>
                  <th className="border w-20">Total Item</th>
                  <th className="border w-32">Total Harga</th>
                </tr>
              </thead>
              <tbody>
                {reservation && reservation.length > 0 ? (
                  <>
                    {reservation?.map((item, index) => (
                      <tr className="border" key={index}>
                        <td className="border text-center h-10">
                          {index + 1}.
                        </td>
                        <td className="border text-center">
                          {item.kode_order}
                        </td>
                        <td className="border text-center">
                          {formatDate(item.order_masuk)}
                        </td>
                        <td className="border text-center">
                          {item.user.fullname} {item.user.lastname}
                        </td>
                        <td className="border text-center">
                          {item.insurance_name}
                        </td>
                        <td className="border text-center">
                          {item.car_brand} - {item.car_type}
                        </td>
                        <td className="border"></td>
                        <td className="border text-center">
                          {item.total_item}
                        </td>
                        <td className="border text-end px-1">
                          {formatPrice(item.total_price)}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr className="border">
                    <td className="border text-center">-</td>
                    <td className="border text-center">-</td>
                    <td className="border text-center">-</td>
                    <td className="border text-center">-</td>
                    <td className="border text-center">-</td>
                    <td className="border text-center">-</td>
                    <td className="border text-center">-</td>
                    <td className="border text-center">-</td>
                    <td className="border text-center">-</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestLaporan;
