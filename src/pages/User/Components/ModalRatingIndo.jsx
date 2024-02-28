import React, { useState, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { API } from "../../../config/api";

import { UserContext } from "../../../context/userContext";

const ratingOptions = [
  { id: 0, name: "Tidak Puas" },
  { id: 1, name: "Puas" },
];

function ModalRatingIndo({ reservID }) {
  const [state] = useContext(UserContext);
  const [rating, setRating] = useState(null);
  const [ratingName, setRatingName] = useState("");

  const handleRatingChange = (event) => {
    // Mengupdate nilai rating dan nama rating ketika radio button berubah
    const selectedRating = parseInt(event.target.value, 10);
    setRating(selectedRating);

    const selectedRatingName =
      ratingOptions?.find((option) => option.id === selectedRating)?.name || "";
    setRatingName(selectedRatingName);
  };

  const { data: ratings, refetch: refetchRating } = useQuery(
    "ratingCache",
    async () => {
      const resp = await API.get(`/rating/${reservID}`);
      return resp.data.data;
    },
    { refetchInterval: 100 }
  );

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const resp = await API.post("/rating", {
        user_id: state?.user.id,
        reservation_id: reservID,
        rating: rating,
        rating_name: ratingName,
      });

      alert("Terima kasih atas partisipasi anda 😊");
      setRating(null);
      setRatingName("");
      document.getElementById("modalRating").close();
    } catch (error) {
      console.log("Gagal Rating :", error);
    }
  });

  return (
    <dialog id="modalRatingIndo" className="modal">
      {ratings && ratings.length > 0 ? (
        <>
          <div className="modal-box bg-white flex flex-col items-center">
            <div className="hidden">{reservID}</div>
            <h3 className="font-bold text-lg">
              Hello! Anda telah mengisi penilaian 😊
            </h3>
            <p className="py-4">Lanjut melihat detail?</p>
            <div>
              <div className="flex justify-center mt-2">
                <div>
                  <Link
                    to={`/detail-reservation/${reservID}/id`}
                    className="btn btn-sm bg-lightGreen text-navBg border-none hover:bg-navBg hover:text-white"
                  >
                    Iya
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </>
      ) : (
        <>
          <div className="modal-box bg-white flex flex-col items-center">
            <div className="hidden">{reservID}</div>
            <h3 className="font-bold text-lg">
              Hello! Mohon untuk diisi terlebih dahulu ya 😊
            </h3>
            <p className="py-4">Sudah puaskah anda dengan hasilnya?</p>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <div className="flex justify-center gap-5">
                {ratingOptions?.map((option) => (
                  <div key={option.id} className="flex gap-2">
                    <input
                      type="radio"
                      name="rating"
                      value={option.id}
                      className="radio radio-success"
                      onChange={handleRatingChange}
                    />
                    <div>{option.name}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button type="submit" className="btn btn-success">
                  Kirim
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </>
      )}
    </dialog>
  );
}

export default ModalRatingIndo;
