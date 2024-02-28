// src/components/ServicesSection.js
import React from "react";
import ServiceCard from "../../../components/Elements/ServiceCard";

// Icon
import PaintingIcon from "../../../assets/painting.png";
import PolishIcon from "../../../assets/polish.png";
import RestorasiIcon from "../../../assets/restorasi.png";
import AsuransiIcon from "../../../assets/asuransi.png";
import WindshieldIcon from "../../../assets/windshield.png";
import BumperIcon from "../../../assets/bumper.png";
import CarserviceIcon from "../../../assets/car-service.png";

const ServicesSectionIndo = () => {
  return (
    <section id="servicesection" className="bg-white text-navBg py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Pelayanan Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-20">
          <ServiceCard icon={PaintingIcon} title="Cat Bodi Mobil" />
          <ServiceCard icon={BumperIcon} title="Cat Bemper" />
          <ServiceCard icon={PolishIcon} title="Poles & Wax Seluruh Tubuh" />
          <ServiceCard icon={CarserviceIcon} title="Detail Eksterior" />
          <ServiceCard icon={RestorasiIcon} title="Restorasi Mobil" />
          <ServiceCard icon={WindshieldIcon} title="Kaca Depan & Lampu" />
          <ServiceCard icon={AsuransiIcon} title="Klaim asuransi" />
        </div>
      </div>
    </section>
  );
};

export default ServicesSectionIndo;
