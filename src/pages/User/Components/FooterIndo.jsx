// src/components/Footer.js
import React from "react";
import Maps from "../../../components/Elements/MapsNew";
// ICON
import AddressIcon from "../../../assets/address.png";
import TelpIcon from "../../../assets/telp.png";
import EmailIcon from "../../../assets/email.png";
import ClockIcon from "../../../assets/clock.png";

const Footer = () => {
  return (
    <footer id="contactsection" className="bg-navBg py-2">
      <section className="flex py-16 gap-2">
        <div className="w-5/12 px-12">
          <div className="flex flex-col bg-white/10 rounded-xl pl-3 pr-6 py-5 text-white">
            <div className="flex justify-center mb-3">
              <h1 className="text-xl font-bold">Info kontak</h1>
            </div>
            <div className="flex flex-col gap-3">
              {/* ADDRESS */}
              <div className="flex gap-3 px-2">
                <div className="w-10 flex justify-center items-center">
                  <img src={AddressIcon} className="w-[18px]" />
                </div>
                <p className="text-xs text-justify">
                  Jl. Kenangan Jl. Boulevard Raya Gading Serpong No.38, Curug
                  Sangereng, Kec. Klp. Dua, Kabupaten Tangerang, Banten 15810
                </p>
              </div>

              {/* TELP/FAX */}
              <div className="flex gap-2">
                <div className="w-10 flex justify-center items-center">
                  <img src={TelpIcon} className="w-[18px]" />
                </div>
                <p className="text-xs">(021)29419059</p>
              </div>

              {/* EMAIL */}
              <div className="flex gap-2">
                <div className="w-10 flex justify-center items-center">
                  <img src={EmailIcon} className="w-[18px]" />
                </div>
                <p className="text-xs">gunspaintbodyrepair@gmail.com</p>
              </div>

              <h1 className="font-semibold ml-12 mt-5">Jam buka</h1>
              {/* OFFICE HOURS */}
              <div className="flex gap-2">
                <div className="w-10 flex justify-center items-center">
                  <img src={ClockIcon} className="w-[35px]" />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <p className="">Senin - Sabtu : 09.00-17.00</p>
                  <p className="">Minggu : Tutup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-mikado-yellow w-7/12 mr-5 rounded-lg">
          <Maps />
        </div>
      </section>

      <div className="container mx-auto flex justify-center bg-white/10 text-white rounded-lg">
        <p className="px-2">
          &copy; 2023 Bengkel Reparasi Mobil. Seluruh hak cipta.
        </p>
        <div>
          <div>
            <img src="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
