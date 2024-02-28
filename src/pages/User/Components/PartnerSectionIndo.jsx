// src/components/PartnerSection.jsx
import React from "react";
import LogoSinarmas from "../../../assets/logo-simas.png";
import logoGun from "../../../assets/logo.png";
import AndalanLogo from "../../../assets/andalan-logo.png";
const PartnerSectionIndo = () => {
  return (
    <section id="partnersection" className="bg-light-gray py-16 text-navBg">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Mitra Kami</h2>
        <div className="">
          <h1 className="text-xl font-semibold">Perusahaan</h1>
          <div className="flex w-full justify-evenly px-20 mt-5 space-x-5">
            <img src={AndalanLogo} width={150} />
            <img
              src="https://uccareer.id/assets/upload/company/thumbs/thumb300px-04-08-16-12-09-37.png"
              width={150}
            />
            <img
              src="https://th.bing.com/th/id/OIP.aFn-XWV7Mxs2g4nQEz1u4QAAAA?rs=1&pid=ImgDetMain"
              width={150}
            />
            <img
              src="https://event.studilmu.com/uploads/Logo%20Marga%20mandala%20sakti.png"
              width={150}
            />
            <img
              src="https://4.bp.blogspot.com/-uZsrojmNJGE/VzwrloPlY-I/AAAAAAAAApk/1h-c2e0vj2AilFr2wq-SYhtNza8Dej-UgCLcB/w1200-h630-p-k-no-nu/siegwerk-group-logo_10939174.jpg"
              width={150}
            />
          </div>
          <h1 className="text-xl font-semibold mt-10">Asuransi</h1>
          <div className="flex w-full justify-evenly px-20 mt-5 space-x-5">
            <img
              src="https://blog-media.lifepal.co.id/app/uploads/sites/2/2019/12/14130933/logo-sompo.jpeg"
              width={150}
            />
            <img
              src="https://www.butuhkerja.id/wp-content/uploads/2022/09/PT-Asuransi-Umum-Bumida-1967-300x300.jpg"
              width={150}
            />
            <img
              src="https://chevyspin.id/wp-content/uploads/2018/10/KSK.png"
              width={150}
            />
            <img
              src="https://cdnaz.cekaja.com/media/2021/04/KB-Insurance-Indonesia-4-Asuransi-Mobil-Terbaik.jpg"
              width={150}
            />
            <img
              src="https://th.bing.com/th/id/OIP.qtO-OFfOe-9bgCDInYesigHaDt?rs=1&pid=ImgDetMain"
              width={150}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSectionIndo;
