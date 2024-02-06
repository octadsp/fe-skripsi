import React, { useState } from "react";
import InputForm from "../../../components/Elements/InputForm";
import Header from "../../../assets/kop.png";
import EditModal from "../../../components/Fragments/ModalEditCarClass";

import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

import ErrorAlert from "../../../components/Elements/ErrorAlert";
import SuccessAlert from "../../../components/Elements/SuccessAlert";
import { useFormAction } from "react-router-dom";

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

function AddPriceList() {
  const itemPerPage = 10;
  const nameToNumber = {};

  // State to manage form input values
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    demage_sub_category_id: 0,
    car_class_id: 0,
  });
  const [price, setPrice] = useState(0);
  const [formEdit, setFormEdit] = useState({
    id: null,
    demage_sub_category_id: null,
    demage_sub_name: "",
    car_class_id: null,
    car_class_name: "",
    price: null,
  });

  const { demage_sub_category_id, car_class_id } = formData;

  const handleOnEdit = (classCar) => {
    setFormEdit({
      id: classCar.id,
      car_brand_id: classCar.car_brand_id,
      car_type_id: classCar.car_type_id,
      golongan: classCar.golongan,
    });
    document.getElementById("my_modal_editClass").showModal();
  };

  const handleOnDelete = (classCar) => {
    setFormEdit({
      id: classCar.id,
      car_brand_id: classCar.car_brand_id,
      car_type_id: classCar.car_type_id,
      car_brand_name: classCar.car_brand.name,
      car_type_name: classCar.car_type.name,
      car_type_tipe: classCar.car_type.tipe,
      golongan: classCar.golongan,
    });
    document.getElementById("my_modal_deleteClass").showModal();
  };

  const [currentPage, setCurrentPage] = useState(1);

  // Fetch list of car brands using react-query
  const { data: lists, refetch } = useQuery(
    ["listPriceListsCache", currentPage],
    async () => {
      const response = await API.get(`/price-lists?page=${currentPage}`);
      return response.data.data;
    }
  );
  console.log("🚀 ~ AddPriceList ~ lists:", lists)

  const { data: listAll, refetch: refetchAllPrice } = useQuery(
    "listAllPriceListsCache",
    async () => {
      const response = await API.get("/price-all-lists");
      return response.data.data;
    }
    );
    console.log("🚀 ~ AddPriceList ~ listAll:", listAll)

  const { data: carClassLists, refetch: refetchCarClass } = useQuery(
    "carClassListCache",
    async () => {
      const response = await API.get("/car-all-class");
      return response.data.data;
    }
  );

  const { data: demageSubLists, refetch: refetchDemageSub } = useQuery(
    "demageSubListCache",
    async () => {
      const response = await API.get("/demage-all-subcategories");
      return response.data.data;
    }
  );

  const totalPages = Math.ceil(listAll?.length / itemPerPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const changePage = (newPage) => {
    setCurrentPage(newPage);
    refetch();
  };

  // Function to handle form input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Validate and convert to integer for specific fields
    const intValue =
      /^(demage_sub_category_id|car_class_id)$/.test(name) &&
      /^\d+$/.test(value)
        ? parseInt(value, 10)
        : value;

    setFormData({
      ...formData,
      [name]: intValue,
    });
  };

  const showAlert = (alertComponent, timeout) => {
    setMessage(alertComponent);

    // Setelah timeout, atur pesan kembali menjadi null
    setTimeout(() => {
      setMessage(null);
    }, timeout);
  };

  // Function to handle form submission
  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      // Pengecekan Form Input jangan kosong pake trim
      // if (formData.car_brand_id.trim() === "" || formData.car_brand_id === 0) {
      //   const alert = <ErrorAlert title={"Brand tidak boleh kosong!"} />;
      //   showAlert(alert, 5000);
      // }
      // if (!car_type_id || car_type_id === 0) {
      //   const alert = <ErrorAlert title={"Tipe tidak boleh kosong!"} />;
      //   showAlert(alert, 5000);
      // }
      if (price.trim() === "" || price.trim() === null) {
        const alert = <ErrorAlert title={"Harga tidak boleh kosong!"} />;
        showAlert(alert, 5000);
        return;
      }

      const response = await API.post("/price-list", {
        demage_sub_category_id,
        car_class_id,
        price: price.trim(),
      });

      const alert = <SuccessAlert title={"Tambah Harga Berhasil! 😊"} />;
      showAlert(alert, 5000);
      refetch();

      setFormData({
        demage_sub_category_id: 0,
        car_class_id: 0,
      });
      setPrice(0);
    } catch (error) {
      const alert = <ErrorAlert title={"Tambah Harga Gagal! ❌"} />;
      showAlert(alert, 5000);
      console.log("🚀 ~ handleOnSubmit ~ error:", error);
    }
  });

  const form = useFormAction();
  // Function to handle delete action
  const handleDelete = useMutation(async () => {
    try {
      // Use the formEdit.id to make an API call for deleting the brand
      await API.delete(`/car-class/${formEdit.id}`);
      const alert = <SuccessAlert title={"Delete Class Success! 😊"} />;
      showAlert(alert, 5000);
      refetch();
      setTimeout(() => {
        refetchAllClass();
      }, 1000);
      document.getElementById("my_modal_deleteClass").close();
    } catch (error) {
      const alert = <ErrorAlert title={"Delete Class Failed! ❌"} />;
      showAlert(alert, 5000);
      console.log(error);
    }
  });

  const handleChangePrice = (e) => {
    const inputValue = e.target.value.replace(/[^\d]/g, ""); // Hanya mengambil digit
    const newPrice = Number(inputValue);

    // Pastikan bahwa nilai setelah mengonversi adalah angka yang valid
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
    }
  };

  const formatedPrice = formatPrice(price);

  return (
    <>
      <div className="flex justify-center mb-20 mt-5">
        <img src={Header} />
      </div>
      <div className="">
        <div className="h-full scroll-m-10">
          {/* Input Form */}
          <div className="flex m-16 gap-5 text-navBg">
            <div className="flex flex-col w-full h-1/2 shadow-xl bg ring-1 ring-light-silver p-5 rounded-lg">
              <div className="mb-10 flex justify-center">
                <h1 className="font-bold text-3xl">Input Form</h1>
              </div>
              <form
                className="flex flex-col gap-5 text-lg"
                onSubmit={(e) => handleOnSubmit.mutate(e)}
              >
                <div className="flex w-full gap-5">
                  <div className="flex flex-col w-full">
                    <label className="label-text mb-1">
                      <span className="text-sm text-navBg">
                        Jenis Kerusakan
                      </span>
                    </label>
                    <select
                      id="demage_sub_category_id"
                      required
                      name="demage_sub_category_id"
                      onChange={handleOnChange}
                      className="text-base text-navBg bg-light-gray rounded-md p-3"
                      value={demage_sub_category_id}
                    >
                      <option value={0} disabled>
                        Pilih Kerusakan
                      </option>
                      {demageSubLists?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="label-text mb-1">
                      <span className="text-sm text-navBg">Nama Mobil</span>
                    </label>
                    <select
                      id="car_class_id"
                      name="car_class_id"
                      required
                      onChange={handleOnChange}
                      className="text-base text-navBg bg-light-gray rounded-md p-3"
                      value={car_class_id}
                    >
                      <option value={0} disabled>
                        Pilih Mobil
                      </option>
                      {carClassLists?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.car_type.name} {item.car_type.tipe}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col w-full ">
                  <label className="label-text mb-1">
                    <span className="text-sm text-navBg">Harga</span>
                  </label>
                  <input
                    value={formatedPrice}
                    name="price"
                    form="price"
                    // type="number"
                    placeholder="Rp. 000,00"
                    // min={min}
                    // minLength={minLength}
                    // max={max}
                    // maxLength={maxLength}
                    onChange={handleChangePrice}
                    className="input text-base bg-light-gray rounded-md"
                  />
                </div>
                <div className="flex justify-center mt-5">
                  <button
                    disabled={handleOnSubmit.isLoading}
                    type="submit"
                    className="btn btn-wide bg-navBg text-white"
                  >
                    {handleOnSubmit.isLoading ? (
                      <p className="flex justify-center items-center text-navBg">
                        saving
                        <span>&nbsp;</span>
                        <span className="loading loading-spinner loading-md"></span>
                      </p>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* List */}
          <div className="flex w-full h-full mb-10 gap-5 text-navBg">
            <div className="w-full px-10">
              <div className="overflow-x-auto">
                <div className="flex justify-center mb-5">
                  <h1 className="font-bold text-3xl">List Harga</h1>
                </div>
              </div>
              <div className="flex justify-center my-3">
                {pages?.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => changePage(pageNumber)}
                    className={`mx-1 px-3 py-2 bg-navBg text-white rounded ${
                      currentPage === pageNumber && "bg-gray-800"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                {message && message}
              </div>
            </div>
          </div>
          <div className="flex w-full h-full mb-10 gap-5 text-navBg">
            <div className="w-full px-10">
              <div className="overflow-x-auto">
                <div className="flex justify-center mb-5">
                  <h1 className="font-bold text-3xl">List Car Class</h1>
                </div>
                <div className="w-full h-[560px]">
                  <table className="table border">
                    {/* head */}
                    <thead className="bg-mikado-yellow">
                      <tr className="text-navBg font-bold text-lg text-center">
                        <th className="border">Nama Kerusakan</th>
                        <th className="border">Nama Mobil</th>
                        <th className="border w-44">Harga</th>
                        <th className="border w-48">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Render list of car brands */}
                      {lists &&
                        lists
                          .slice()
                          // .sort((a, b) => a.name.localeCompare(b.name))
                          .map((priceLists, index) => {
                            // Mendapatkan nomor berdasarkan nama
                            let number = nameToNumber[priceLists.name];
                            // Jika nomor belum ada, tambahkan ke objek
                            if (number === undefined) {
                              number = Object.keys(nameToNumber).length + 1;
                              nameToNumber[priceLists.name] = number;
                            }

                            return (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 0
                                    ? "font-semibold"
                                    : "font-semibold bg-light-silver"
                                }
                              >
                                {/* <th className="border text-base">{number}</th> */}
                                <td className="border text-base">
                                  {priceLists.car_brand.name}
                                </td>
                                <td className="border text-base">
                                  {priceLists.car_type.name}{" "}
                                  {priceLists.car_type.tipe}
                                </td>
                                <td className="border text-center text-base">
                                  {priceLists.golongan}
                                </td>
                                <td className="border">
                                  <div className="flex justify-center gap-3">
                                    <button
                                      className="text-white text-base bg-textSuccess/90 rounded hover:bg-textSuccess/100 hover:shadow-2xl px-4"
                                      onClick={() => handleOnEdit(priceLists)}
                                    >
                                      Edit
                                    </button>
                                    <EditModal
                                      form={formEdit}
                                      refetchParent={refetch}
                                    />
                                    <button
                                      className="text-white text-base bg-textError/80 rounded hover:bg-textError/100 hover:shadow-2xl px-2"
                                      onClick={() => handleOnDelete(priceLists)}
                                    >
                                      Delete
                                    </button>
                                    {/* MODAL DELETE */}
                                    <dialog
                                      id="my_modal_deleteClass"
                                      className="modal"
                                    >
                                      <div className="modal-box bg-white">
                                        <h3 className="font-bold text-lg border-b-2 border-light-silver pb-3">
                                          Delete Confirmation (
                                          <span className="text-textError">
                                            X
                                          </span>
                                          )
                                        </h3>
                                        <p className="py-4 px-2 mt-4 bg-textError/20 rounded-lg text-base">
                                          Are you sure want to delete the
                                          Brand&nbsp;
                                          <span className="font-bold text-lg">
                                            {formEdit.car_brand_name}&nbsp;
                                          </span>
                                          <span>and Type&nbsp;</span>
                                          <span className="font-bold text-lg">
                                            {formEdit.car_type_name}{" "}
                                            {formEdit.car_type_tipe}&nbsp;
                                          </span>
                                          ?
                                        </p>
                                        <div className="flex gap-2 justify-end mr-2 mt-4 pt-3 border-t-2 border-light-silver">
                                          <button
                                            onClick={() =>
                                              document
                                                .getElementById(
                                                  "my_modal_deleteClass"
                                                )
                                                .close()
                                            }
                                            className="text-navBg/70 hover:font-bold px-2"
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleDelete.mutate()
                                            }
                                            className="bg-textError px-6 py-2 rounded font-bold text-white hover:font-bold hover:bg-textError/80 hover:shadow"
                                          >
                                            Yes
                                          </button>
                                        </div>
                                      </div>
                                      <form
                                        method="dialog"
                                        className="modal-backdrop"
                                      >
                                        <button>close</button>
                                      </form>
                                    </dialog>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-center my-3">
                {pages?.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => changePage(pageNumber)}
                    className={`mx-1 px-3 py-2 bg-navBg text-white rounded ${
                      currentPage === pageNumber && "bg-gray-800"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                {message && message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPriceList;
