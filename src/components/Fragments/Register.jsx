import React from "react";
import InputText from "../Elements/InputText";
import Logo from "../../assets/logo.png"

function Register() {
  return (
    <div className="box-border w-full flex justify-center">
      <div className="box-content rounded-lg w-3/4 p-4 bg-gray-50 border">
        <img src={Logo} />
        <div className="container">
          <div className="flex justify-center">
            <h1 className="font-bold text-black text-4xl mb-8">Register</h1>
          </div>
          <div className="container">
            <form className="flex flex-col space-y-2 mx-5">
                <InputText label={"Username"} type={"text"} name={"username"} formName={"username"} placeholder={"username"}/>
                <InputText label={"Email"} type={"email"} name={"email"} formName={"email"} placeholder={"email"}/>
                <InputText label={"Password"} type={"password"} name={"password"} formName={"password"} placeholder={"password"}/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
