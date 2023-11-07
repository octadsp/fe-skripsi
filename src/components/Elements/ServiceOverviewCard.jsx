import React from 'react'

function ServiceOverviewCard({ text }) {
    return (
        <div className="bg-white h-36 flex justify-center items-center p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{text}</h3>
        </div>
    )
}

export default ServiceOverviewCard