import React from 'react'
import InputForm from '../Elements/InputForm'

function ModalUserLogin() {
    return (
        <>
            <dialog id="modalLogin" className="modal">
                <div className="modal-box text-navBg bg-light-silver">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="w-full h-full">
                        <div className="mb-5">
                            <h1 className="flex justify-center text-3xl font-bold">Login</h1>
                        </div>
                        <div className='flex flex-col gap-5 px-5'>
                            <InputForm label="Email" type="text" placeholder="example@gmail.com" />
                            <InputForm label="Password" type="password" placeholder="password" />
                        </div>
                        <div className='flex justify-center mt-7'>
                            <button className='btn border-none w-3/4 text-navBg hover:text-light-gray bg-mikado-yellow rounded'>Login</button>
                        </div>
                    </div>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default ModalUserLogin