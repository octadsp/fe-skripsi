import React, { useState } from "react";
import Collapse from "../../../components/Elements/Collapse";

import HeaderImage from "../../../assets/Wind.png";
import AboutImage from "../../../assets/AboutUs.png";

function AboutUs() {
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
            <h1 className="text-3xl font-bold">About Us</h1>
            <p className="text-lg">
              At meter per second, we take pride in our values
            </p>
            <p className="">- Service, Integrity And Excellence</p>
          </div>
          <div>
            <img src={HeaderImage} width={130} className="rotate-180" />
          </div>
        </div>
        <div className="container flex flex-col px-10 gap-5">
          <Collapse
            title="Who We Are?"
            content="Established in 2012, with a vision of becoming a reliable workshop services company, providing fast, quality service and prioritizing customer satisfaction"
          />
          <Collapse
            title="Who We Are?"
            content="Established in 2012, with a vision of becoming a reliable workshop services company, providing fast, quality service and prioritizing customer satisfaction"
          />
          <Collapse
            title="Who We Are?"
            content="Established in 2012, with a vision of becoming a reliable workshop services company, providing fast, quality service and prioritizing customer satisfaction"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
