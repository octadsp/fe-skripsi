// src/components/ContactSection.js
import React from "react";

const ContactSection = () => {
    return (
        <section id="contactsection" className="bg-blue-500 text-white py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Hubungi Kami</h2>
                <p className="text-lg mb-8">Hubungi kami sekarang untuk mendapatkan layanan perbaikan mobil terbaik.</p>
                <button className="bg-white text-blue-500 py-2 px-6 rounded-full hover:bg-blue-100 hover:text-blue-700 transition duration-300">
                    Hubungi Kami
                </button>
            </div>
        </section>
    );
};

export default ContactSection;
