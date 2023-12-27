import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../../../components/Elements/InputFormReservation";
import SelectBoxReservation from "../../../components/Elements/SelectBoxReservation";

import { UserContext } from "../../../context/userContext";
import { API } from "../../../config/api";
import { useQuery } from "react-query";

const tahun = [
  { id: 2023, name: "2023" },
  { id: 2022, name: "2022" },
  { id: 2021, name: "2021" },
  { id: 2020, name: "2020" },
  { id: 2019, name: "2019" },
  { id: 2018, name: "2018" },
  { id: 2017, name: "2017" },
  { id: 2016, name: "2016" },
  { id: 2015, name: "2015" },
  { id: 2014, name: "2014" },
  { id: 2013, name: "2013" },
  { id: 2012, name: "2012" },
  { id: 2011, name: "2011" },
  { id: 2010, name: "2010" },
  { id: 2009, name: "2009" },
  { id: 2008, name: "2008" },
  { id: 2007, name: "2007" },
  { id: 2006, name: "2006" },
  { id: 2005, name: "2005" },
  { id: 2004, name: "2004" },
  { id: 2003, name: "2003" },
  { id: 2002, name: "2002" },
  { id: 2001, name: "2001" },
  { id: 2000, name: "2000" },
  { id: 1999, name: "1999" },
  { id: 1998, name: "1998" },
  { id: 1997, name: "1997" },
  { id: 1996, name: "1996" },
  { id: 1995, name: "1995" },
  { id: 1, name: "< 1995" },
];
function FormReservation() {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();

  const [formUser, setFormUser] = useState({
    fullname: "",
    lastname: "",
    namaTertanggung: state.user.fullname + " " + state.user.lastname,
    address: state.user.address,
    phone: state.user.phone,
  });

  const { fullname, lastname, namaTertanggung, address, phone } = formUser;

  const { data: merek, refetch: refetchMerek } = useQuery(
    "merekMobilCache",
    async () => {
      const response = await API.get("/car-all-brands");
      return response.data.data;
    }
  );

  return (
    <div className="bg-white h-full pb-10">
      <form className="flex flex-col mx-24">
        {/* Header */}
        <div className="py-3 border-b-2 border-navBg">
          <ul className="flex gap-2">
            <li className="cursor-pointer">
              <a onClick={() => navigate(-1)}>Home {">"}</a>
            </li>
            <li className="text-navBg">Reservation</li>
          </ul>
        </div>

        {/* Title */}
        <div className="py-7">
          <h1 className="text-3xl text-navBg font-medium">
            Confirm your reservation
          </h1>
        </div>

        {/* FORM Reservation */}
        <div className="flex flex-col gap-5">
          {/* Informasi Data Diri */}
          <div className="p-5 shadow-md border border-light-silver rounded-lg">
            {/* Header Title */}
            <div className="text-2xl text-navBg font-semibold mb-4">
              <h1 className="underline underline-offset-8">
                Informasi Data Diri
              </h1>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-2">
              <InputForm
                type="text"
                placeholder="xxxx"
                label="Nama Tertanggung"
                disabled={true}
                value={state.user.fullname + " " + state.user.lastname}
              />
              <InputForm
                type="text"
                placeholder="profile kosong"
                label="Alamat Lengkap"
                disabled={true}
                value={state.user.address}
              />
              <InputForm
                type="number"
                placeholder="xxxx"
                label="Nomor Handphone / Whatsapp"
                disabled={true}
                value={state.user.phone}
              />
            </div>
          </div>

          <div className="flex gap-5">
            {/* Data Kendaraan */}
            <div className="p-5 shadow-md border w-full border-light-silver rounded-lg">
              {/* Header Title */}
              <div className="text-2xl text-navBg font-semibold mb-4">
                <h1 className="underline underline-offset-8">Data Kendaraan</h1>
              </div>
              {/* Content */}
              <div className="flex flex-col gap-2">
                <SelectBoxReservation label="Merk" lists={merek} />
                <SelectBoxReservation label="Tipe" />
                <SelectBoxReservation label="Tahun" lists={tahun} />
                <InputForm type="text" placeholder="xxxx" label="Warna" />
              </div>
            </div>

            {/* Keterangan Kejadian */}
            <div className="p-5 shadow-md border w-full border-light-silver rounded-lg">
              {/* Header Title */}
              <div className="text-2xl text-navBg font-semibold mb-4">
                <h1 className="underline underline-offset-8">
                  Keterangan - Keterangan Kejadian
                </h1>
              </div>
              {/* Content */}
              <div className="flex flex-col gap-2">
                <InputForm
                  type="date"
                  placeholder="xxxx"
                  label="Tanggal Kejadian"
                />
                <InputForm type="text" placeholder="xxxx" label="Tempat" />
                <InputForm type="time" placeholder="xxxx" label="Jam" />
                <InputForm
                  type="number"
                  placeholder="xxxx"
                  label="Kecepatan ( km/jam )"
                />
              </div>
            </div>
          </div>

          {/* Nama Pengemudi Kendaraan */}
          <div className="p-5 shadow-md border border-light-silver rounded-lg">
            {/* Header Title */}
            <div className="text-2xl text-navBg font-semibold mb-4">
              <h1 className="underline underline-offset-8">
                Nama Pengemudi Kendaraan
              </h1>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-2">
              <InputForm type="text" placeholder="xxxx" label="Nama Lengkap" />
              <div className="flex gap-5">
                <SelectBoxReservation label="Hubungan dengan tertanggung" />
                <InputForm type="number" placeholder="xxxx" label="Umur" />
              </div>
              <div className="flex gap-5">
                <InputForm type="text" placeholder="xxxx" label="Pekerjaan" />
                <SelectBoxReservation label="Jenis Golongan SIM" />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-center mt-5">
        <button className="btn btn-wide text-white font-bold">Submit</button>
      </div>
    </div>
  );
}

export default FormReservation;
