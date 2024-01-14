import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../../../config/api";

function formatPrice(price) {
  // Convert price to string
  const priceString = price.toString();

  // Split the string into integer and decimal parts
  const [integerPart] = priceString.split(".");

  // Add dots for thousands separator
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  // Combine the integer and decimal parts
  const formattedPrice = `Rp. ${formattedIntegerPart}`;

  return formattedPrice;
}

function ModalUpload({ reservID }) {
  const [preview, setPreview] = useState(
    "https://res.cloudinary.com/dpxazv6a6/image/upload/v1704687841/skripsi/no_image_btbbwy.png"
  );
  const [form, setForm] = useState({
    demage_sub_category_id: 0,
    image: "",
    status: false,
    post_to_user: "no",
  });
  const [price, setPrice] = useState(0);

  const { demage_sub_category_id, image, status, post_to_user } = form;

  const { data: demageCat, refetch: refetchDemageCat } = useQuery(
    "demageCatCache",
    async () => {
      const resp = await API.get("/demage-subcategories");
      return resp.data.data;
    }
  );

  const handleUpload = useMutation(async (e) => {
    try {
      e.preventDefault();

      //configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();

      formData.set("reservation_id", reservID);
      if (image) {
        formData.set("image", image[0], image[0].name);
      }
      formData.set("demage_sub_category_id", demage_sub_category_id);
      formData.set("price", price);
      formData.set("status", status);
      formData.set("post_to_user", post_to_user);

      const resp = await API.post("/reservation-item", formData, config);

      setForm({
        demage_sub_category_id: 0,
        image: "",
        status: false,
        post_to_user: "no",
      });
      setPrice(0);
      setPreview(
        "https://res.cloudinary.com/dpxazv6a6/image/upload/v1704687841/skripsi/no_image_btbbwy.png"
      );
      alert("Success Upload Image");
      document.getElementById("modalUpload").close();
    } catch (error) {
      console.log("Gagal Upload :", error);
    }
  });

  const handleOnChangeSelected = (e) => {
    const { name, value } = e.target;

    // Validate and convert to integer for specific fields
    const intValue =
      /^(car_brand_id|car_type_id)$/.test(name) && /^\d+$/.test(value)
        ? parseInt(value, 10)
        : value;

    setForm({
      ...form,
      [name]: intValue,
    });
  };

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

  const handleChangePrice = (e) => {
    const inputValue = e.target.value.replace(/[^\d]/g, ""); // Hanya mengambil digit
    const newPrice = Number(inputValue);

    // Pastikan bahwa nilai setelah mengonversi adalah angka yang valid
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
    }
  };

  const formatedPrice = formatPrice(price);

  return (
    <dialog id="modalUpload" className="modal">
      <form
        onSubmit={(e) => handleUpload.mutate(e)}
        className="modal-box text-navBg bg-light-silver"
      >
        <div className="hidden">{reservID}</div>
        <h3 className="font-bold text-lg">Upload Item</h3>
        <div className="flex flex-col justify-center items-center gap-2 mt-2">
          <img src={preview} className="object-cover rounded-xl h-52 w-56" />
          <input
            onChange={handleChange}
            name="image"
            form="image"
            type="file"
            className="file-input text-sm file-input-bordered file-input-accent w-full max-w-xs bg-light-gray"
          />
        </div>
        <div className="flex flex-col items-start gap-2 mt-5">
          <label className="text-sm">Bagian Kerusakan</label>
          <select
            id="demage_sub_category_id"
            required
            name="demage_sub_category_id"
            onChange={handleOnChangeSelected}
            className="text-base text-navBg bg-light-gray rounded-md p-2 w-full"
            value={demage_sub_category_id}
          >
            <option value={0} disabled>
              Pilih kerusakan
            </option>
            {demageCat?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start gap-2 mt-3">
          <label className="text-sm">Bagian Kerusakan</label>
          <input
            placeholder="Rp. 000,00"
            className="bg-white p-2 w-full text-sm text-navBg focus:outline-none focus:ring-2 focus:ring-navBg/50 rounded-lg"
            value={formatedPrice}
            name="price"
            form="price"
            onChange={handleChangePrice}
          />
        </div>
        <div className="btn btn-wide btn-sm mt-5">
          <button
            disabled={handleUpload.isLoading}
            type="submit"
            className="text-white w-full"
          >
            {handleUpload.isLoading ? (
              <p className="flex justify-center items-center text-white">
                upload
                <span>&nbsp;</span>
                <span className="loading loading-spinner loading-md"></span>
              </p>
            ) : (
              "Kirim"
            )}
          </button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ModalUpload;
