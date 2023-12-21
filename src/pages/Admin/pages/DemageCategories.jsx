import React, { useState } from "react";
import InputForm from "../../../components/Elements/InputForm";
import Header from "../../../assets/kop.png";
import EditModal from "../../../components/Fragments/ModalEditDemageCategory";

import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

import ErrorAlert from "../../../components/Elements/ErrorAlert";
import SuccessAlert from "../../../components/Elements/SuccessAlert";

function DemageCategories() {
  const itemPerPage = 10;
  const nameToNumber = {};

  // State to manage form input values
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    kode: "",
    name: "",
  });
  const [formEdit, setFormEdit] = useState({
    id: 1,
    kode: "",
    name: "",
  });

  const handleOnEdit = (demage) => {
    setFormEdit({
      id: demage.id,
      kode: demage.kode,
      name: demage.name,
    });
    document.getElementById("my_modal_editDemageCategory").showModal();
  };

  const handleOnDelete = (demage) => {
    setFormEdit({
      id: demage.id,
      kode: demage.kode,
      name: demage.name,
    });
    document.getElementById("my_modal_deleteDemageCategory").showModal();
  };

  // Function to handle delete action
  const handleDelete = useMutation(async () => {
    try {
      // Use the formEdit.id to make an API call for deleting the brand
      await API.delete(`/demage-category/${formEdit.id}`);
      const alert = (
        <SuccessAlert title={"Delete Demage Category Success! 😊"} />
      );
      showAlert(alert, 5000);
      refetch();
      setTimeout(() => {
        refetchAllBrand();
      }, 1000);
      document.getElementById("my_modal_deleteDemageCategory").close();
    } catch (error) {
      const alert = <ErrorAlert title={"Delete Demage Category Failed! ❌"} />;
      showAlert(alert, 5000);
    }
  });

  const { kode, name } = formData;

  const [currentPage, setCurrentPage] = useState(1);

  // Fetch list of car brands using react-query
  const { data: lists, refetch } = useQuery(
    ["DemageCategoryCache", currentPage],
    async () => {
      const response = await API.get(`/demage-categories?page=${currentPage}`);
      return response.data.data;
    }
  );

  const { data: listAll, refetch: refetchAllDemageCategory } = useQuery(
    "listAllDemageCategoryCache",
    async () => {
      const response = await API.get("/demage-all-categories");
      return response.data.data;
    }
  );

  const totalPages = Math.min(2, Math.ceil(listAll?.length / itemPerPage));
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
      if (kode.trim() === "" || kode.trim() === null) {
        const alert = <ErrorAlert title={"kode cant be empty!"} />;
        showAlert(alert, 5000);
        return;
      }
      if (name.trim() === "" || name.trim() === null) {
        const alert = <ErrorAlert title={"name cant be empty!"} />;
        showAlert(alert, 5000);
        return;
      }

      const response = await API.post("/demage-category", {
        kode: kode.trim(),
        name: name.trim(),
      });

      const alert = <SuccessAlert title={"Add Brand Success! 😊"} />;
      showAlert(alert, 5000);
      refetch();

      setFormData({
        kode: "",
        name: "",
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
                    label={"Kode"}
                    placeholder={"kode mobil"}
                    name="kode"
                    value={kode}
                    onChange={handleOnChange}
                  />
                  <InputForm
                    label={"Nama"}
                    placeholder={"nama mobil"}
                    name="name"
                    value={name}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="flex justify-center mt-5">
                  <button
                    disabled={handleOnSubmit?.isLoading}
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
                  <h1 className="font-bold text-3xl">List Car Brand</h1>
                </div>
                <div className="w-full h-[560px]">
                  <table className="table border">
                    {/* head */}
                    <thead className="bg-mikado-yellow">
                      <tr className="text-navBg font-bold text-lg text-center">
                        {/* <th className="border w-8">ID</th> */}
                        <th className="border">Kode</th>
                        <th className="border">Nama</th>
                        <th className="border w-48">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Render list of car brands */}
                      {lists &&
                        lists
                          .slice()
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((demage, index) => {
                            // Mendapatkan nomor berdasarkan nama
                            let number = nameToNumber[demage.name];
                            // Jika nomor belum ada, tambahkan ke objek
                            if (number === undefined) {
                              number = Object.keys(nameToNumber).length + 1;
                              nameToNumber[demage.name] = number;
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
                                  {demage.kode}
                                </td>
                                <td className="border text-base">
                                  {demage.name}
                                </td>
                                <td className="border">
                                  <div className="flex justify-center gap-3">
                                    <button
                                      className="text-white text-base bg-textSuccess/90 rounded hover:bg-textSuccess/100 hover:shadow-2xl px-4"
                                      onClick={() => handleOnEdit(demage)}
                                    >
                                      Edit
                                    </button>
                                    <EditModal
                                      form={formEdit}
                                      refetchParent={refetch}
                                    />
                                    <button
                                      className="text-white text-base bg-textError/80 rounded hover:bg-textError/100 hover:shadow-2xl px-2"
                                      onClick={() => handleOnDelete(demage)}
                                    >
                                      Delete
                                    </button>
                                    {/* MODAL DELETE */}
                                    <dialog
                                      id="my_modal_deleteDemageCategory"
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
                                          Kode&nbsp;
                                          <span className="font-bold text-lg">
                                            {formEdit.kode}&nbsp;
                                          </span>
                                          <span>and name&nbsp;</span>
                                          <span className="font-bold text-lg">
                                            {formEdit.name}&nbsp;
                                          </span>
                                          ?
                                        </p>
                                        <div className="flex gap-2 justify-end mr-2 mt-4 pt-3 border-t-2 border-light-silver">
                                          <button
                                            onClick={() =>
                                              document
                                                .getElementById(
                                                  "my_modal_deleteDemageCategory"
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

export default DemageCategories;
