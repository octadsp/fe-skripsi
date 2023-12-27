import React, { useState } from "react";
import InputForm from "../Elements/InputForm";
import SelectBox from "../Elements/SelectBox";
import SuccessAlert from "../../components/Elements/SuccessAlert";
import ErrorAlert from "../../components/Elements/ErrorAlert";

import { useMutation } from "react-query";
import { API } from "../../config/api";

function ModalUserRegister() {
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    roles: "User",
    address: "",
  });
  //console.log(form);

  const showAlert = (alertComponent, timeout) => {
    setMessage(alertComponent);

    // Setelah timeout, atur pesan kembali menjadi null
    setTimeout(() => {
      setMessage(null);
    }, timeout);
  };

  const { fullname, lastname, email, password, phone, roles, address } = form;

  const handleRegister = useMutation(async (e) => {
    try {
      e.preventDefault();
      // Pengecekan Form Input jangan kosong pake trim
      if (fullname.trim() === "" || fullname.trim() === null) {
        const alert = <ErrorAlert title={"First Name cant be empty!"} />;
        showAlert(alert, 5000);
        return;
      }
      if (email.trim() === "" || email.trim() === null) {
        const alert = <ErrorAlert title={"Email cant be empty!"} />;
        showAlert(alert, 5000);
        return;
      }
      if (password === "" || password === null) {
        const alert = <ErrorAlert title={"Password cant be empty!"} />;
        showAlert(alert, 5000);
        return;
      }
      if (address === "" || address === null) {
        const alert = <ErrorAlert title={"Address cant be empty!"} />;
        showAlert(alert, 5000);
        return;
      }

      const response = await API.post("/register", {
        fullname: fullname.trim(),
        lastname,
        email: email.trim(),
        password: password.trim(),
        phone,
        roles,
        address: address.trim(),
      });

      const alert = <SuccessAlert title={"Register Success! 😊"} />;
      showAlert(alert, 5000);

      setForm({
        fullname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      const alert = <ErrorAlert title={"Oops, email already exists!"} />;
      showAlert(alert, 5000);
      console.log("register failed : ", error);
    }
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {message && message}
      <dialog id="modalRegister" className="modal">
        <div className="modal-box text-navBg bg-light-silver">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form
            className="w-full h-full"
            onSubmit={(e) => handleRegister.mutate(e)}
          >
            <div className="mb-3">
              <h1 className="flex justify-center text-3xl font-bold">
                Register
              </h1>
            </div>
            <div className="flex flex-col gap-3 px-5">
              <InputForm
                label="Firstname"
                type="text"
                placeholder="Firstname"
                onChange={handleOnChange}
                value={fullname}
                name="fullname"
                //minLength={3}
                //maxLength={25}
              />
              <InputForm
                label="Lastname"
                type="text"
                placeholder="Lastname"
                //minLength={3}
                //maxLength={25}
                onChange={handleOnChange}
                value={lastname}
                name="lastname"
              />
              <InputForm
                label="Email"
                type="email"
                placeholder="example@gmail.com"
                onChange={handleOnChange}
                value={email}
                name="email"
              />
              <InputForm
                label="Password"
                type="password"
                placeholder="password"
                //minLength={3}
                //maxLength={25}
                onChange={handleOnChange}
                value={password}
                name="password"
              />
              <InputForm
                label="Telepon/WA"
                type="number"
                placeholder="+62xxx"
                //min={1}
                onChange={handleOnChange}
                value={phone}
                name="phone"
              />
              <label className="label-text">Alamat</label>
              <textarea
                className="rounded px-2 py-1 outline-none resize-none"
                rows={4}
                name="address"
                type="text"
                onChange={handleOnChange}
                value={address}
              />
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="btn border-none text-navBg hover:text-light-gray w-3/4 bg-mikado-yellow rounded"
                disabled={handleRegister.isLoading}
                type="submit"
              >
                {handleRegister.isLoading ? (
                  <p className="flex justify-center items-center text-navBg">
                    sending
                    <span>&nbsp;</span>
                    <span className="loading loading-spinner loading-md"></span>
                  </p>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default ModalUserRegister;
