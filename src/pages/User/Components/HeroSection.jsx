import React from "react";
import HeroImg from "../../../assets/Hero.png"
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section id="herosection" className="bg-white text-navBg h-screen flex flex-col justify-center items-center pt-10">
            <img src={HeroImg} className="px-20" />
            <h1 className="text-5xl font-bold my-4">Repair Your Car With Us</h1>
            <p className="text-lg mb-8">The best car repair services at affordable prices.</p>
            <Link to="/reservation-page" className="ring-2 ring-mikado-yellow text-mikado-yellow font-bold py-2 px-6 rounded-full hover:bg-mikado-yellow hover:text-white transition duration-300">
                Booking
            </Link>
        </section>
    );
};

export default HeroSection;
