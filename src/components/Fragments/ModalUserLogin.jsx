import React, { useState, useContext } from "react";
import InputForm from "../Elements/InputForm";
import ErrorAlert from "../Elements/ErrorAlert";
import SuccessAlert from "../Elements/SuccessAlert";

import { API, setAuthToken } from "../../config/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function ModalUserLogin() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const [_, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const showAlert = (alertComponent, timeout) => {
    setMessage(alertComponent);

    // Setelah timeout, atur pesan kembali menjadi null
    setTimeout(() => {
      setMessage(null);
    }, timeout);
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", form);
      console.log(response);

      const alert = <SuccessAlert title={"Login Success! 😊"} />;
      showAlert(alert, 5000);
      setForm({
        email: "",
        password: "",
      });

      const expiresInMillis = response.data.data.expiresIn * 1000; // Konversi ke milidetik
      // Hitung selisih waktu antara waktu saat ini dan waktu kadaluwarsa
      const timeDiffInMillis = expiresInMillis - new Date().getTime();

      setTimeout(() => {
        // Send data to UserContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        setAuthToken(localStorage.token);

        // Setelah waktu kadaluarsa, hapus token dan logout
        setTimeout(() => {
          const confirmLogout = window.confirm(
            "Your session has expired. Please Login again 🤞"
          );
          if (confirmLogout) {
            dispatch({
              type: "LOGOUT",
            });
            setAuthToken();
            localStorage.removeItem("token");
            window.location.reload();
          }
        }, 10000);
      }, 4000);
    } catch (error) {
      const alert = (
        <ErrorAlert title={"Username and Password not match! ❌"} />
      );
      showAlert(alert, 10000);
      console.log("login failed : ", error);
    }
  });
  return (
    <>
      <dialog id="modalLogin" className="modal">
        {message && message}
        <div className="modal-box text-navBg bg-light-silver">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form
            onSubmit={(e) => handleOnSubmit.mutate(e)}
            className="w-full h-full"
          >
            <div className="mb-5">
              <h1 className="flex justify-center text-3xl font-bold">Login</h1>
            </div>
            <div className="flex flex-col gap-5 px-5">
              <InputForm
                label="Email"
                type="text"
                placeholder="example@gmail.com"
                onChange={handleOnChange}
                name={"email"}
                value={email}
                form={"email"}
              />
              <InputForm
                label="Password"
                type="password"
                placeholder="password"
                onChange={handleOnChange}
                name={"password"}
                value={password}
                form={"password"}
              />
            </div>
            <div className="flex justify-center mt-7">
              <button
                disabled={handleOnSubmit.isLoading}
                type="submit"
                className="btn border-none w-3/4 text-navBg hover:text-light-gray bg-mikado-yellow rounded"
              >
                {handleOnSubmit.isLoading ? (
                  <p className="flex justify-center items-center text-navBg">
                    wait
                    <span>&nbsp;</span>
                    <span className="loading loading-spinner loading-md"></span>
                  </p>
                ) : (
                  "Login"
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

export default ModalUserLogin;
