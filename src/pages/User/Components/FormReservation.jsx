import React from 'react'
import { useNavigate } from 'react-router-dom'
import InputForm from "../../../components/Elements/InputFormReservation"
import SelectBoxReservation from '../../../components/Elements/SelectBoxReservation';

function FormReservation() {
  const navigate = useNavigate();
  return (
    <div className="bg-white h-full pb-10">

      <form className="flex flex-col mx-24">
        {/* Header */}
        <div className="py-3 border-b-2 border-navBg">
          <ul className="flex gap-2">
            <li className="cursor-pointer"><a onClick={()=> navigate(-1)}>Home {'>'}</a></li>
            <li className="text-navBg">Reservation</li>
          </ul>
        </div>

        {/* Title */}
        <div className="py-7">
          <h1 className="text-3xl text-navBg font-medium">Confirm your reservation</h1>
        </div>

        {/* FORM Reservation */}
        <div className="flex flex-col gap-5">
          {/* Informasi Data Diri */}
          <div className="p-5 shadow-md border border-light-silver rounded-lg">
              {/* Header Title */}
              <div className="text-2xl text-navBg font-semibold mb-4">
                <h1 className="underline underline-offset-8">Informasi Data Diri</h1>
              </div>
              {/* Content */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-5">
                  <InputForm type="text" placeholder="xxxx" label="Nama Depan"/>
                  <InputForm type="text" placeholder="xxxx" label="Nama Belakang"/>
                </div>
                <InputForm type="text" placeholder="xxxx" label="Nama Tertanggung"/>
                <InputForm type="text" placeholder="xxxx" label="Alamat Lengkap"/>
                <InputForm type="number" placeholder="xxxx" label="Nomor Handphone / Whatsapp"/>
              </div>
          </div>

          <div className="flex gap-5">
            {/* Data Kendaraan */}
            <div className="p-5 shadow-md border w-full border-light-silver rounded-lg">
                {/* Header Title */}
                <div className="text-2xl text-navBg font-semibold mb-4">
                  <h1 className="underline underline-offset-8">Data Kendaraan</h1>
                </div>
                {/* Content */}
                <div className="flex flex-col gap-2">
                  <SelectBoxReservation label="Merk"/>
                  <SelectBoxReservation label="Tipe"/>
                  <SelectBoxReservation label="Tahun"/>
                  <InputForm type="text" placeholder="xxxx" label="Warna"/>
                </div>
            </div>

            {/* Keterangan Kejadian */}
            <div className="p-5 shadow-md border w-full border-light-silver rounded-lg">
                {/* Header Title */}
                <div className="text-2xl text-navBg font-semibold mb-4">
                  <h1 className="underline underline-offset-8">Keterangan - Keterangan Kejadian</h1>
                </div>
                {/* Content */}
                <div className="flex flex-col gap-2">
                  <InputForm type="date" placeholder="xxxx" label="Tanggal Kejadian"/>
                  <InputForm type="text" placeholder="xxxx" label="Tempat"/>
                  <InputForm type="time" placeholder="xxxx" label="Jam"/>
                  <InputForm type="number" placeholder="xxxx" label="Kecepatan ( km/jam )"/>
                </div>
            </div>
          </div>

          {/* Nama Pengemudi Kendaraan */}
          <div className="p-5 shadow-md border border-light-silver rounded-lg">
              {/* Header Title */}
              <div className="text-2xl text-navBg font-semibold mb-4">
                <h1 className="underline underline-offset-8">Nama Pengemudi Kendaraan</h1>
              </div>
              {/* Content */}
              <div className="flex flex-col gap-2">
                <InputForm type="text" placeholder="xxxx" label="Nama Lengkap"/>
                <div className="flex gap-5">
                  <SelectBoxReservation label="Hubungan dengan tertanggung"/>
                  <InputForm type="number" placeholder="xxxx" label="Umur"/>
                </div>
                <div className="flex gap-5">
                  <InputForm type="text" placeholder="xxxx" label="Pekerjaan"/>
                  <SelectBoxReservation label="Jenis Golongan SIM"/>
                </div>
              </div>
          </div>

        </div>
      </form>
      <div className="flex justify-center mt-5">
        <button className="btn btn-wide text-white font-bold">Submit</button>
      </div>
    </div>
  )
}

export default FormReservation