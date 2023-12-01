import React from 'react'
import Polish from "../../assets/polish.png"

function TrademarkCard({ image, title, content }) {
    return (
        <div className="flex flex-col">
            <div className="h-44 flex flex-col rounded">
                <div className="bg-white h-4/6">
                </div>
                <div className="h-1/4 flex justify-center items-center">
                    <img src={image} className="w-48" />
                </div>
            </div>
            <div className="mt-10">
                <h1 className="text-xl font-semibold">{title}</h1>
                <p className="text-sm mt-5">{content}</p>
            </div>
        </div>
    )
}

export default TrademarkCard