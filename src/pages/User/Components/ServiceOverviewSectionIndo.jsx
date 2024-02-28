// src/components/ServiceOverviewSection.jsx
import React from "react";
import ServiceOverviewCard from "../../../components/Elements/ServiceOverviewCard";

const ServiceOverviewSectionIndo = () => {
  return (
    <section
      id="serviceoverviewsection"
      className="bg-light-gray text-navBg py-16"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Layanan Jasa</h2>
        <div className="grid grid-cols-5 gap-5 px-10">
          <ServiceOverviewCard text="PERBAIKAN MOBIL" />
          <ServiceOverviewCard text="INSPEKSI MOBIL" />
          <ServiceOverviewCard text="PENYOK & PENGECATAN MOBIL" />
          <ServiceOverviewCard text="PERBAIKAN UTAMA MOBIL" />
          <ServiceOverviewCard text="PERBAIKAN CUSTOM MOBIL" />
        </div>
      </div>
    </section>
  );
};

export default ServiceOverviewSectionIndo;
