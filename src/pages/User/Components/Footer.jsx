// src/components/Footer.js
import React from "react";

// ICON
import AddressIcon from "../../../assets/address.png"
import TelpIcon from "../../../assets/telp.png"
import EmailIcon from "../../../assets/email.png"
import ClockIcon from "../../../assets/clock.png"

const Footer = () => {
    return (
        <footer id="contactsection" className="bg-navBg py-2">
            <section className="flex py-16 gap-2">
                <div className="w-5/12 px-12">
                    <div className="flex flex-col bg-white/10 rounded-xl pl-3 pr-6 py-5 text-white">
                        <div className="flex justify-center mb-3">
                            <h1 className="text-xl font-bold">Contact Info</h1>
                        </div>
                        <div className="flex flex-col gap-3">
                            {/* ADDRESS */}
                            <div className="flex gap-3">
                                <div className="w-10 flex justify-center items-center">
                                    <img src={AddressIcon} className="w-[18px]" />
                                </div>
                                <p className="text-xs text-justify">Jl. Kenangan Jl. Boulevard Raya Gading Serpong No.38, Curug Sangereng, Kec. Klp. Dua, Kabupaten Tangerang, Banten 15810</p>
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

                            <h1 className="font-semibold ml-12 mt-5">Opening Hours</h1>
                            {/* OFFICE HOURS */}
                            <div className="flex gap-2">
                                <div className="w-10 flex justify-center items-center">
                                    <img src={ClockIcon} className="w-[35px]" />
                                </div>
                                <div className="flex flex-col gap-1 text-sm">
                                    <p className="">Monday - Saturday : 09.00-17.00</p>
                                    <p className="">Sunday : Closed</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="bg-mikado-yellow w-7/12">
                    {/* <iframe src="https://www.google.com/maps/place/Guns+Paint+Body+Repair/@-6.2609161,106.6284712,20z/data=!4m6!3m5!1s0x2e69fd57d765bbc7:0x2ed92dc35ad31e27!8m2!3d-6.2609328!4d106.6285839!16s%2Fg%2F11f637p0mn?entry=ttu" title="Guns Maps"></iframe> */}
                </div>
            </section>

            <div className="container mx-auto flex justify-center bg-white/10 text-white rounded-lg">
                <p className="px-2">&copy; 2023 Bengkel Reparasi Mobil. All rights reserved.</p>
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
