// src/components/PartnerSection.jsx
import React from "react";
import LogoSinarmas from "../../../assets/logo-simas.png"
import logoGun from "../../../assets/logo.png"
import AndalanLogo from "../../../assets/andalan-logo.png"
const PartnerSection = () => {
    return (
        <section id="partnersection" className="bg-light-gray py-16 text-navBg">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Our Partners</h2>
                <div className="">
                    <h1 className="text-xl font-semibold">Company</h1>
                    <div className="flex w-full justify-evenly px-20 mt-5 space-x-5">
                        <img src={AndalanLogo} width={150} />
                        <img src={AndalanLogo} width={150} />
                        <img src={AndalanLogo} width={150} />
                        <img src={AndalanLogo} width={150} />
                        <img src={AndalanLogo} width={150} />
                    </div>
                    <h1 className="text-xl font-semibold mt-10">Asuransi</h1>
                    <div className="flex w-full justify-evenly px-20 mt-5 space-x-5">
                        <img src={LogoSinarmas} width={150} />
                        <img src={logoGun} width={150} />
                        <img src={LogoSinarmas} width={150} />
                        <img src={LogoSinarmas} width={150} />
                        <img src={LogoSinarmas} width={150} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnerSection;
