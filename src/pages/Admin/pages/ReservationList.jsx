import React, { useState } from "react";
import InputForm from "../../../components/Elements/InputForm";
import Header from "../../../assets/kop.png";

import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

import ErrorAlert from "../../../components/Elements/ErrorAlert";
import SuccessAlert from "../../../components/Elements/SuccessAlert";

function formatDateAndTime(inputDateString) {
  const inputDate = new Date(inputDateString);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return new Intl.DateTimeFormat("id-ID", options).format(inputDate);
}

function ReservationList() {
  const { data: reservation, refetch: reservRefetch } = useQuery(
    "reservListCache",
    async () => {
      const resp = await API.get(`/reservations`);
      return resp.data.data;
    }
  );
  // console.log(
  //   "🚀 ~ file: ReservationList.jsx:13 ~ ReservationList ~ reservation:",
  //   reservation
  // );
  return (
    <>
      <div className="flex justify-center mb-20 mt-5">
        <img src={Header} />
      </div>
      <div className="flex m-16 gap-5 text-navBg">
        <div className="overflow-x-auto w-full">
          <div className="flex justify-center mb-10">
            <h1 className="font-bold text-3xl">List Reservasi</h1>
          </div>
          <table className="table border">
            {/* head */}
            <thead className="bg-mikado-yellow">
              <tr className="text-navBg font-bold text-lg text-center">
                <th className="border w-8">No</th>
                <th className="border">Kode Order</th>
                <th className="border">Status</th>
                <th className="border">Tanggal Order Masuk</th>
                <th className="border">Nama Customer</th>
                <th className="border">Perusahaan</th>
                <th className="border">Kendaraan</th>
                <th className="border">Asuransi</th>
                <th className="border">Item</th>
                <th className="border">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservation &&
                reservation?.map((item, index) => (
                  <tr key={index}>
                    <th className="border">1</th>
                    <th className="border">{item.kode_order}</th>
                    <th className="border">{item.status}</th>
                    <th className="border">
                      {formatDateAndTime(item.order_masuk)}
                    </th>
                    <th className="border">
                      {item.user.fullname} {item.user.lastname}
                    </th>
                    <th className="border">{item.user.institute}</th>
                    <th className="border">
                      {item.car_brand} {item.car_type}
                    </th>
                    <th className="border">
                      {item.insurance_name || "Tidak Pakai"}
                    </th>
                    <th className="border">{item.reservation_item.item}</th>
                    <th className="border text-center">
                      <button className="bg-textSuccess p-1 rounded-lg">
                        View
                      </button>
                      <button className="bg-textSuccess p-1 rounded-lg">
                        View
                      </button>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ReservationList;
