import React, { useState } from "react";
import InputForm from "../../../components/Elements/InputForm";
import Header from "../../../assets/kop.png";

import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

import ErrorAlert from "../../../components/Elements/ErrorAlert";
import SuccessAlert from "../../../components/Elements/SuccessAlert";

function AddCarBrand() {
  // State to manage form input values
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    tipe: "",
  });

  const { name, tipe } = formData;

  // Fetch list of car brands using react-query
  const { data: lists, refetch } = useQuery("listCarBrandCache", async () => {
    const response = await API.get("/car-brands");
    return response.data.data;
  });

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
      <div className="flex m-16 gap-5 text-navBg">
        <div className="flex flex-col w-full h-1/2 shadow-xl ring-1 ring-light-silver p-5 rounded-lg">
          <div className="mb-10 flex justify-center">
            <h1 className="text-2xl">Input Form</h1>
          </div>
          <form
            className="flex gap-5 text-lg"
            onSubmit={(e) => handleOnSubmit.mutate(e)}
          >
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
          </form>
          <div className="flex justify-center mt-10">
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
          {message && message}
        </div>
      </div>
      <div className="flex m-16 gap-5 text-navBg">
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
                      <td className="border">{brand.name}</td>
                      <td className="border">{brand.tipe}</td>
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

export default AddCarBrand;
