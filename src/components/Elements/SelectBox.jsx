import React from 'react'

// var dataType = {
//     "type": "Perusahaan",
//     "type": "Individu"
// }

function SelectBox() {
    return (
        <>
            <label className="text-sm">Kategori</label>
            <select className="select select-bordered select-sm w-full max-w-xs text-sm bg-light-gray">
                {/* {dataType?.map((item, index) => (
                    <option >{item.type}</option>
                ))} */}
                <option>Perusahaan</option>
                <option>Individu</option>
            </select>
        </>
    )
}

export default SelectBox