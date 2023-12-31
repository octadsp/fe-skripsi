import React, { useState, useContext, useEffect } from "react";
import Header from "./Components/HeaderReservation";
import AvatarProfile from "../../components/Elements/AvatarProfile";
import EditModal from "../../components/Fragments/ModalEditProfile";

import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

function ProfilePage() {
  const [state] = useContext(UserContext);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });
  console.log("🚀 ~ file: ProfilePage.jsx:20 ~ ProfilePage ~ form:", form);

  async function getDataUpdate() {
    const responseUser = await API.get(`/user/${state.user.id}`);
    setPreview(responseUser.data.data.image);

    setForm({
      fullname: responseUser.data.data.fullname,
      lastname: responseUser.data.data.lastname,
      email: responseUser.data.data.email,
      phone: responseUser.data.data.phone,
      address: responseUser.data.data.address,
      image: responseUser.data.data.image,
    });
  }

  useEffect(() => {
    getDataUpdate();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  
  return (
    <>
      <Header />
      <div className="bg-white h-full pb-10">
        <div className="flex mx-16 pt-10 ">
          <div className="flex justify-between w-full">
            {/* KIRI */}
            <div className="w-2/6 px-20 ">
              <div className="h-full bg-white flex flex-col justify-center items-center shadow-md border border-light-silver rounded-lg py-5">
                <div className="px-5">
                  <img
                    class="object-cover rounded-xl h-48 w-96"
                    src={state.user.image}
                  />
                </div>
                <div className="mt-2">
                  <h1 className="text-xl text-navBg">
                    {state?.user.fullname} {state?.user.lastname}
                  </h1>
                </div>
                <div className="mt-1">
                  <h1 className="text-sm text-navBg/60">{state?.user.email}</h1>
                </div>
                <div>
                  <button
                    className="btn btn-block btn-sm mt-3 bg-mikado-yellow hover:text-white text-navBg font-bold border-navBg/20"
                    onClick={() =>
                      document
                        .getElementById("my_modal_editProfile")
                        .showModal()
                    }
                  >
                    edit
                  </button>
                </div>
                <EditModal />
              </div>
            </div>
            {/* END */}
            {/* KANAN */}
            <div className="w-4/6 h-full text-navBg flex flex-col py-5 px-10 shadow-md border justify-center border-light-silver rounded-lg">
              <div className="border-b border-b-light-silver my-2"></div>
              <div className="flex gap-10 w-full py-3">
                <p className="w-1/4 font-semibold text-xl">Nama Depan</p>
                <p className="text-xl font-semibold">
                  : {state?.user.fullname}
                </p>
              </div>
              <div className="border-b border-b-light-silver my-2"></div>
              <div className="flex gap-10 w-full py-3">
                <p className="w-1/4 font-semibold text-xl">Nama Belakang</p>
                <p className="text-xl font-semibold">
                  : {state?.user.lastname}
                </p>
              </div>
              <div className="border-b border-b-light-silver my-2"></div>
              <div className="flex gap-10 w-full py-3">
                <p className="w-1/4 font-semibold text-xl">Handphone</p>
                <p className="text-xl font-semibold">: {state?.user.phone}</p>
              </div>
              <div className="border-b border-b-light-silver my-2"></div>
              <div className="flex gap-10 w-full py-3">
                <p className="w-1/4 font-semibold text-xl">Alamat</p>
                <p className="text-xl font-semibold">: {state?.user.address}</p>
              </div>
              <div className="border-b border-b-light-silver my-2"></div>
            </div>
            {/* END */}
          </div>
        </div>

        <div className="flex mx-16 pt-10 ">
          <div className="w-full flex flex-col gap-2 py-10 px-16 shadow-md border border-light-silver rounded-lg">
            {/* TITLE */}
            <div className="pb-4">
              <h1 className="text-navBg text-3xl font-bold">
                History Reservation
              </h1>
            </div>

            {/* CONTENT */}
            <div className="w-full grid grid-cols-2 gap-5 text-navBg">
              <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                <div className="flex flex-col w-3/4 ">
                  <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                  <p className="mt-3 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    fugit qui quas iste nesciunt esse dolorem inventore est
                    blanditiis, laboriosam expedita{" "}
                  </p>
                </div>
                <div className="w-1/4 flex justify-center item-center">
                  <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">
                    Detail
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                <div className="flex flex-col w-3/4 ">
                  <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                  <p className="mt-3 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    fugit qui quas iste nesciunt esse dolorem inventore est
                    blanditiis, laboriosam expedita{" "}
                  </p>
                </div>
                <div className="w-1/4 flex justify-center item-center">
                  <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">
                    Detail
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                <div className="flex flex-col w-3/4 ">
                  <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                  <p className="mt-3 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    fugit qui quas iste nesciunt esse dolorem inventore est
                    blanditiis, laboriosam expedita{" "}
                  </p>
                </div>
                <div className="w-1/4 flex justify-center item-center">
                  <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">
                    Detail
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                <div className="flex flex-col w-3/4 ">
                  <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                  <p className="mt-3 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    fugit qui quas iste nesciunt esse dolorem inventore est
                    blanditiis, laboriosam expedita{" "}
                  </p>
                </div>
                <div className="w-1/4 flex justify-center item-center">
                  <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">
                    Detail
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                <div className="flex flex-col w-3/4 ">
                  <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                  <p className="mt-3 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    fugit qui quas iste nesciunt esse dolorem inventore est
                    blanditiis, laboriosam expedita{" "}
                  </p>
                </div>
                <div className="w-1/4 flex justify-center item-center">
                  <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">
                    Detail
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                <div className="flex flex-col w-3/4 ">
                  <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                  <p className="mt-3 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    fugit qui quas iste nesciunt esse dolorem inventore est
                    blanditiis, laboriosam expedita{" "}
                  </p>
                </div>
                <div className="w-1/4 flex justify-center item-center">
                  <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">
                    Detail
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                <div className="flex flex-col w-3/4 ">
                  <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                  <p className="mt-3 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    fugit qui quas iste nesciunt esse dolorem inventore est
                    blanditiis, laboriosam expedita{" "}
                  </p>
                </div>
                <div className="w-1/4 flex justify-center item-center">
                  <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">
                    Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
