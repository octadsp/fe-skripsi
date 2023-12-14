import React, { useContext, useState } from "react";
import InputText from "../Elements/InputText";
import FooterForm from "../Elements/FooterForm";
import Logo from "../../assets/logo.png";
import ErrorAlert from "../Elements/ErrorAlert";
import SuccessAlert from "../Elements/SuccessAlert";

import { API, setAuthToken } from "../../config/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function Login() {
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

      const alert = (
        <div className="mb-1">
          <p className="text-textSuccess font-bold text-sm">Login Success! 😊</p>
        </div>
      );
      showAlert(alert, 5000);
      setForm({
        email: "",
        password: "",
      });

      setTimeout(() => {
        // Send data to UserContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        setAuthToken(localStorage.token);
      }, 3000);
    } catch (error) {
      const alert = (
        <div className="mb-1">
          <p className="text-textError font-bold text-sm">Username and Password not match! ❌</p>
        </div>
      );
      showAlert(alert, 10000);
      console.log("login failed : ", error);
    }
  });

  return (
    <div className="box-border w-full flex flex-col items-center">
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-navBg text-4xl mb-8">Welcome</h1>
      </div>

      <div className="box-content flex flex-col justify-center items-center rounded-lg w-3/4 py-4 shadow-xl border">
        <img className="w-52 mb-5 bg-navBg rounded-lg" src={Logo} />
        <div className="container text-navBg">
          <form
            className="flex flex-col space-y-5 mx-5"
            onSubmit={(e) => handleOnSubmit.mutate(e)}
          >
            <div>
              <InputText
                label={"Email"}
                value={email}
                type={"text"}
                name={"email"}
                formName={"email"}
                placeholder={"email"}
                onChange={handleOnChange}
              />
              <InputText
                label={"Password"}
                value={password}
                type={"password"}
                name={"password"}
                formName={"password"}
                placeholder={"password"}
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-col w-full justify-center items-center">
              {message && message}
              <button
                disabled={handleOnSubmit.isLoading}
                type="submit"
                className="btn btn-wide bg-light-silver hover:bg-light-silver/50 text-navBg shadow-md"
              >
                {handleOnSubmit.isLoading ? (
                  <p className="flex justify-center items-center text-navBg">
                    sending
                    <span>&nbsp;</span>
                    <span className="loading loading-spinner loading-md"></span>
                  </p>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <FooterForm />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
