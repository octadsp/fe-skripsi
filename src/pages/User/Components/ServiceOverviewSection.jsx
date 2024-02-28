// src/components/ServiceOverviewSection.jsx
import React from "react";
import ServiceOverviewCard from "../../../components/Elements/ServiceOverviewCard";

const ServiceOverviewSection = () => {
  return (
    <section
      id="serviceoverviewsection"
      className="bg-light-gray text-navBg py-16"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Car Repair Services</h2>
        <div className="grid grid-cols-5 gap-5 px-10">
          <ServiceOverviewCard text="CAR REPAIRS" />
          <ServiceOverviewCard text="CAR INSPECTION" />
          <ServiceOverviewCard text="CAR DENTING & PAINTING" />
          <ServiceOverviewCard text="CAR MAJOR REPAIRS" />
          <ServiceOverviewCard text="CAR CUSTOM REPAIRS" />
        </div>
      </div>
    </section>
  );
};

export default ServiceOverviewSection;
