import React from 'react'
import StatisticImage from "../../../assets/statistic.png"

function ServiceStatistic() {
    return (
        <section id="partnersection" className="bg-white py-12 text-navBg">
            <div className="container flex mx-auto">
                <div className="w-1/2 px-12 ">
                    {/* TITLE */}
                    <div className="flex justify-center">
                        <h1 className="font-bold text-4xl">The Car Repair Statistics</h1>
                    </div>
                    {/* DESC */}
                    <div className="text-justify mt-5">
                        <p className="text-lg">GUNS repair technical statistics that you must know. Whether you come for painting, welding, caulking, polish, until the vehicle is returned to its original condition.</p>
                    </div>
                    {/* COMPONENT */}
                    <div className="flex gap-10 mt-10">
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center">
                                <div className="mr-3">
                                    <h1 className="font-extrabold text-4xl">11</h1>
                                </div>
                                <div className="">
                                    <p className="text-xl">Years of Experience</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-3">
                                    <h1 className="font-extrabold text-4xl">28</h1>
                                </div>
                                <div className="">
                                    <p className="text-xl">Technicians & Workers</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="flex items-center">
                                <div className="mr-3">
                                    <h1 className="font-extrabold text-4xl">1.5K</h1>
                                </div>
                                <div className="">
                                    <p className="text-xl">Vehicled Repaired</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-8">
                                    <h1 className="font-extrabold text-4xl">4.4<span></span></h1>
                                </div>
                                <div className="">
                                    <p className="text-xl">Rated</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-1/2 flex justify-center">
                    {/* IMAGE */}
                    <img src={StatisticImage} width={500} className="rounded-xl" />
                </div>
            </div>
        </section>
    )
}

export default ServiceStatistic