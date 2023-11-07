import React from 'react'
import TrademarkCard from '../../../components/Elements/TrademarkCard'

// Image 
import Trade1 from "../../../assets/trademark1.png"
import Trade2 from "../../../assets/trademark2.png"
import Trade3 from "../../../assets/car-serve.png"

function TrademarkSection() {
    return (
        <section id="trademarksection" className="bg-light-gray py-16 text-navBg">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Our Trademark</h2>
                <div className="grid grid-cols-3 gap-5 px-32">
                    <TrademarkCard image={Trade1} title="4-7 day Car Repairs" content="Experience Quick Service which completes in just 4-7 day, which will help you save your precious time and efforts of visiting Workshops to get your Car Serviced." />
                    <TrademarkCard image={Trade2} title="In-house Technicians" content="GUNS recruits Best in Car Repair Technicians with a Minimum of 10+ years of Experience and Train them. After enabling them with Garage Nation's standards they are assigned for services/repairs." />
                    <TrademarkCard image={Trade3} title="Car Pick Up and Drop Off" content="Vehicle pick-up and drop-off service is available at GUNS. Our services are supported by professional Car Service and experienced drivers who are not only reliable in their work, but can also be trusted in terms of honesty." />
                </div>
            </div>
        </section>
    )
}

export default TrademarkSection