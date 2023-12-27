import React from 'react'

function InputForm({ label, type, name, placeholder, min, max, maxLength, minLength, onChange, value, form }) {
    return (
        <>
            <div className='flex flex-col w-full '>
                <label className='label-text mb-1'>
                    <span className='text-sm text-navBg'>{label}</span>
                </label>
                <input 
                    value={value}
                    name={name} 
                    form={form} 
                    type={type} 
                    placeholder={placeholder} 
                    min={min} 
                    minLength={minLength} 
                    max={max} 
                    maxLength={maxLength} 
                    onChange={onChange} 
                    className="input text-base bg-light-gray rounded-md" />
            </div>
        </>
    )
}

export default InputForm