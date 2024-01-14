import React from "react";
import { useQuery } from "react-query";
import { API } from "../../../config/api";

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

function ModalViewMKA({ reservID }) {
  const { data: reserv, refetchReserv } = useQuery(
    "reservationsModalMKACache",
    async () => {
      const resp = await API.get(`reservation/${reservID}`);
      return resp.data.data;
    },
    { refetchInterval: 1000 }
  );

  const { data: reservItem, refetchReservItem } = useQuery(
    "reservationItemModalMKACache",
    async () => {
      const resp = await API.get(`reservation-item-byreserv/${reservID}/yes`);
      return resp.data.data;
    },
    { refetchInterval: 1000 }
  );

  // console.log("🚀 ~ ModalViewMKA ~ reservItem:", reservItem)

  const filterStatus = (status) => {
    return reservItem?.filter((item) => item.status === status);
  };

  const filteredStatusTrue = filterStatus(true);

  return (
    <dialog id="modalViewMKA" className="modal">
      <div className="modal-box w-11/12 max-w-5xl text-navBg bg-light-silver">
        <div className="hidden">{reservID}</div>
        <h3 className="font-bold text-lg">List Items {reserv?.kode_order}</h3>
        <div className="grid grid-cols-3 gap-3 mt-2 rounded-lg bg-white py-10">
          {filteredStatusTrue?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 justify-center"
            >
              <img
                src={item.image}
                className="object-cover rounded-xl h-44 w-56 p-1 shadow-lg"
              />
              <div>
                {index + 1}. {item.demage_sub_category.name}
              </div>
              <div>{formatPrice(item.price)}</div>
            </div>
          ))}
        </div>
        <form method="dialog" className="btn btn-sm mt-5">
          <button className="text-white">OK</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ModalViewMKA;
