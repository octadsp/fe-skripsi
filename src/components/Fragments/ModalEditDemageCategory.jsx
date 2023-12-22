import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";

import ErrorAlert from "../../components/Elements/ErrorAlert";
import SuccessAlert from "../../components/Elements/SuccessAlert";

function ModalEditDemageCategory({ form, refetchParent }) {
  const [message, setMessage] = useState(null);
  const showAlert = (alert, timeout) => {
    setMessage(alert);

    // Setelah timeout, atur pesan kembali menjadi null
    setTimeout(() => {
      setMessage(null);
    }, timeout);
  };

  const [formEdit, setFormEdit] = useState({
    kode: "",
    name: "",
  });

  const { kode, name } = formEdit;

  // Fetch car brand details using react-query
  const { data: demageCategoryData, refetch } = useQuery(
    ["getDemageCategoryDetails", form.id],
    async () => {
      const response = await API.get(`/demage-category/${form.id}`);
      setFormEdit(response.data.data);
      return response.data.data;
    }
  );

  // Function to handle edit form submission
  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Pengecekan Form Input jangan kosong pake trim
      if (!name.trim() || name.trim() == "") {
        const alert = <ErrorAlert title={"Nama tidak boleh kosong!"} />;
        showAlert(alert, 5000); // showAlert needs to be defined or use an alternative method
        return;
      }
      if (!kode.trim() || kode.trim() == "") {
        const alert = <ErrorAlert title={"Kode tidak boleh kosong!"} />;
        showAlert(alert, 5000); // showAlert needs to be defined or use an alternative method
        return;
      }

      // Use the form.id to make an API call for updating the brand
      await API.patch(`/demage-category/${form.id}`, {
        kode: kode.trim(),
        name: name.trim(),
      });

      const alert = <SuccessAlert title={"Edit Demage Category Success! 😊"} />;
      showAlert(alert, 5000); // showAlert needs to be defined or use an alternative method

      setTimeout(() => {
        document.getElementById("my_modal_editDemageCategory").close();
        refetchParent(); // Assuming refetch is defined somewhere
      }, 1000); // Adjust the timeout duration as needed (in milliseconds)
    } catch (error) {
      const alert = <ErrorAlert title={"Edit Demage Category Failed! ❌"} />;
      showAlert(alert, 5000); // showAlert needs to be defined or use an alternative method
    }
  });

  return (
    <dialog id="my_modal_editDemageCategory" className="modal text-navBg">
      {message && message}
      <div className="modal-box bg-white">
        <h3 className="font-bold text-center text-xl">EDIT</h3>
        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Kode</label>
            <input
              placeholder="Kode"
              className="bg-light-silver w-full input text-base text-navBg"
              value={kode}
              onChange={(e) =>
                setFormEdit({ ...formEdit, kode: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <label className="text-lg">Name</label>
            <input
              placeholder="Name"
              className="bg-light-silver w-full input text-base text-navBg"
              value={name}
              onChange={(e) =>
                setFormEdit({ ...formEdit, name: e.target.value })
              }
            />
          </div>

          <div className="flex justify-center mt-5">
            <button
              disabled={handleOnSubmit?.isLoading}
              type="submit"
              className="btn btn-wide bg-mikado-yellow/70 hover:bg-mikado-yellow text-white"
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
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ModalEditDemageCategory;
