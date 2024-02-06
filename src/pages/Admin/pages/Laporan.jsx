import React from "react";
import { useNavigate } from "react-router-dom";
import KopLogo from "../../../assets/kop.png";
import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";
import { FaPrint } from "react-icons/fa";

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

function Laporan() {
  const navigate = useNavigate();
  const handlePrint = () => {
    const printContent = document.getElementById("framePrint");
    const originalContents = document.body.innerHTML;
    const newContents = printContent.innerHTML;

    document.body.innerHTML = newContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const { data: reservation, refetch: reservRefetch } = useQuery(
    "reservListCache",
    async () => {
      const resp = await API.get(`/reservations`);
      return resp.data.data;
    }
  );

  const filterHistoryStatus = (status) => {
    return reservation?.filter((item) => item.status === status);
  };

  const filteredSelesai = filterHistoryStatus("Selesai");
  console.log("🚀 ~ Laporan ~ filteredSelesai:", filteredSelesai);

  return (
    <>
      <div id="framePrint">
        <div>
          <div className="flex justify-center mb-5">
            <img src={KopLogo} />
          </div>
          <div className="text-navBg flex justify-center">
            <table className="mx-7">
              <thead>
                <tr className="border">
                  <th className="border w-10">No</th>
                  <th className="border w-32">Kode</th>
                  <th className="border w-48">Tanggal</th>
                  <th className="border w-36">Customer</th>
                  <th className="border w-52">Asuransi</th>
                  <th className="border w-48">Kendaraan</th>
                  <th className="border w-48">Detail Kejadian</th>
                  <th className="border w-20">Total Item</th>
                  <th className="border w-32">Total Harga</th>
                </tr>
              </thead>
              <tbody>
                {filteredSelesai && filteredSelesai.length > 0 ? (
                  <>
                    {filteredSelesai?.map((item, index) => (
                      <tr className="border" key={index}>
                        <td className="border text-center">{index + 1}.</td>
                        <td className="border text-start">{item.kode_order}</td>
                        <td className="border">{item.order_masuk}</td>
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
                        <td className="border text-end">
                          {formatPrice(item.total_price)}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr className="border">
                    <td className="border">-</td>
                    <td className="border">-</td>
                    <td className="border">-</td>
                    <td className="border">-</td>
                    <td className="border">-</td>
                    <td className="border">-</td>
                    <td className="border">-</td>
                    <td className="border">-</td>
                    <td className="border">-</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-end mr-10 text-navBg/70 mt-5 items-center">
        <FaPrint />
        <button type="button" onClick={handlePrint}>
          Print
        </button>
      </div>
    </>
  );
}

export default Laporan;
