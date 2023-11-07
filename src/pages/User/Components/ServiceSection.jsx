// src/components/ServicesSection.js
import React from "react";
import ServiceCard from "../../../components/Elements/ServiceCard";

// Icon
import PaintingIcon from "../../../assets/painting.png"
import PolishIcon from "../../../assets/polish.png"
import RestorasiIcon from "../../../assets/restorasi.png"
import AsuransiIcon from "../../../assets/asuransi.png"
import WindshieldIcon from "../../../assets/windshield.png"
import BumperIcon from "../../../assets/bumper.png"
import CarserviceIcon from "../../../assets/car-service.png"

const ServicesSection = () => {
    return (
        <section id="servicesection" className="bg-white text-navBg py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-20">
                    <ServiceCard icon={PaintingIcon} title="Cat Body Mobil" />
                    <ServiceCard icon={BumperIcon} title="Cat Bumper" />
                    <ServiceCard icon={PolishIcon} title="Polish & Wax Full Body" />
                    <ServiceCard icon={CarserviceIcon} title="Detailing Interior" />
                    <ServiceCard icon={CarserviceIcon} title="Detailing Exterior" />
                    <ServiceCard icon={RestorasiIcon} title="Restorasi Mobil" />
                    <ServiceCard icon={WindshieldIcon} title="Windshield & Lights" />
                    <ServiceCard icon={AsuransiIcon} title="Insurance Claims" />
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
