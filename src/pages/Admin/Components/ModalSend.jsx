import React from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

function ModalSend({ reservID }) {
  const { data: reservItem, refetchReservItem } = useQuery(
    "reservationItemModalSendCache",
    async () => {
      const resp = await API.get(`reservation-item-byreserv/${reservID}/no`);
      return resp.data.data;
    },
    { refetchInterval: 100 }
  );

  const { mutate: handleSubmitSend } = useMutation(async (e) => {
    try {
      const itemIdMap = reservItem?.map((item) => item.id);

      for (const itemID of itemIdMap) {
        const resp = await API.patch(`/post-to-user/${itemID}`, {
          post_to_user: "yes",
        });
      }

      const respStatus = await API.patch(`/reservation-status/${reservID}`, {
        sub_status: "mkc",
      });

      const respNotif = await API.post("/notification", {
        user_id: reservItem?.[0]?.reservatin.user_id, // assuming reservItem is an array
        title: "Konfirmasi Item Kerusakan",
        message:
          "Mohon untuk melakukan konfirmasi items kerusakan di halaman profile",
      });

      document.getElementById("modalSend").close();
      alert("Success send to Customer");
    } catch (error) {
      console.log("Error send : ", error);
    }
  });

  return (
    <dialog id="modalSend" className="modal">
      <div className="modal-box text-navBg bg-white">
        <div className="hidden">{reservID}</div>
        {reservItem && reservItem.length > 0 ? (
          <>
            <div className="flex flex-col gap-5">
              <h3 className="font-bold text-lg">Kirim ke Customer</h3>
              <div>Anda yakin ingin mengirimkan ke customer?</div>
              <div className="flex justify-center gap-3">
                <form
                  method="dialog"
                  className="btn btn-sm text-navBg/50 bg-light-silver/20 border-none hover:text-white hover:bg-textError/70"
                >
                  <button className="w-full">Tidak</button>
                </form>
                <div className="btn btn-sm bg-lightGreen text-navBg border-none hover:bg-textSuccess">
                  <button onClick={() => handleSubmitSend()} className="w-full">
                    Iya
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div>Anda belum mengisi data untuk dikirim!</div>
              <form method="dialog" className="btn btn-sm text-white mx-auto">
                <button className="w-full">OK</button>
              </form>
            </div>
          </>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ModalSend;
