import React, { useContext, useState, userContext } from "react";

import ErrorAlert from "../../components/Elements/ErrorAlert";
import SuccessAlert from "../../components/Elements/SuccessAlert";

import { UserContext } from "../../context/userContext";

function ModalEditProfile({ form, refetchParent }) {
  const [state] = useContext(UserContext);
  const [message, setMessage] = useState(false);
  return (
    <dialog id="my_modal_editProfile" className="modal text-navBg">
      {message && message}
      <div className="modal-box bg-white">
        <h3 className="font-bold text-center text-xl">Edit Profile</h3>
        <form
          onSubmit={
            "" // (e) => handleOnSubmit.mutate(e)
          }
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm">Nama Depan</label>
            <input
              placeholder={state.user.fullname}
              className="bg-light-gray focus:bg-light-silver p-2 w-full text-sm text-navBg focus:outline-none focus:ring-2 focus:ring-navBg/50 rounded-lg"
              //   value={kode}
              //   onChange={(e) =>
              //     setFormEdit({ ...formEdit, kode: e.target.value })
              //   }
            />
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <label className="text-sm">Nama Belakang</label>
            <input
              placeholder={state.user.lastname}
              className="bg-light-gray focus:bg-light-silver p-2 w-full text-sm text-navBg focus:outline-none focus:ring-2 focus:ring-navBg/50 rounded-lg"
              //   value={name}
              //   onChange={(e) =>
              //     setFormEdit({ ...formEdit, name: e.target.value })
              //   }
            />
          </div>

          <div className="flex justify-center mt-5">
            <button
              //   disabled={handleOnSubmit?.isLoading}
              type="submit"
              className="btn btn-wide bg-mikado-yellow/70 hover:bg-mikado-yellow text-white"
            >
              {/* {handleOnSubmit.isLoading ? (
                <p className="flex justify-center items-center text-navBg">
                  saving
                  <span>&nbsp;</span>
                  <span className="loading loading-spinner loading-md"></span>
                </p>
              ) : ( */}
              "Save"
              {/* )} */}
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
