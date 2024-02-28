import React, { useState } from "react";
import Collapse from "../../../components/Elements/Collapse";

import HeaderImage from "../../../assets/Wind.png";
import AboutImage from "../../../assets/AboutUs.png";

function AboutUsIndo() {
  const [collapse, setCollapse] = useState(0);

  const handleCollapseToggle = (id) => {
    setCollapse((prevCollapse) => ({
      ...prevCollapse,
      [id]: !prevCollapse[id],
    }));
  };

  return (
    <section id="aboutus" className="bg-white py-16 flex text-navBg">
      <div className="w-1/2 flex justify-center">
        <img src={AboutImage} width={500} className="border-none" />
      </div>
      <div className="container w-1/2">
        <div className="flex justify-center text-center">
          <div>
            <img src={HeaderImage} width={130} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Tentang Kami</h1>
            <p className="text-lg">
              Pada meter per detik, kami bangga dengan nilai-nilai kami
            </p>
            <p className="">- Pelayanan, Integritas dan Keunggulan -</p>
          </div>
          <div>
            <img src={HeaderImage} width={130} className="rotate-180" />
          </div>
        </div>
        <div className="container flex flex-col px-10 gap-5">
          <Collapse
            title="Siapa kita?"
            content="Berdiri pada tahun 2012, dengan visi menjadi perusahaan jasa bengkel yang handal, memberikan pelayanan yang cepat, berkualitas dan mengutamakan kepuasan pelanggan."
          />
          {/* <Collapse
            title="Who We Are?"
            content="Established in 2012, with a vision of becoming a reliable workshop services company, providing fast, quality service and prioritizing customer satisfaction"
          />
          <Collapse
            title="Who We Are?"
            content="Established in 2012, with a vision of becoming a reliable workshop services company, providing fast, quality service and prioritizing customer satisfaction"
          /> */}
        </div>
      </div>
    </section>
  );
}

export default AboutUsIndo;
