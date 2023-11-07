import React from 'react'

function HomePage() {
    return (
        <div className='flex w-full min-h-screen bg-gray-200'>
            <sidebar className='bg-white w-64 float-left'>
                test
            </sidebar>
            <div className='w-full flex p-3 h-screen'>
                <div className='bg-white w-full rounded-md'>
                    test
                </div>
            </div>
        </div>
    )
}

export default HomePage