import React, { useState } from "react";
import InputForm from "../../../components/Elements/InputForm";
import Header from "../../../assets/kop.png";

import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

import ErrorAlert from "../../../components/Elements/ErrorAlert";
import SuccessAlert from "../../../components/Elements/SuccessAlert";

function AddCarClass() {
  // State to manage form input values
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    car_brand_id: 0,
    car_type_id: 0,
    golongan: "",
  });

  const { car_brand_id, car_type_id, golongan } = formData;

  // Fetch list of car brands using react-query
  const { data: lists, refetch } = useQuery("listCarClassCache", async () => {
    const response = await API.get("/car-class");
    return response.data.data;
  });

  const { data: carBrandLists, refetch: refetchCarBrands } = useQuery(
    "carBrandListCache",
    async () => {
      const response = await API.get("/car-brands");
      return response.data.data;
    }
  );

  const { data: carTypeLists, refetch: refetchCarTypes } = useQuery(
    "carTypeListCache",
    async () => {
      const response = await API.get("/car-types");
      return response.data.data;
    }
  );

  // Function to handle form input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Validate and convert to integer for specific fields
    const intValue =
      /^(car_brand_id|car_type_id)$/.test(name) && /^\d+$/.test(value)
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
      if (golongan.trim() === "" || golongan.trim() === null) {
        const alert = <ErrorAlert title={"Golongan cant be empty!"} />;
        showAlert(alert, 5000);
        return;
      }

      const response = await API.post("/car-class", {
        car_brand_id,
        car_type_id,
        golongan: golongan.trim(),
      });

      const alert = <SuccessAlert title={"Add Class Success! 😊"} />;
      showAlert(alert, 5000);
      refetch();

      setFormData({
        car_brand_id: 0,
        car_type_id: 0,
        golongan: "",
      });
    } catch (error) {
      const alert = <ErrorAlert title={"Add Class Failed! ❌"} />;
      showAlert(alert, 5000);
    }
  });

  return (
    <>
      <div className="flex justify-center mb-20 mt-5">
        <img src={Header} />
      </div>
      <div className="flex m-16 gap-5 text-navBg">
        <div className="flex flex-col w-1/3 shadow-xl ring-1 ring-light-silver p-5 rounded-lg">
          <div className="mb-10 flex justify-center">
            <h1 className="text-2xl">Input Form</h1>
          </div>
          <form
            className="flex flex-col gap-5 text-lg"
            onSubmit={(e) => handleOnSubmit.mutate(e)}
          >
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
            <select
              id="car_type_id"
              name="car_type_id"
              onChange={handleOnChange}
              className="text-base text-navBg bg-light-gray rounded-md p-3"
              value={car_type_id}
            >
              <option value={0} disabled>
                Select Type
              </option>
              {carTypeLists?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <InputForm
              label={"Golongan"}
              placeholder={"golongan mobil"}
              name="golongan"
              value={golongan}
              onChange={handleOnChange}
            />
            <div className="flex justify-center">
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
        <div className="w-2/3 px-10">
          <div className="overflow-x-auto">
            <div className="flex justify-center mb-10">
              <h1 className="font-bold text-3xl">List Car Brand</h1>
            </div>
            <table className="table border">
              {/* head */}
              <thead className="bg-mikado-yellow">
                <tr className="text-navBg font-bold text-lg text-center">
                  <th className="border w-8">No</th>
                  <th className="border">Nama</th>
                  <th className="border">Tipe</th>
                  <th className="border">Golongan</th>
                </tr>
              </thead>
              <tbody>
                {/* Render list of car brands */}
                {lists &&
                  lists.map((brand, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "font-semibold"
                          : "font-semibold bg-light-silver"
                      }
                    >
                      <th className="border">{index + 1}</th>
                      <td className="border">{brand.car_brand.name}</td>
                      <td className="border text-center">{brand.car_type.name}</td>
                      <td className="border text-center">{brand.golongan}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCarClass;
