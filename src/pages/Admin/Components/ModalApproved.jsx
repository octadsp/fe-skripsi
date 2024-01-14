import React from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

function ModalApproved({ reservID }) {
  const { data: reserv, refetch: refetchReserv } = useQuery(
    "reservModalCache",
    async () => {
      const resp = await API.get(`/reservation/${reservID}`);
      return resp.data.data;
    },
    { refetchInterval: 1000 }
  );
  const { mutate: handleApproved } = useMutation(async (e) => {
    try {
      const resp = await API.patch(`/reservation-status/${reservID}`, {
        sub_status: "sd",
      });

      const respNotif = await API.post("/notification", {
        user_id: reserv?.user_id,
        title: "Perbaikan diterima",
        message:
          "Perbaikan kendaraan anda sedang dilakukan, mohon untuk menunggu 😊",
      });

      alert("Succes melakukan Approval!");
      document.getElementById("modalApproved").close();
    } catch (error) {
      console.log("Gagal dalam melakukan approve :", error);
    }
  });

  return (
    <dialog id="modalApproved" className="modal">
      <div className="modal-box text-navBg bg-white">
        <div className="hidden">{reservID}</div>

        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-lg">Konfirmasi Perbaikan</h3>
          <div>Perbaikan akan segera dilakukan, Setuju?</div>
          <div className="flex justify-center gap-3">
            <form
              method="dialog"
              className="btn btn-sm text-navBg/50 bg-light-silver/20 border-none hover:text-white hover:bg-textError/70"
            >
              <button className="w-full">Tidak</button>
            </form>
            <div className="btn btn-sm bg-lightGreen text-navBg border-none hover:bg-textSuccess">
              <button onClick={() => handleApproved()} className="w-full">
                Iya
              </button>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ModalApproved;
