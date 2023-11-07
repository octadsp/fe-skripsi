import React from 'react'
import InputForm from '../Elements/InputForm'
import SelectBox from '../Elements/SelectBox'

function ModalUserRegister() {
    return (
        <>
            <dialog id="modalRegister" className="modal">
                <div className="modal-box text-navBg bg-light-silver">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="w-full h-full">
                        <div className="mb-3">
                            <h1 className="flex justify-center text-3xl font-bold">Register</h1>
                        </div>
                        <div className='flex flex-col gap-3 px-5'>
                            <InputForm label="Firstname" type="text" placeholder="Firstname" minLength={3} maxLength={25} />
                            <InputForm label="Lastname" type="text" placeholder="Lastname" minLength={3} maxLength={25} />
                            <InputForm label="Email" type="email" placeholder="example@gmail.com" />
                            <InputForm label="Password" type="password" placeholder="password" minLength={3} maxLength={25} />
                            <InputForm label="Telepon/WA" type="number" placeholder="+62xxx" min={1} max={15} />
                        </div>
                        <div className='flex justify-center mt-5'>
                            <button className='btn border-none text-navBg hover:text-light-gray w-3/4 bg-mikado-yellow rounded'>Register</button>
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

export default ModalUserRegister