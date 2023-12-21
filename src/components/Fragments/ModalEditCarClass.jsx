import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import InputForm from "../Elements/InputForm";

import ErrorAlert from "../../components/Elements/ErrorAlert";
import SuccessAlert from "../../components/Elements/SuccessAlert";

function ModalEditCarClass({ form, refetchParent }) {
  const [message, setMessage] = useState(null);
  const showAlert = (alert, timeout) => {
    setMessage(alert);

    // Setelah timeout, atur pesan kembali menjadi null
    setTimeout(() => {
      setMessage(null);
    }, timeout);
  };

  const [formEdit, setFormEdit] = useState({
    car_brand_id: 0,
    car_type_id: 0,
    golongan: "",
  });

  const { car_brand_id, car_type_id, golongan } = formEdit;

  // Fetch car brand details using react-query
  const { data: carClassData, refetch } = useQuery(
    ["getCarClassDetails", form.id],
    async () => {
      const response = await API.get(`/car-class/${form.id}`);
      setFormEdit(response.data.data);
      return response.data.data;
    }
  );

  const { data: carBrandLists, refetch: refetchCarBrands } = useQuery(
    "carBrandListCache",
    async () => {
      const response = await API.get("/car-all-brands");
      return response.data.data;
    }
  );

  const { data: carTypeLists, refetch: refetchCarTypes } = useQuery(
    "carTypeListCache",
    async () => {
      const response = await API.get("/car-all-types");
      return response.data.data;
    }
  );

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Validate and convert to integer for specific fields
    const intValue =
      /^(car_brand_id|car_type_id)$/.test(name) && /^\d+$/.test(value)
        ? parseInt(value, 10)
        : value;

    setFormEdit({
      ...formEdit,
      [name]: intValue,
    });
  };

  // Function to handle edit form submission
  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Pengecekan Form Input jangan kosong pake trim
      // if (!car_brand_id.trim()) {
      //   const alert = (
      //     <ErrorAlert title={"Pilih Brand Mobil terlebih dahulu!"} />
      //   );
      //   showAlert(alert, 5000); // showAlert needs to be defined or use an alternative method
      //   return;
      // }
      // if (!car_type_id.trim()) {
      //   const alert = (
      //     <ErrorAlert title={"Pilih Tipe Mobil terlebih dahulu!"} />
      //   );
      //   showAlert(alert, 5000); // showAlert needs to be defined or use an alternative method
      //   return;
      // }
      if (!golongan.trim()) {
        const alert = (
          <ErrorAlert title={"Pilih Golongan Mobil terlebih dahulu!"} />
        );
        showAlert(alert, 5000); // showAlert needs to be defined or use an alternative method
        return;
      }

      // Use the form.id to make an API call for updating the brand
      await API.patch(`/car-class/${form.id}`, {
        car_brand_id: car_brand_id,
        car_type_id: car_type_id,
        golongan: golongan.trim(),
      });

      const alert = <SuccessAlert title={"Edit Class Success! 😊"} />;
      showAlert(alert, 5000); // showAlert needs to be defined or use an alternative method

      setTimeout(() => {
        document.getElementById("my_modal_editClass").close();
        refetchParent(); // Assuming refetch is defined somewhere
      }, 1000); // Adjust the timeout duration as needed (in milliseconds)
    } catch (error) {
      const alert = <ErrorAlert title={"Edit Class Failed! ❌"} />;
      showAlert(alert, 5000); // showAlert needs to be defined or use an alternative method
    }
  });

  return (
    <dialog id="my_modal_editClass" className="modal text-navBg">
      {message && message}
      <div className="modal-box bg-white ">
        <h3 className="font-bold text-center text-xl">EDIT</h3>
        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <div className="flex flex-col gap-1">
            <label className="text-base">Brand Mobil</label>
            <select
              id="car_brand_id"
              name="car_brand_id"
              onChange={handleOnChange}
              className="text-base text-navBg bg-light-gray rounded-md p-3"
              value={car_brand_id}
            >
              <option value={0} disabled>
                Select Brand
              </option>
              {carBrandLists?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <label className="text-base">Tipe</label>
            <select
              id="car_type_id"
              name="car_type_id"
              onChange={handleOnChange}
              className="text-base text-navBg bg-light-gray rounded-md p-3"
              value={car_type_id}
            >
              <option value={0} disabled>
                Select Brand
              </option>
              {carTypeLists?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} {item.tipe}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <label className="text-base">Golongan</label>
            <InputForm
              placeholder={"golongan mobil"}
              name="golongan"
              value={golongan}
              onChange={handleOnChange}
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

export default ModalEditCarClass;
