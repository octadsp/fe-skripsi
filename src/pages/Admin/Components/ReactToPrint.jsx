import React, { useRef } from "react";
import Logo from "../../../assets/kop.png";
import { useReactToPrint } from "react-to-print";
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

function ReactToPrint({ reservation, showOwner }) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Visitor Pass",
    onAfterPrint: () => console.log("Printed PDF successfully!"),
  });
  console.log(showOwner);

  const getTotalPrice = (reservations) => {
    let totalPrice = 0;
    reservations.forEach((item) => {
      totalPrice += item.total_price;
    });
    return totalPrice;
  };

  return (
    <>
      <div className="flex justify-end mr-10 text-navBg/70 mt-5 items-center gap-1">
        <FaPrint />
        <button type="button" onClick={handlePrint}>
          Print
        </button>
      </div>
      <div className="overflow-x-auto" ref={componentRef} id="laporan">
        <div className="flex justify-center px-36 mb-2">
          <img src={Logo} width={"100%"} />
        </div>
        <div className="mx-5">
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
              <tfoot>
                <tr className="border">
                  <td className=" text-bold"></td>
                  <td className=" text-bold">Jumlah</td>
                  <td className=" text-bold"></td>
                  <td className=" text-bold"></td>
                  <td className=" text-bold"></td>
                  <td className=" text-bold"></td>
                  <td className=" text-bold"></td>
                  <td className=" text-bold"></td>
                  <td className="text-center">
                    {formatPrice(getTotalPrice(reservation))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className={showOwner ? "" : "hidden"}>
          <div className="flex justify-end my-20 mr-5">
            <div className="">
              Tangerang,...................................
            </div>
          </div>
          <div className="flex flex-col items-end pr-5">
            <div className="flex flex-col items-center">
              <div className="underline">Euis Indriawati</div>
              <div>Manager Operasional</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReactToPrint;
