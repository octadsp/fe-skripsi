import React from 'react'
import StarIcon from '../../assets/star-solid.png'

function TestimonialCard({ }) {
    return (
        <div className="flex flex-col items-center carousel-item w-72 m-5 bg-white/50 py-6 px-4 rounded shadow hover:shadow-xl">
            {/* Image */}
            <div className="avatar">
                <div className="w-14 rounded-full">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" />
                </div>
            </div>

            {/* Name */}
            <div className="w-full flex flex-col ">
                <h3 className="flex justify-center items-center text-lg font-bold h-16">Header</h3>
            </div>

            {/* Comment */}
            <div className="bg-white/20 rounded-md h-36 py-1 px-2">
                <p className="text-sm text-navBg text-justify  ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam itaque neque corrupti fuga a quis ipsa, magni consequuntur dignissimos, fugiat impedit odit iste amet ad recusandae commodi debitis? Molestiae, dolores!</p>
            </div>

            {/* Stars */}
            <div className="flex justify-center mt-2 w-full">
                <img src={StarIcon} width={20} />
                <img src={StarIcon} width={20} />
                <img src={StarIcon} width={20} />
                <img src={StarIcon} width={20} />
                <img src={StarIcon} width={20} />
            </div>

        </div>
    )
}

export default TestimonialCard