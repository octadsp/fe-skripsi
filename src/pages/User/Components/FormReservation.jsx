import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../../../components/Elements/InputFormReservation";
import SelectBoxReservation from "../../../components/Elements/SelectBoxReservation";
import CheckBox from "../../../components/Elements/CheckBox";

import { UserContext } from "../../../context/userContext";
import { API } from "../../../config/api";
import { useQuery } from "react-query";

const tahun = Array.from({ length: 28 }, (_, index) => {
  const year = 2023 - index;
  return { id: year, name: year.toString() };
});

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
  const [isBrandSelected, setIsBrandSelected] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(0);

  const [formNo, setFormNo] = useState({
    userId: state?.user.id,
    namaTertanggung: `${state?.user.fullname} ${state?.user.lastname}`,
    address: state?.user.address,
    phone: state?.user.phone,
    merk: "",
    tipe: "",
    tahun: "",
    warna: "",
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

  const { data: classData, refetch: refetchClass } = useQuery(
    "classMobilCache",
    async () => {
      const resp = await API.get(`/car-class/${selectedClassId}`);
      const data = resp.data.data;
      updateFormNo(data);
      return data;
    }
  );

  const updateFormNo = (classData) => {
    if (classData) {
      setFormNo((prevFormNo) => ({
        ...prevFormNo,
        merk: classData.car_brand.name,
        tipe: `${classData.car_type.name} ${classData.car_type.tipe}`,
      }));
    }
  };

  const handleIsChecked = (isChecked) => {
    setIsChecked(isChecked);
  };

  const handleBrandChange = (e) => {
    setSelectedBrandId(e);
    setIsBrandSelected(true);
  };

  const handleClassChange = (e) => {
    setSelectedClassId(e);
  };

  const handleSelectChange = (e) => {
    handleBrandChange && handleBrandChange(e.target.value);
  };

  const handleSelectClassChange = (e) => {
    handleClassChange && handleClassChange(e.target.value);
  };

  const handleTahunChange = (e) => {
    const selectedTahun = e.target.value;
    setFormNo((prevFormNo) => ({
      ...prevFormNo,
      tahun: selectedTahun,
    }));
  };

  const handleWarnaChange = (e) => {
    const enteredWarna = e.target.value;
    setFormNo((prevFormNo) => ({
      ...prevFormNo,
      warna: enteredWarna,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      await refetchType();
    };

    if (selectedBrandId !== 0) {
      fetchData();
    }
  }, [selectedBrandId]);

  useEffect(() => {
    const fetchData = async () => {
      await refetchClass();
    };

    if (selectedClassId !== 0) {
      fetchData();
    }
  }, [selectedClassId]);

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
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm text-navBg">Merek</label>
                        <select
                          onChange={(e) => handleSelectChange(e)}
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
                          onChange={(e) => handleSelectClassChange(e)}
                          className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                          disabled={!isBrandSelected}
                        >
                          {type && type.length > 0 ? (
                            <>
                              <option disabled selected hidden>
                                Pilih tipe
                              </option>
                              {type?.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.car_type.name} {item.car_type.tipe}
                                </option>
                              ))}
                            </>
                          ) : (
                            <option disabled selected>
                              Pilih merek terlebih dahulu
                            </option>
                          )}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm text-navBg">Tahun</label>
                        <select
                          onChange={(e) => handleTahunChange(e)}
                          className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                        >
                          <option disabled selected hidden>
                            Pilih tahun
                          </option>
                          {tahun?.map((item) => (
                            <option
                              key={item.id}
                              value={item.id}
                              name={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <InputForm
                        type="text"
                        placeholder="xxxx"
                        label="Warna"
                        onChange={handleWarnaChange}
                      />
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
                        onChange={(e) => handleSelectChange(e)}
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
                        onChange={(e) => handleSelectClassChange(e)}
                        className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                        disabled={!isBrandSelected}
                      >
                        {type && type.length > 0 ? (
                          <>
                            <option disabled selected hidden>
                              Pilih tipe
                            </option>
                            {type?.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.car_type.name} {item.car_type.tipe}
                              </option>
                            ))}
                          </>
                        ) : (
                          <option disabled selected>
                            Pilih merek terlebih dahulu
                          </option>
                        )}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm text-navBg">Tahun</label>
                      <select
                        onChange={(e) => handleTahunChange(e)}
                        className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                      >
                        <option disabled selected hidden>
                          Pilih tahun
                        </option>
                        {tahun?.map((item) => (
                          <option
                            key={item.id}
                            value={item.id}
                            name={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <InputForm
                      type="text"
                      placeholder="xxxx"
                      label="Warna"
                      onChange={handleWarnaChange}
                    />
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
