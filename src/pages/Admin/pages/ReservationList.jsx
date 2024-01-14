import React, { useState } from "react";
import InputForm from "../../../components/Elements/InputForm";
import Header from "../../../assets/kop.png";

import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

import ErrorAlert from "../../../components/Elements/ErrorAlert";
import SuccessAlert from "../../../components/Elements/SuccessAlert";
import ModalReject from "../Components/ModalReject";
import ModalUpload from "../Components/ModalUpload";
import ModalView from "../Components/ModalView";

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
  const [openTab, setOpenTab] = useState(1);
  const [prosesTab, setProsesTab] = useState(1);
  const [rejectUserID, setRejectUserID] = useState(1);
  const [uploadID, setUploadID] = useState(null);
  const [viewModal, setViewModal] = useState(1);

  const { data: reservation, refetch: reservRefetch } = useQuery(
    "reservListCache",
    async () => {
      const resp = await API.get(`/reservations`);
      return resp.data.data;
    }
  );

  const { data: reservBySubBD, refetch: reservBySubBDRefetch } = useQuery(
    "reservBySubBDCache",
    async () => {
      const resp = await API.get("/reservation-substatus/bd");
      return resp.data.data;
    }
  );
  const { data: reservBySubMKC, refetch: reservBySubMKCRefetch } = useQuery(
    "reservBySubMKCCache",
    async () => {
      const resp = await API.get("/reservation-substatus/mkc");
      return resp.data.data;
    }
  );
  const { data: reservBySubMKA, refetch: reservBySubMKARefetch } = useQuery(
    "reservBySubMKACache",
    async () => {
      const resp = await API.get("/reservation-substatus/mka");
      return resp.data.data;
    }
  );
  const { data: reservBySubSD, refetch: reservBySubSDRefetch } = useQuery(
    "reservBySubSDCache",
    async () => {
      const resp = await API.get("/reservation-substatus/sd");
      return resp.data.data;
    }
  );

  const handleSubmitApprove = async (e) => {
    try {
      const resp = await API.patch(`/reservation-status/${e}`, {
        status: "Proses",
        sub_status: "bd",
      });

      alert("Success Approved!");
    } catch (error) {
      console.log("Error Approved :", error);
    }
  };

  const filterHistoryStatus = (status) => {
    return reservation?.filter((item) => item.status === status);
  };

  const filteredPending = filterHistoryStatus("Pending");
  const filteredSelesai = filterHistoryStatus("Selesai");

  const handleRejectButton = (userID) => {
    document.getElementById("modalReject").showModal();
    setRejectUserID(userID);
  };

  const handleUploadButton = (reservID) => {
    document.getElementById("modalUpload").showModal();
    setUploadID(reservID);
  };

  const handleViewButton = (reservID) => {
    document.getElementById("modalView").showModal();
    setViewModal(reservID);
  };

  return (
    <>
      <div className="flex justify-center mb-20 mt-5">
        <img src={Header} />
      </div>

      <div className="flex justify-center mb-10">
        <h1 className="font-bold text-3xl text-navBg">List Reservasi</h1>
      </div>
      <div className="flex flex-col m-16 gap-5 text-navBg">
        {/* TAB NAVIGATOR */}
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

        {/* LIST PENDING */}
        <div
          className={
            openTab === 1 ? "block overflow-x-auto w-full mt-10" : "hidden"
          }
        >
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
                <th className="border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPending && filteredPending.length > 0 ? (
                <>
                  {filteredPending?.map((item, index) => (
                    <tr key={index}>
                      <th className="border">{index + 1}</th>
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
                      <th className="border text-center">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRejectButton(item.id)}
                            className="bg-textError/80 hover:bg-textError text-navBg/70 hover:text-white py-1 px-3 rounded-lg"
                          >
                            Reject
                          </button>
                          <ModalReject reservID={rejectUserID} />
                          <button
                            onClick={() => handleSubmitApprove(item.id)}
                            type="submit"
                            className="bg-textSuccess/80 hover:bg-textSuccess text-navBg/70 hover:text-white py-1 px-2 rounded-lg"
                          >
                            Approved
                          </button>
                        </div>
                      </th>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  <tr className="text-center">
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">
                      <div className="text-center">-</div>
                    </th>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* LIST PROSES */}
        <div
          className={
            openTab === 2 ? "block overflow-x-auto w-full mt-10" : "hidden"
          }
        >
          <ul className="flex justify-center mb-10">
            <li>
              <a
                onClick={() => setProsesTab(1)}
                className={
                  prosesTab === 1
                    ? "border-b-2 px-10 py-2 bg-light-silver/10 rounded-t-box cursor-pointer"
                    : "px-10 py-2 text-navBg/50 cursor-pointer"
                }
              >
                Belum dicek
              </a>
            </li>
            <li>
              <a
                onClick={() => setProsesTab(2)}
                className={
                  prosesTab === 2
                    ? "border-b px-10 py-2 bg-light-silver/10 rounded-t-box cursor-pointer"
                    : "px-10 py-2 text-navBg/50 cursor-pointer"
                }
              >
                Menunggu konfirmasi customer
              </a>
            </li>
            <li>
              <a
                onClick={() => setProsesTab(3)}
                className={
                  prosesTab === 3
                    ? "border-b px-10 py-2 bg-light-silver/10 rounded-t-box cursor-pointer"
                    : "px-10 py-2 text-navBg/50 cursor-pointer"
                }
              >
                Menunggu konfirmasi admin
              </a>
            </li>
            <li>
              <a
                onClick={() => setProsesTab(4)}
                className={
                  prosesTab === 4
                    ? "border-b px-10 py-2 bg-light-silver/10 rounded-t-box cursor-pointer"
                    : "px-10 py-2 text-navBg/50 cursor-pointer"
                }
              >
                Sedang diproses
              </a>
            </li>
          </ul>

          {/* BELUM DICEK */}
          <div className={prosesTab === 1 ? "block" : "hidden"}>
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
                  <th className="border">Action</th>
                </tr>
              </thead>
              <tbody>
                {reservBySubBD && reservBySubBD.length > 0 ? (
                  <>
                    {reservBySubBD?.map((item, index) => (
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
                        <th className="border text-center">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUploadButton(item.id)}
                              className="bg-light-silver hover:bg-lightGreen py-1 px-2 rounded-lg"
                            >
                              Upload
                            </button>
                            <ModalUpload reservID={uploadID} />
                            <button
                              onClick={() => handleViewButton(item.id)}
                              className="bg-light-silver hover:bg-info py-1 px-2 rounded-lg"
                            >
                              View
                            </button>
                            <ModalView reservID={viewModal} />
                          </div>
                        </th>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    <tr className="text-center">
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">
                        <div className="text-center">-</div>
                      </th>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* MENUNGGU KONFIRMASI CUSTOMER */}
          <div className={prosesTab === 2 ? "block" : "hidden"}>
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
                  <th className="border">Action</th>
                </tr>
              </thead>
              <tbody>
                {reservBySubMKC && reservBySubMKC.length > 0 ? (
                  <>
                    {reservBySubMKC?.map((item, index) => (
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
                        <th className="border text-center">
                          <div className="flex gap-2">
                            <button className="bg-textSuccess p-1 rounded-lg">
                              View
                            </button>
                            <button className="bg-textSuccess p-1 rounded-lg">
                              View
                            </button>
                          </div>
                        </th>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    <tr className="text-center">
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">
                        <div className="text-center">-</div>
                      </th>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* MENUNGGU KONFIRMASI ADMIN */}
          <div className={prosesTab === 3 ? "block" : "hidden"}>
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
                  <th className="border">Action</th>
                </tr>
              </thead>
              <tbody>
                {reservBySubMKA && reservBySubMKA.length > 0 ? (
                  <>
                    {reservBySubMKA?.map((item, index) => (
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
                        <th className="border text-center">
                          <div className="flex gap-2">
                            <button className="bg-textSuccess p-1 rounded-lg">
                              View
                            </button>
                            <button className="bg-textSuccess p-1 rounded-lg">
                              View
                            </button>
                          </div>
                        </th>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    <tr className="text-center">
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">
                        <div className="text-center">-</div>
                      </th>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* SEDANG DIPROSES */}
          <div className={prosesTab === 4 ? "block" : "hidden"}>
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
                  <th className="border">Action</th>
                </tr>
              </thead>
              <tbody>
                {reservBySubSD && reservBySubSD.length > 0 ? (
                  <>
                    {reservBySubSD?.map((item, index) => (
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
                        <th className="border text-center">
                          <div className="flex gap-2">
                            <button className="bg-textSuccess p-1 rounded-lg">
                              View
                            </button>
                            <button className="bg-textSuccess p-1 rounded-lg">
                              View
                            </button>
                          </div>
                        </th>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    <tr className="text-center">
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">-</th>
                      <th className="border">
                        <div className="text-center">-</div>
                      </th>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* LIST SELESAI */}
        <div
          className={
            openTab === 3 ? "block overflow-x-auto w-full mt-10" : "hidden"
          }
        >
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
                <th className="border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSelesai && filteredSelesai.length > 0 ? (
                <>
                  {filteredSelesai?.map((item, index) => (
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
                      <th className="border text-center">
                        <div className="flex gap-2">
                          <button className="bg-textSuccess p-1 rounded-lg">
                            View
                          </button>
                          <button className="bg-textSuccess p-1 rounded-lg">
                            View
                          </button>
                        </div>
                      </th>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  <tr className="text-center">
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">-</th>
                    <th className="border">
                      <div className="text-center">-</div>
                    </th>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ReservationList;
