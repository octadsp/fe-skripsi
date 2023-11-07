import React from 'react'

function InputForm({ label, type, placeholder, min, max, maxLength, minLength }) {
    return (
        <>
            <div className='flex flex-col'>
                <label className='label-text mb-1'>
                    <span className='text-sm text-navBg'>{label}</span>
                </label>
                <input type={type} placeholder={placeholder} min={min} minLength={minLength} max={max} maxLength={maxLength} className="input text-base bg-light-gray rounded-md" />
            </div>
        </>
    )
}

export default InputForm