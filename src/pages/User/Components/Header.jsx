import logoGuns from "../../../assets/logo.png";
import ModalUserLogin from "../../../components/Fragments/ModalUserLogin";
import React, { useEffect } from "react";
import ModalUserRegister from "../../../components/Fragments/ModalUserRegister";

const Header = () => {
    useEffect(() => {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault(); // Menghentikan perilaku default link (berpindah halaman)
                const targetId = this.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth", // Efek smooth scroll
                        block: "start", // Memulai scroll dari bagian atas elemen
                    });
                }
            });
        });

        // Membersihkan event listener ketika komponen di-unmount
        return () => {
            document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.removeEventListener("click", function (e) {
                    e.preventDefault();
                });
            });
        };
    }, []);

    return (
        <header className="bg-navBg py-1 text-light-silver w-full sticky top-0">
            <div className="mx-5 flex justify-between items-center">
                <div className="flex flex-row w-32">
                    <img src={logoGuns} />
                </div>
                <nav>
                    <ul className="flex space-x-3">
                        <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline"><a href="#herosection" className="">Home</a></li>
                        <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline"><a href="#aboutus" className=" ">About Us</a></li>
                        <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline"><a href="#servicesection" className=" ">Service</a></li>
                        <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline"><a href="#partnersection" className=" ">Partners</a></li>
                        <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline"><a href="#testimonialsection" className=" ">Testimonials</a></li>
                        <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline"><a href="#reservationsection" className=" ">Reservations</a></li>
                        <li className="p-2 hover:p-2 hover:text-mikado-yellow hover:ring-2 hover:ring-mikado-yellow hover:rounded-lg hover:underline"><a href="#contactsection" className=" ">Contacts</a></li>
                        <li className="bg-white py-2 px-4 text-mikado-yellow font-semibold hover:bg-mikado-yellow hover:text-white  rounded-sm">
                            {/* You can open the modal using document.getElementById('ID').showModal() method */}
                            <button className="" onClick={() => document.getElementById('modalLogin').showModal()}>Login</button>
                            <ModalUserLogin />
                        </li>
                        <li className="bg-mikado-yellow p-2 text-white font-semibold hover:bg-white hover:text-mikado-yellow rounded-sm">
                            {/* You can open the modal using document.getElementById('ID').showModal() method */}
                            <button className=" " onClick={() => document.getElementById('modalRegister').showModal()}>Register</button>
                            <ModalUserRegister />
                        </li>
                        {/* <li className="flex justify-center">
                            <a className="avatar" href="">
                                <div className="w-8 mask mask-squircle">
                                    <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fHww" />
                                </div>
                            </a>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
