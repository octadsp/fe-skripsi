import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

function ModalSendMessage({ reservID }) {
  const [messageAlert, setMessageAlert] = useState(null);
  const [form, setForm] = useState({
    user_id: 0,
    title: "",
    message: "",
  });
  const { title, message } = form;

  const { data: reserv, refetch: refetchReserv } = useQuery(
    "reservModalCache",
    async () => {
      const resp = await API.get(`/reservation/${reservID}`);
      return resp.data.data;
    },
    { refetchInterval: 1000 }
  );

  const handleSubmitMessage = useMutation(async (e) => {
    try {
      e.preventDefault();

      if (title.trim() === "" || title.trim() === null) {
        const alert = <div>Judul tidak boleh kosong</div>;
        setMessageAlert(alert);
        return;
      }
      if (message.trim() === "" || message.trim() === null) {
        const alert = <div>Pesan tidak boleh kosong</div>;
        setMessageAlert(alert);
        return;
      }

      const resp = await API.post("/notification", {
        user_id: reserv?.user_id,
        title: title.trim(),
        message: message.trim(),
      });

      alert("Success mengirim notifikasi");
      setForm({
        title: "",
        message: "",
      });

      document.getElementById("modalSendMessage").close();
    } catch (error) {
      console.log("Rejected failed!", error);
    }
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <dialog id="modalSendMessage" className="modal">
      <div className="text-navBg">{messageAlert && messageAlert}</div>
      <form
        onSubmit={(e) => handleSubmitMessage.mutate(e)}
        className="modal-box text-navBg bg-light-silver"
      >
        <div className="hidden">{reservID}</div>
        <h3 className="font-bold text-lg">Message Box</h3>
        <div className="flex flex-col gap-2 w-full items-start mt-5">
          <label className="">Judul</label>
          <input
            type="text"
            name="title"
            className="w-full rounded-lg bg-white text-navBg p-2 text-lg"
            maxLength={50}
            value={title}
            onChange={handleOnChange}
          ></input>
        </div>
        <div className="flex flex-col gap-2 w-full items-start mt-5">
          <label className="">Pesan</label>
          <textarea
            type="text"
            name="message"
            className="w-full bg-white rounded-lg text-navBg p-2 text-lg resize-none"
            rows={3}
            maxLength={100}
            value={message}
            onChange={handleOnChange}
          ></textarea>
        </div>
        <div className="btn btn-wide btn-sm mt-5">
          <button type="submit" className="text-white">
            Kirim
          </button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ModalSendMessage;
