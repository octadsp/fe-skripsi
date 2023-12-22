import React, { useState } from "react";
import InputForm from "../../../components/Elements/InputForm";
import Header from "../../../assets/kop.png";
import EditModal from "../../../components/Fragments/ModalEditDemageCategory";

import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

import ErrorAlert from "../../../components/Elements/ErrorAlert";
import SuccessAlert from "../../../components/Elements/SuccessAlert";

function DemageSubCategories() {
  const itemPerPage = 10;
  const nameToNumber = {};
  // State to manage form input values
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    demage_category_id: 0,
    name: "",
  });
  const [formEdit, setFormEdit] = useState({
    id: 1,
    demage_category_id: 0,
    demage_category_name: "",
    name: "",
  });

  const handleOnEdit = (demage) => {
    setFormEdit({
      id: demage.id,
      demage_category_id: demage.demage_category_id,
      name: demage.name,
    });
    document.getElementById("my_modal_editDemageSubCategory").showModal();
  };

  const handleOnDelete = (demage) => {
    setFormEdit({
      id: demage.id,
      demage_category_id: demage.demage_category_id,
      demage_category_name: demage.demage_category.name,
      name: demage.name,
    });
    document.getElementById("my_modal_deleteDemageSubCategory").showModal();
  };

  // Function to handle delete action
  const handleDelete = useMutation(async () => {
    try {
      // Use the formEdit.id to make an API call for deleting the brand
      await API.delete(`/demage-subcategory/${formEdit.id}`);
      const alert = (
        <SuccessAlert title={"Delete Demage Sub Category Success! 😊"} />
      );
      showAlert(alert, 5000);
      refetch();
      setTimeout(() => {
        refetchAllBrand();
      }, 1000);
      document.getElementById("my_modal_deleteDemageSubCategory").close();
    } catch (error) {
      const alert = (
        <ErrorAlert title={"Delete Demage Sub Category Failed! ❌"} />
      );
      showAlert(alert, 5000);
    }
  });

  const { demage_category_id, name } = formData;

  // console.log(demage_category_id);
  // console.log(name);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: lists, refetch } = useQuery(
    ["DemageSubCategoryCache", currentPage],
    async () => {
      const response = await API.get(
        `/demage-subcategories?page=${currentPage}`
      );
      return response.data.data;
    }
  );

  const { data: listAll, refetch: refetchAllDemageSubCategory } = useQuery(
    "listAllDemageSubCategoryCache",
    async () => {
      const response = await API.get("/demage-all-subcategories");
      return response.data.data;
    }
  );

  const { data: demageCategoryLists, refetch: refetchDemageCategories } =
    useQuery("demageCategoriesListCache", async () => {
      const response = await API.get("/demage-all-categories");
      return response.data.data;
    });

  const totalPages = Math.ceil(listAll?.length / itemPerPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const changePage = (newPage) => {
    setCurrentPage(newPage);
    refetch();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Validate and convert to integer for specific fields
    const intValue =
      /^(demage_category_id)$/.test(name) && /^\d+$/.test(value)
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

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      // Pengecekan Form Input jangan kosong pake trim
      if (demage_category_id == null) {
        const alert = <ErrorAlert title={"Please select a category!"} />;
        showAlert(alert, 5000);
        return;
      }
      if (name.trim() === "" || name.trim() === null) {
        const alert = <ErrorAlert title={"name cant be empty!"} />;
        showAlert(alert, 5000);
        return;
      }

      const response = await API.post("/demage-subcategory", {
        demage_category_id,
        name: name.trim(),
      });
      console.log("ini response", response);

      const alert = <SuccessAlert title={"Add Sub Category Success! 😊"} />;
      showAlert(alert, 5000);
      refetch();

      setFormData({
        demage_category_id: 0,
        name: "",
      });
    } catch (error) {
      const alert = <ErrorAlert title={"Add Sub Category Failed! ❌"} />;
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
                <div className="flex w-full gap-5">
                  <div className="flex flex-col w-full">
                    <label className="label-text mb-1">
                      <span className="text-sm text-navBg">Kategori</span>
                    </label>
                    <select
                      id="demage_category_id"
                      required
                      name="demage_category_id"
                      onChange={handleOnChange}
                      className="text-base text-navBg bg-light-gray rounded-md p-3"
                      value={demage_category_id}
                    >
                      <option value={0} disabled>
                        Pilih Kategori
                      </option>
                      {demageCategoryLists?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.kode}. {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <InputForm
                      label={"Nama"}
                      placeholder={"nama kerusakan"}
                      name="name"
                      value={name}
                      onChange={handleOnChange}
                    />
                  </div>
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
                        <th className="border">Ketegori</th>
                        <th className="border">Nama</th>
                        <th className="border w-48">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Render list of car brands */}
                      {lists &&
                        lists.slice().map((demage, index) => {
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
                                {demage.demage_category.name}
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
                                    id="my_modal_deleteDemageSubCategory"
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
                                        Category&nbsp;
                                        <span className="font-bold text-lg">
                                          {formEdit.demage_category_name}
                                          &nbsp;
                                        </span>
                                        <span>and Name&nbsp;</span>
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
                                                "my_modal_deleteDemageSubCategory"
                                              )
                                              .close()
                                          }
                                          className="text-navBg/70 hover:font-bold px-2"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          onClick={() => handleDelete.mutate()}
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

export default DemageSubCategories;
