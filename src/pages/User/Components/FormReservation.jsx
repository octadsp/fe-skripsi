import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../../../components/Elements/InputFormReservation";
import SelectBoxReservation from "../../../components/Elements/SelectBoxReservation";
import CheckBox from "../../../components/Elements/CheckBox";
import SuccessAlert from "../../../components/Elements/SuccessAlert";
import ErrorAlert from "../../../components/Elements/ErrorAlert";

import { UserContext } from "../../../context/userContext";
import { API } from "../../../config/api";
import { useQuery, useMutation } from "react-query";

const tahun = Array.from({ length: 28 }, (_, index) => {
  const year = 2023 - index;
  return { id: year, name: year.toString() };
});

const asuransi = [
  {
    id: 1,
    kode: "ASR001",
    tipe: "Asuransi",
    name: "Sompo Insurance Indonesia",
  },
  { id: 2, kode: "ASR002", tipe: "Asuransi", name: "Bumida" },
  { id: 3, kode: "ASR003", tipe: "Asuransi", name: "KSK" },
  { id: 4, kode: "ASR004", tipe: "Asuransi", name: "KB" },
  { id: 5, kode: "ASR005", tipe: "Asuransi", name: "Binagriya" },
  { id: 5, kode: "ASR006", tipe: "Asuransi", name: "Tugu Pratama" },
  { id: 5, kode: "ASR007", tipe: "Asuransi", name: "Reliance Indonesia" },
  { id: 5, kode: "ASR008", tipe: "Asuransi", name: "MNC" },
  { id: 5, kode: "ASR009", tipe: "Asuransi", name: "Malacca" },
  { id: 5, kode: "ASR010", tipe: "Asuransi", name: "Harta" },
  { id: 5, kode: "ASR011", tipe: "Asuransi", name: "Kresna Mitra" },
  { id: 5, kode: "ASR012", tipe: "Asuransi", name: "Tugu Kresna" },
];

const sim = [
  { id: 1, name: "SIM A", tipe: "Mobil Kecil", status: "A" },
  { id: 2, name: "SIM B1", tipe: "Mobil Besar", status: "A" },
  { id: 3, name: "SIM B2", tipe: "Mobil Truck", status: "A" },
  { id: 4, name: "SIM C", tipe: "Motor", status: "A" },
  { id: 5, name: "SIM D", tipe: "Kendaraan Khusus", status: "A" },
];

const hubungan = [
  { id: 1, name: "Ayah", status: "A" },
  { id: 2, name: "Ibu", status: "A" },
  { id: 3, name: "Kakak", status: "A" },
  { id: 4, name: "Adik", status: "A" },
  { id: 5, name: "Saudara", status: "A" },
];

