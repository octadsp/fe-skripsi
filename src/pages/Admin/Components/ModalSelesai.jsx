import React from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

function ModalSelesai({ reservID }) {
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
        status: "Selesai",
      });

      const respNotif = await API.post("/notification", {
        user_id: reserv?.user_id,
        title: "Perbaikan sudah selesai",
        message:
          "Perbaikan kendaraan anda sudah selesai dilakukan, kami akan mengantarkan kendaraan anda 😊",
      });

      alert("Perbaikan selesai dikerjakan!");
      document.getElementById("modalSelesai").close();
    } catch (error) {
      console.log("Gagal dalam melakukan approved :", error);
    }
  });

  return (
    <dialog id="modalSelesai" className="modal">
      <div className="modal-box text-navBg bg-white">
        <div className="hidden">{reservID}</div>

        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-lg">Konfirmasi Selesai Perbaikan</h3>
          <div>Apakah pekerjaan sudah selesai dikerjakan?</div>
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

export default ModalSelesai;
