import { useState } from "react";
import InputText from "../Elements/InputText";
import FooterForm from "../Elements/FooterForm";
import Logo from "../../assets/logo.png";

function Register() {

  return (
    <div className="box-border w-full flex flex-col items-center">
      <div className="flex justify-center">
        <h1 className="font-bold text-black text-4xl mb-8">Register</h1>
      </div>
      <div className="box-content flex flex-col justify-center items-center rounded-lg w-3/4 py-4 bg-gray-50 border">
        <img className="w-52 mb-5" src={Logo} />
        <div className="container">
          <form className="flex flex-col space-y-5 mx-5">
            <div>
              <InputText label={"Username"} type={"text"} name={"username"} formName={"username"} placeholder={"username"} />
              <InputText label={"Email"} type={"email"} name={"email"} formName={"email"} placeholder={"email"} />
              <InputText label={"Password"} type={"password"} name={"password"} formName={"password"} placeholder={"password"} />
            </div>
            <div className="flex w-full justify-center">
              <button className="btn btn-wide bg-gray-500 hover:bg-gray-400 text-black shadow-md">submit</button>
            </div>
            <FooterForm />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
