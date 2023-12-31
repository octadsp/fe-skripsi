import React, { useContext, useEffect, useState, userContext } from "react";

import ErrorAlert from "../../components/Elements/ErrorAlert";
import SuccessAlert from "../../components/Elements/SuccessAlert";

import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import { useMutation } from "react-query";

function ModalEditProfile({ form, refetchParent }) {
  const [state] = useContext(UserContext);
  const [message, setMessage] = useState(false);

  const [preview, setPreview] = useState(null);
  const [formEdit, setFormEdit] = useState({
    fullname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });

  const { fullname, lastname, email, phone, address, image } = formEdit;

  async function getDataProfile() {
    const resp = await API.get(`/user/${state.user.id}`);
    setPreview(resp.data.data.image);

    setFormEdit({
      ...formEdit,
      fullname: resp.data.data.fullname,
      lastname: resp.data.data.lastname,
      email: resp.data.data.email,
      phone: resp.data.data.phone,
      address: resp.data.data.address,
    });
  }

  useEffect(() => {
    getDataProfile();
  }, []);

  const handleChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const showAlert = (alert, timeout) => {
    setMessage(alert);

    // Setelah timeout, atur pesan kembali menjadi null
    setTimeout(() => {
      setMessage(null);
    }, timeout);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      //configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("fullname", fullname);
      if (image) {
        formData.set("image", image[0], image[0].name);
      }
      formData.set("lastname", lastname);
      formData.set("email", email);
      formData.set("phone", phone);
      formData.set("address", address);

      // update user data
      const resp = await API.patch(`/user/${state.user.id}`, formData, config);

      const alert = <SuccessAlert title={"Edit Profile Success! 😊"} />;
      showAlert(alert, 3000);
      setTimeout(() => {
        document.getElementById("my_modal_editProfile").close();
      }, 3000);
    } catch (err) {}
  });

  return (
    <dialog id="my_modal_editProfile" className="modal text-navBg">
      {message && message}
      <div className="modal-box bg-white">
        <h3 className="font-bold text-center text-xl mb-3">Edit Profile</h3>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-3 items-center mb-5">
              <img src={preview} class="object-cover rounded-xl h-52 w-56" />
              <input
                onChange={handleChange}
                name="image"
                form="image"
                type="file"
                className="file-input text-sm file-input-bordered file-input-accent w-full max-w-xs bg-light-gray"
              />
            </div>
            <label className="text-sm">Nama Depan</label>
            <input
              placeholder={state.user.fullname}
              className="bg-light-gray focus:bg-light-silver p-2 w-full text-sm text-navBg focus:outline-none focus:ring-2 focus:ring-navBg/50 rounded-lg"
              value={fullname}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <label className="text-sm">Nama Belakang</label>
            <input
              placeholder={state.user.lastname}
              className="bg-light-gray focus:bg-light-silver p-2 w-full text-sm text-navBg focus:outline-none focus:ring-2 focus:ring-navBg/50 rounded-lg"
              value={lastname}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <label className="text-sm">Handphone</label>
            <input
              placeholder={state.user.phone}
              className="bg-light-gray focus:bg-light-silver p-2 w-full text-sm text-navBg focus:outline-none focus:ring-2 focus:ring-navBg/50 rounded-lg"
              value={phone}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <label className="text-sm">Alamat</label>
            <textarea
              className="rounded-lg px-2 bg-light-gray py-1 focus:bg-light-silver outline-none focus:ring-2 focus:ring-navBg/50 resize-none"
              rows={4}
              name="address"
              type="text"
              onChange={handleChange}
              value={address}
            />
          </div>

          <div className="flex justify-center mt-5">
            <button
              disabled={handleSubmit?.isLoading}
              type="submit"
              className="btn btn-wide bg-mikado-yellow/70 hover:bg-mikado-yellow text-white"
            >
              {handleSubmit.isLoading ? (
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

export default ModalEditProfile;
