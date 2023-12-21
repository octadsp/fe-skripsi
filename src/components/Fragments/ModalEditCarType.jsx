import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";

import ErrorAlert from "../../components/Elements/ErrorAlert";
import SuccessAlert from "../../components/Elements/SuccessAlert";

function ModalEditCarType({ form, refetchParent }) {
  const [message, setMessage] = useState(null);
  const showAlert = (alert, timeout) => {
    setMessage(alert);

    // Setelah timeout, atur pesan kembali menjadi null
    setTimeout(() => {
      setMessage(null);
    }, timeout);
  };

  const [formEdit, setFormEdit] = useState({
    name: "",
    tipe: "",
  });

  const { name, tipe } = formEdit;

  // Fetch car brand details using react-query
  const { data: carTypeData, refetch } = useQuery(
    ["getCarTypeDetails", form.id],
    async () => {
      const response = await API.get(`/car-type/${form.id}`);
      setFormEdit(response.data.data);
      return response.data.data;
    }
  );

  // Function to handle edit form submission
  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Pengecekan Form Input jangan kosong pake trim
      if (!name.trim() || !tipe.trim()) {
        const alert = <ErrorAlert title={"Name and tipe cant be empty!"} />;
        showAlert(alert, 5000); // showAlert needs to be defined or use an alternative method
        return;
      }

      // Use the form.id to make an API call for updating the brand
      await API.patch(`/car-type/${form.id}`, {
        name: name.trim(),
        tipe: tipe.trim(),
      });

      const alert = <SuccessAlert title={"Edit Type Success! 😊"} />;
      showAlert(alert, 5000); // showAlert needs to be defined or use an alternative method

      setTimeout(() => {
        document.getElementById("my_modal_editType").close();
        refetchParent(); // Assuming refetch is defined somewhere
      }, 1000); // Adjust the timeout duration as needed (in milliseconds)
    } catch (error) {
      const alert = <ErrorAlert title={"Edit Type Failed! ❌"} />;
      showAlert(alert, 5000); // showAlert needs to be defined or use an alternative method
    }
  });

  return (
    <dialog id="my_modal_editType" className="modal text-navBg">
      {message && message}
      <div className="modal-box bg-white">
        <h3 className="font-bold text-center text-xl">EDIT</h3>
        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Nama</label>
            <input
              placeholder="Nama"
              className="bg-light-silver w-full input text-base text-navBg"
              value={name}
              onChange={(e) =>
                setFormEdit({ ...formEdit, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <label className="text-lg">Tipe</label>
            <input
              placeholder="Tipe"
              className="bg-light-silver w-full input text-base text-navBg"
              value={tipe}
              onChange={(e) =>
                setFormEdit({ ...formEdit, tipe: e.target.value })
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

export default ModalEditCarType;
