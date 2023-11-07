import React from 'react'

function ServiceCard({ icon, title, onClick }) {
    return (
        <div className="flex flex-col items-center bg-white/80 p-6 rounded shadow-lg hover:shadow-2xl">
            <div className="w-20 h-full">
                <img src={icon} width={"full"} />
            </div>
            <div className="w-full flex flex-col">
                <h3 className=" flex justify-center items-center text-xl font-bold my-2 h-16">{title}</h3>
                <button onClick={onClick} className='bg-mikado-yellow text-white font-semibold ring-1 ring-light-gray rounded-lg hover:text-navBg hover:bg-white hover:ring-1 hover:ring-mikado-yellow hover:shadow-md py-1 mt-5 transition duration-300 mx-10'>Enquire Us</button>
            </div>
        </div>
    )
}

export default ServiceCard