function FormReservation() {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [messageError, setMessageError] = useState(null);

  const [isChecked, setIsChecked] = useState(true);

  const [selectedBrandId, setSelectedBrandId] = useState(0);
  const [isBrandSelected, setIsBrandSelected] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(0);

  const [formNo, setFormNo] = useState({
    userId: state?.user.id,
    namaTertanggung: state?.user.fullname + state?.user.lastname,
    address: state?.user.address,
    phone: state?.user.phone,
    merk: "",
    tipe: "",
    tahun: "",
    warna: "",
    asuransi: "",
    tanggal: "",
    tempat: "",
    jam: "",
    kecepatan: "",
    namaLengkap: "",
    hubungan: "",
    umur: "",
    pekerjaan: "",
    sim: "",
  });

  const [formItem, setFormItem] = useState({
    item: "",
    image: "",
    price: 0,
  });

  const showAlert = (alertComponent, timeout) => {
    setMessage(alertComponent);

    // Setelah timeout, atur pesan kembali menjadi null
    setTimeout(() => {
      setMessage(null);
    }, timeout);
  };
  const showAlertError = (alertComponent, timeout) => {
    setMessageError(alertComponent);

    // Setelah timeout, atur pesan kembali menjadi null
    setTimeout(() => {
      setMessageError(null);
    }, timeout);
  };

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

  // const { data: classData, refetch: refetchClass } = useQuery(
  //   "classMobilCache",
  //   async () => {
  //     const resp = await API.get(`/car-class/${selectedClassId}`);
  //     const data = resp.data.data;
  //     updateFormNo(data);
  //     return data;
  //   }
  // );

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

  const handleAsuransiChange = (e) => {
    const value = e.target.value;
    setFormNo((prevFormNo) => ({
      ...prevFormNo,
      asuransi: value,
    }));
  };

  const handleHubunganChange = (e) => {
    const value = e.target.value;
    setFormNo((prevFormNo) => ({
      ...prevFormNo,
      hubungan: value,
    }));
  };

  const handleSimChange = (e) => {
    const value = e.target.value;
    setFormNo((prevFormNo) => ({
      ...prevFormNo,
      sim: value,
    }));
  };

  const handleInputOnChange = (e) => {
    const { name, value } = e.target;

    setFormNo((prevFormNo) => ({
      ...prevFormNo,
      [name]: value,
    }));
  };

  const generateOrderCode = async () => {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear().toString().slice(-2);

    // Extract only the date part (YYYY-MM-DD) from the ISO string
    const datePart = currentDate.toISOString().split("T")[0];

    const resp = await API.get(`/reservation-count?date=${datePart}`);
    const orderCount = resp.data.count + 1;

    const formattedOrderCount = orderCount.toString().padStart(4, "0");

    const orderCode = `RES${dayOfMonth}${month}${year}-${formattedOrderCount}`;

    return orderCode;
  };

  useEffect(() => {
    generateOrderCode();
  }, [5000]);

  // console.log("ini hasil res code :", generateOrderCode());

  const handleSubmitNon = useMutation(async (e) => {
    try {
      e.preventDefault();
      const orderCode = await generateOrderCode();

      const currentTime = new Date(); // Get the current time
      const formattedTime = currentTime.toISOString(); // Format the time as needed

      const respNotif = await API.post("/notification", {
        user_id: formNo.userId,
        title: "Success Reservasi",
        message: `Success melakukan reservasi kendaraan ${formNo.merk} dengan tipe ${formNo.tipe}`,
      });

      const resp = await API.post("/reservation", {
        kode_order: orderCode,
        status: "Pending",
        order_masuk: formattedTime,
        user_id: formNo.userId,
        car_brand: formNo.merk.trim(),
        car_type: formNo.tipe,
        car_year: formNo.tahun.trim(),
        car_color: formNo.warna.trim(),
        is_insurance: 0,
      });

      console.log(resp.data.data);

      const alert = <SuccessAlert title={"Reservation Success! 😊"} />;
      showAlert(alert, 5000);

      setTimeout(() => {
        navigate("/landing-page");
      }, 6000);
    } catch (error) {
      const alert = (
        <ErrorAlert title={"Reservation Failed! please try again 😥"} />
      );
      showAlert(alert, 5000);
      console.log("reservation failed : ", error);
    }
  });

  const handleSubmitYes = useMutation(async (e) => {
    try {
      e.preventDefault();
      const orderCode = await generateOrderCode();

      const currentTime = new Date(); // Get the current time
      const formattedTime = currentTime.toISOString(); // Format the time as needed

      if (formNo.asuransi.trim() === "" || formNo.asuransi.trim() === null) {
        const alert = (
          <div className="px-64">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Asuransi tidak boleh kosong!</span>
            </div>
          </div>
        );
        showAlertError(alert, 5000);
        return;
      }
      if (selectedBrandId === 0 || selectedBrandId === null) {
        const alert = (
          <div className="px-64">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Merek tidak boleh kosong!</span>
            </div>
          </div>
        );
        showAlertError(alert, 5000);
        return;
      }
      if (isBrandSelected === false || isBrandSelected === null) {
        const alert = (
          <div className="px-64">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Tipe tidak boleh kosong!</span>
            </div>
          </div>
        );
        showAlertError(alert, 5000);
        return;
      }
      if (formNo.tahun.trim() === "" || formNo.tahun.trim() === null) {
        const alert = (
          <div className="px-64">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Tahun tidak boleh kosong!</span>
            </div>
          </div>
        );
        showAlertError(alert, 5000);
        return;
      }
      if (formNo.warna.trim() === "" || formNo.warna.trim() === null) {
        const alert = (
          <div className="px-64">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Warna tidak boleh kosong!</span>
            </div>
          </div>
        );
        showAlertError(alert, 5000);
        return;
      }
      if (formNo.tanggal.trim() === "" || formNo.tanggal.trim() === null) {
        const alert = (
          <div className="px-64">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Tanggal tidak boleh kosong!</span>
            </div>
          </div>
        );
        showAlertError(alert, 5000);
        return;
      }
      if (formNo.tempat.trim() === "" || formNo.tempat.trim() === null) {
        const alert = (
          <div className="px-64">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Tempat tidak boleh kosong!</span>
            </div>
          </div>
        );
        showAlertError(alert, 5000);
        return;
      }
      if (formNo.jam.trim() === "" || formNo.jam.trim() === null) {
        const alert = (
          <div className="px-64">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Jam tidak boleh kosong!</span>
            </div>
          </div>
        );
        showAlertError(alert, 5000);
        return;
      }
      if (
        formNo.namaLengkap.trim() === "" ||
        formNo.namaLengkap.trim() === null
      ) {
        const alert = (
          <div className="px-64">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Nama Pengemudi tidak boleh kosong!</span>
            </div>
          </div>
        );
        showAlertError(alert, 5000);
        return;
      }
      if (formNo.hubungan.trim() === "" || formNo.hubungan.trim() === null) {
        const alert = (
          <div className="px-64">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Hubungan pengemudi tidak boleh kosong!</span>
            </div>
          </div>
        );
        showAlertError(alert, 5000);
        return;
      }
      if (formNo.pekerjaan.trim() === "" || formNo.pekerjaan.trim() === null) {
        const alert = (
          <div className="px-64">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Pekerjaan tidak boleh kosong!</span>
            </div>
          </div>
        );
        showAlertError(alert, 5000);
        return;
      }
      if (formNo.umur.trim() === "" || formNo.umur.trim() === null) {
        const alert = (
          <div className="px-64">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Umur tidak boleh kosong!</span>
            </div>
          </div>
        );
        showAlertError(alert, 5000);
        return;
      }
      if (formNo.sim.trim() === "" || formNo.sim.trim() === null) {
        const alert = (
          <div className="px-64">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>SIM tidak boleh kosong!</span>
            </div>
          </div>
        );
        showAlertError(alert, 5000);
        return;
      }

      const respNotif = await API.post("/notification", {
        user_id: formNo.userId,
        title: "Success Reservasi",
        message: `Success melakukan reservasi kendaraan ${formNo.merk} dengan tipe ${formNo.tipe}`,
      });

      const resp = await API.post("/reservation", {
        kode_order: orderCode,
        status: "Pending",
        order_masuk: formattedTime,
        user_id: formNo.userId,
        car_brand: formNo.merk,
        car_type: formNo.tipe,
        car_year: formNo.tahun,
        car_color: formNo.warna,
        event_date: formNo.tanggal,
        place: formNo.tempat,
        time: formNo.jam,
        driver_speed: formNo.kecepatan,
        driver_name: formNo.namaLengkap,
        driver_relation: formNo.hubungan,
        driver_job: formNo.pekerjaan,
        driver_age: formNo.umur,
        driver_license: formNo.sim,
        is_insurance: 1,
        insurance_name: formNo.asuransi,
      });

      const alert = (
        <div className="px-64">
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Reservation Success! 😊</span>
          </div>
        </div>
      );
      showAlertError(alert, 3000);

      setTimeout(() => {
        navigate("/landing-page");
      }, 3000);
    } catch (error) {
      const alert = (
        <ErrorAlert title={"Reservation Failed! please try again 😥"} />
      );
      showAlert(alert, 5000);
      console.log("reservation failed : ", error);
    }
  });

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
      <div className="flex flex-col mx-24">
        {/* Header */}
        <div className="py-3 border-b-2 border-navBg">
          <ul className="flex gap-2">
            <li className="cursor-pointer">
              <a onClick={() => navigate(-1)}>Home {">"}</a>
            </li>
            <li className="text-navBg">Reservation</li>
          </ul>
        </div>
        {message && message}
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
            <form
              onSubmit={(e) => handleSubmitYes.mutate(e)}
              className="flex flex-col gap-5"
            >
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
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-sm text-navBg">
                    Asuransi <span className="text-textError">*</span>
                  </label>{" "}
                  <select
                    onChange={(e) => handleAsuransiChange(e)}
                    className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                  >
                    <option disabled selected hidden value={""}>
                      Pilih Asuransi...
                    </option>
                    {asuransi?.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
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
                        <label className="text-sm text-navBg">
                          Merek <span className="text-textError">*</span>
                        </label>
                        <select
                          onChange={(e) => handleSelectChange(e)}
                          className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                        >
                          <option disabled selected hidden value={0}>
                            Choose your option...
                          </option>
                          {merek?.map((item, index) => (
                            <option key={index} value={item.id}>
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
                              {type?.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.car_type.name} {item.car_type.tipe}
                                </option>
                              ))}
                            </>
                          ) : (
                            <option disabled selected value={false}>
                              Pilih merek terlebih dahulu
                            </option>
                          )}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm text-navBg">
                          Tahun <span className="text-textError">*</span>
                        </label>
                        <select
                          onChange={(e) => handleTahunChange(e)}
                          className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                        >
                          <option disabled selected hidden value="">
                            Pilih tahun
                          </option>
                          {tahun?.map((item, index) => (
                            <option
                              key={index}
                              value={item.id}
                              name={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-navBg text-sm">
                          Warna <span className="text-textError">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="xxxx"
                          onChange={handleWarnaChange}
                          className="bg-white rounded-md p-2 border border-light-silver shadow text-navBg"
                        ></input>
                      </div>
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
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-navBg text-sm">
                          Tanggal Kejadian{" "}
                          <span className="text-textError">*</span>
                        </label>
                        <input
                          type="date"
                          placeholder="xxxx"
                          name="tanggal"
                          onChange={handleInputOnChange}
                          className="bg-white rounded-md p-2 border border-light-silver shadow text-navBg"
                        ></input>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-navBg text-sm">
                          Tempat <span className="text-textError">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="xxxx"
                          name="tempat"
                          onChange={handleInputOnChange}
                          className="bg-white rounded-md p-2 border border-light-silver shadow text-navBg"
                        ></input>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-navBg text-sm">
                          Jam <span className="text-textError">*</span>
                        </label>
                        <input
                          type="time"
                          placeholder="xxxx"
                          name="jam"
                          onChange={handleInputOnChange}
                          className="bg-white rounded-md p-2 border border-light-silver shadow text-navBg"
                        ></input>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-navBg text-sm">
                          Kecepatan ( km/jam ){" "}
                        </label>
                        <input
                          type="number"
                          placeholder="xxxx"
                          name="kecepatan"
                          onChange={handleInputOnChange}
                          className="bg-white rounded-md p-2 border border-light-silver shadow text-navBg"
                        ></input>
                      </div>
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
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-navBg text-sm">
                        Nama Lengkap <span className="text-textError">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="xxxx"
                        name="namaLengkap"
                        onChange={handleInputOnChange}
                        className="bg-white rounded-md p-2 border border-light-silver shadow text-navBg"
                      ></input>
                    </div>
                    <div className="flex gap-5">
                      {/* <SelectBoxReservation label="Hubungan dengan tertanggung" /> */}
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm text-navBg">
                          Hubungan dengan tertanggung{" "}
                          <span className="text-textError">*</span>
                        </label>
                        <select
                          onChange={(e) => handleHubunganChange(e)}
                          className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                        >
                          <option disabled selected hidden value="">
                            Choose your option...
                          </option>
                          {hubungan?.map((item, index) => (
                            <option key={index} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-navBg text-sm">
                          Umur <span className="text-textError">*</span>
                        </label>
                        <input
                          type="number"
                          placeholder="xxxx"
                          name="umur"
                          onChange={handleInputOnChange}
                          className="bg-white rounded-md p-2 border border-light-silver shadow text-navBg"
                        ></input>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-navBg text-sm">
                          Pekerjaan <span className="text-textError">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="xxxx"
                          name="pekerjaan"
                          onChange={handleInputOnChange}
                          className="bg-white rounded-md p-2 border border-light-silver shadow text-navBg"
                        ></input>
                      </div>
                      {/* <SelectBoxReservation label="Jenis Golongan SIM" /> */}
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm text-navBg">
                          SIM (Surat Izin Mengemudi){" "}
                          <span className="text-textError">*</span>
                        </label>
                        <select
                          onChange={(e) => handleSimChange(e)}
                          className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                        >
                          <option disabled selected hidden value="">
                            Choose your option...
                          </option>
                          {sim?.map((item, index) => (
                            <option key={index} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {messageError && messageError}
                <div className="flex justify-center">
                  <button
                    disabled={handleSubmitYes.isLoading}
                    type="submit"
                    className="btn btn-wide bg-navBg/50 hover:bg-navBg text-white/50 hover:text-white font-bold"
                  >
                    {handleSubmitYes.isLoading ? (
                      <p className="flex justify-center items-center text-navBg">
                        reserving
                        <span>&nbsp;</span>
                        <span className="loading loading-spinner loading-md"></span>
                      </p>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </section>
            </form>
          )}
          {/* END CONTENT YES */}

          {/* CONTENT NO */}
          {!isChecked && (
            <form
              onSubmit={(e) => handleSubmitNon.mutate(e)}
              className="flex flex-col gap-5"
            >
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
                      <label className="text-sm text-navBg">
                        Merek <span className="text-textError">*</span>
                      </label>
                      <select
                        onChange={(e) => handleSelectChange(e)}
                        className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                      >
                        <option disabled selected hidden value={0}>
                          Choose your option...
                        </option>
                        {merek?.map((item, index) => (
                          <option key={index} value={item.id}>
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
                            {type?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.car_type.name} {item.car_type.tipe}
                              </option>
                            ))}
                          </>
                        ) : (
                          <option disabled selected value={false}>
                            Pilih merek terlebih dahulu
                          </option>
                        )}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-sm text-navBg">
                        Tahun <span className="text-textError">*</span>
                      </label>
                      <select
                        onChange={(e) => handleTahunChange(e)}
                        className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
                      >
                        <option disabled selected hidden value="">
                          Pilih tahun
                        </option>
                        {tahun?.map((item, index) => (
                          <option key={index} value={item.id} name={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-navBg text-sm">
                        Warna <span className="text-textError">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="xxxx"
                        onChange={handleWarnaChange}
                        className="bg-white rounded-md p-2 border border-light-silver shadow text-navBg"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-2">
                  <div className="mb-3"></div>
                  <div>
                    <button
                      disabled={handleSubmitNon.isLoading}
                      type="submit"
                      className="btn btn-wide bg-navBg/50 hover:bg-navBg text-white/50 hover:text-white font-bold"
                    >
                      {handleSubmitNon.isLoading ? (
                        <p className="flex justify-center items-center text-navBg">
                          reserving
                          <span>&nbsp;</span>
                          <span className="loading loading-spinner loading-md"></span>
                        </p>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              </section>
            </form>
          )}
          {/* END CONTENT NO */}
        </div>
      </div>
    </div>
  );
}

export default FormReservation;
