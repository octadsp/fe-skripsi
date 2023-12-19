import React, { useState } from "react";
import InputForm from "../../../components/Elements/InputForm";
import Header from "../../../assets/kop.png";

import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

import ErrorAlert from "../../../components/Elements/ErrorAlert";
import SuccessAlert from "../../../components/Elements/SuccessAlert";

function AddCarBrand() {
  const itemPerPage = 10;
  const nameToNumber = {};

  // State to manage form input values
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    tipe: "",
  });

  const { name, tipe } = formData;

  const [currentPage, setCurrentPage] = useState(1);

  // Fetch list of car brands using react-query
  const { data: lists, refetch } = useQuery(
    ["listCarBrandCache", currentPage],
    async () => {
      const response = await API.get(`/car-brands?page=${currentPage}`);
      return response.data.data;
    }
  );

  const { data: listAll, refetchAllBrand } = useQuery(
    "listAllCarBrandCache",
    async () => {
      const response = await API.get("/car-all-brands");
      return response.data.data;
    }
  );

  const totalPages = Math.min(2, Math.ceil(listAll.length / itemPerPage));
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const changePage = (newPage) => {
    setCurrentPage(newPage);
    refetch();
  };

  // Function to handle form input changes
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      if (name.trim() === "" || name.trim() === null) {
        const alert = <ErrorAlert title={"Name cant be empty!"} />;
        showAlert(alert, 5000);
        return;
      }
      if (tipe.trim() === "" || tipe.trim() === null) {
        const alert = <ErrorAlert title={"tipe cant be empty!"} />;
        showAlert(alert, 5000);
        return;
      }

      const response = await API.post("/car-brand", {
        name: name.trim(),
        tipe: tipe.trim(),
      });

      const alert = <SuccessAlert title={"Add Brand Success! 😊"} />;
      showAlert(alert, 5000);
      refetch();

      setFormData({
        name: "",
        tipe: "",
      });
    } catch (error) {
      const alert = <ErrorAlert title={"Add Brand Failed! ❌"} />;
      showAlert(alert, 5000);
    }
  });

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
                <div className="flex gap-5">
                  <InputForm
                    label={"Nama"}
                    placeholder={"nama mobil"}
                    name="name"
                    value={name}
                    onChange={handleOnChange}
                  />
                  <InputForm
                    label={"Tipe"}
                    placeholder={"tipe mobil"}
                    name="tipe"
                    value={tipe}
                    onChange={handleOnChange}
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

              {message && message}
            </div>
          </div>
          {/* List */}
          <div className="flex w-full h-full mb-10 gap-5 text-navBg">
            <div className="w-full px-10">
              <div className="overflow-x-auto">
                <div className="flex justify-center mb-5">
                  <h1 className="font-bold text-3xl">List Car Brand</h1>
                </div>
                <div className="w-full h-[560px]">
                  <table className="table border">
                    {/* head */}
                    <thead className="bg-mikado-yellow">
                      <tr className="text-navBg font-bold text-lg text-center">
                        {/* <th className="border w-8">ID</th> */}
                        <th className="border">Nama</th>
                        <th className="border">Tipe</th>
                        <th className="border w-48">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Render list of car brands */}
                      {lists &&
                        lists
                          .slice()
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((brand, index) => {
                            // Mendapatkan nomor berdasarkan nama
                            let number = nameToNumber[brand.name];
                            // Jika nomor belum ada, tambahkan ke objek
                            if (number === undefined) {
                              number = Object.keys(nameToNumber).length + 1;
                              nameToNumber[brand.name] = number;
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
                                  {brand.name}
                                </td>
                                <td className="border text-base">
                                  {brand.tipe}
                                </td>
                                <td className="border">
                                  <div className="flex justify-center gap-3">
                                    <button className="text-textSuccess hover:bg-textSuccess/40 hover:rounded px-1">
                                      View
                                    </button>
                                    <button className="text-info hover:bg-info/40 hover:rounded px-2">Edit</button>
                                    <button className="text-textError hover:bg-textError/40 hover:rounded px-1">
                                      Delete
                                    </button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCarBrand;
