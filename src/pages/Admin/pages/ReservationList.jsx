import React, { useState } from "react";
import InputForm from "../../../components/Elements/InputForm";
import Header from "../../../assets/kop.png";

import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

import ErrorAlert from "../../../components/Elements/ErrorAlert";
import SuccessAlert from "../../../components/Elements/SuccessAlert";

function ReservationList() {
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
                <th className="border">Jam Order Masuk</th>
                <th className="border">Jam Order Proses</th>
                <th className="border">Jam Order Selesai</th>
                <th className="border">Nama Customer</th>
                <th className="border">Kendaraan</th>
                <th className="border">Asuransi</th>
                <th className="border">Item</th>
                <th className="border">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Render list of car brands */}
              {/* {lists &&
                lists.map((brand, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "font-semibold"
                        : "font-semibold bg-light-silver"
                    }
                  >
                    <th className="border">{index + 1}</th>
                    <td className="border">{brand.car_brand.name}</td>
                    <td className="border text-center">
                      {brand.car_type.name}
                    </td>
                    <td className="border text-center">{brand.golongan}</td>
                  </tr>
                ))} */}
              <tr>
                <th className="border">1</th>
                <th className="border">GUN01</th>
                <th className="border">Proses</th>
                <th className="border">12:30</th>
                <th className="border">14:00</th>
                <th className="border">belum selesai</th>
                <th className="border">Ahmad</th>
                <th className="border">Honda Nisan</th>
                <th className="border">Central Asia</th>
                <th className="border">Bemper Depan, Kaca Spion</th>
                <th className="border text-center">
                  <button className="bg-textSuccess p-1 rounded-lg">
                    View
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ReservationList;
