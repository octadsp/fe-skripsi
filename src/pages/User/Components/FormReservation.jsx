import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../../../components/Elements/InputFormReservation";
import SelectBoxReservation from "../../../components/Elements/SelectBoxReservation";
import CheckBox from "../../../components/Elements/CheckBox";

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

const asuransi = [
  {
    id: 1,
    kode: "ASR01",
    tipe: "Asuransi",
    name: "Sompo Insurance Indonesia",
  },
  { id: 2, kode: "ASR02", tipe: "Asuransi", name: "Bumida" },
  { id: 3, kode: "ASR03", tipe: "Asuransi", name: "KSK" },
  { id: 4, kode: "ASR04", tipe: "Asuransi", name: "KB" },
  { id: 5, kode: "ASR05", tipe: "Asuransi", name: "Binagriya" },
];

function FormReservation() {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  const [selectedBrandId, setSelectedBrandId] = useState(0);

  const [formNo, setFormNo] = useState({
    userId: state?.user.id,
    namaTertanggung: "",
    address: "",
    phone: "",
    merk: "",
    tipe: "",
    tahun: "",
    warna: "",
  });

  const [formVehicle, setFormVehicle] = useState({
    car_brand: "",
    car_type: "",
    year: "",
    color: "",
  });

  const { data: merek, refetch: refetchMerek } = useQuery(
    "merekMobilCache",
    async () => {
      const response = await API.get("/car-all-brands");
      return response.data.data;
    }
  );

  const { data: type, refetch: refetchType } = useQuery(
    "typeMobilCache",
    async () => {
      const resp = await API.get(`/car-class-brand/${selectedBrandId}`);
      return resp.data.data;
    }
  );

  const handleIsChecked = (isChecked) => {
    setIsChecked(isChecked);
  };

  const handleBrandChange = (value) => {
    setSelectedBrandId(value);
  };

  const handleSelectChange = (e) => {
    onChange && onChange(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      await refetchType();
    };

    if (selectedBrandId !== 0) {
      fetchData();
    }
  }, [selectedBrandId]);

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

        {/* CHECKBOX */}
        <div className="flex flex-col mb-3">
          <div>
            <p>Apakah anda ingin menggunakan Asuransi?</p>
          </div>
          <div className="flex">
            <CheckBox
              text={"Yes"}
              checked={isChecked}
              onChange={(isChecked) => handleIsChecked(isChecked)}
            />
            <CheckBox
              text={"No"}
              checked={!isChecked}
              onChange={(isChecked) => handleIsChecked(!isChecked)}
            />
          </div>
        </div>
        {/* END CHECKBOX */}

        {/* FORM Reservation */}
        <div className="flex flex-col gap-5">
          {/* CONTENT YES */}
          {isChecked && (
            <form className="flex flex-col gap-5">
              {/* Informasi Data Diri */}
              <section className="p-5 shadow-md border border-light-silver rounded-lg">
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
              </section>
              <section className="flex flex-col gap-5">
                {/* Data Asuransi */}
                <div>
                  <SelectBoxReservation
                    label={"Pilih Asuransi"}
                    lists={asuransi}
                  />
                </div>
                {/* END Data Asuransi */}

                <div className="flex gap-5">
                  {/* Data Kendaraan */}
                  <div className="p-5 shadow-md border w-full border-light-silver rounded-lg">
                    {/* Header Title */}
                    <div className="text-2xl text-navBg font-semibold mb-4">
                      <h1 className="underline underline-offset-8">
                        Data Kendaraan
                      </h1>
                    </div>
                    {/* Content */}
                    <div className="flex flex-col gap-2">
                      <SelectBoxReservation
                        label="Merk"
                        lists={merek}
                        onChange={(value) => handleBrandChange(value)}
                      />
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm text-navBg">Tipe</label>
                        <select
                          onChange={""}
                          className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                        >
                          {type && type.length > 0 ? (
                            <>
                              <option disabled selected hidden>
                                Choose your option...
                              </option>
                              {type.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.car_type.name} {item.car_type.tipe}
                                </option>
                              ))}
                            </>
                          ) : (
                            <option disabled selected>
                              Tipe Mobil Kosong
                            </option>
                          )}
                        </select>
                      </div>
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
                      <InputForm
                        type="text"
                        placeholder="xxxx"
                        label="Tempat"
                      />
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
                    <InputForm
                      type="text"
                      placeholder="xxxx"
                      label="Nama Lengkap"
                    />
                    <div className="flex gap-5">
                      <SelectBoxReservation label="Hubungan dengan tertanggung" />
                      <InputForm
                        type="number"
                        placeholder="xxxx"
                        label="Umur"
                      />
                    </div>
                    <div className="flex gap-5">
                      <InputForm
                        type="text"
                        placeholder="xxxx"
                        label="Pekerjaan"
                      />
                      <SelectBoxReservation label="Jenis Golongan SIM" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <button className="btn btn-wide bg-navBg/50 hover:bg-navBg text-white/50 hover:text-white font-bold">
                    Submit
                  </button>
                </div>
              </section>
            </form>
          )}
          {/* END CONTENT YES */}

          {/* CONTENT NO */}
          {!isChecked && (
            <form className="flex flex-col gap-5">
              {/* Informasi Data Diri */}
              <section className="p-5 shadow-md border border-light-silver rounded-lg">
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
              </section>
              <section className="flex flex-col gap-5">
                {/* Data Kendaraan */}
                <div className="p-5 shadow-md border w-full border-light-silver rounded-lg">
                  {/* Header Title */}
                  <div className="text-2xl text-navBg font-semibold mb-4">
                    <h1 className="underline underline-offset-8">
                      Data Kendaraan
                    </h1>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm text-navBg">Merek</label>
                      <select
                        onChange={(value) => handleBrandChange(value)}
                        className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                      >
                        <option disabled selected hidden>
                          Choose your option...
                        </option>
                        {merek?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm text-navBg">Tipe</label>
                      <select
                        onChange={""}
                        className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                      >
                        {type && type.length > 0 ? (
                          <>
                            <option disabled selected hidden>
                              Pilih tipe
                            </option>
                            {type?.map((item) => (
                              <option key={item.id} value={item.name}>
                                {item.car_type.name} {item.car_type.tipe}
                              </option>
                            ))}
                          </>
                        ) : (
                          <option disabled selected>
                            Tipe Mobil Kosong
                          </option>
                        )}
                      </select>
                    </div>
                    <SelectBoxReservation label="Tahun" lists={tahun} />
                    <InputForm type="text" placeholder="xxxx" label="Warna" />
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <button className="btn btn-wide bg-navBg/50 hover:bg-navBg text-white/50 hover:text-white font-bold">
                    Submit
                  </button>
                </div>
              </section>
            </form>
          )}
          {/* END CONTENT NO */}
        </div>
      </form>
    </div>
  );
}

export default FormReservation;
