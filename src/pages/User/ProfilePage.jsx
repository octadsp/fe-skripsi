import React from "react";
import Header from "./Components/HeaderReservation";
import AvatarProfile from "../../components/Elements/AvatarProfile";

function ProfilePage() {
  return (
    <>
      <Header />
      <div className="bg-white h-full pb-10">

        <div className="flex mx-16 pt-10 ">
          <div className="flex justify-between w-full">
            <div className="w-2/6 px-24">
              <div className="h-full flex flex-col gap-2 justify-center items-center py-5 px-16 shadow-md border border-light-silver rounded-lg">
                <AvatarProfile width={200} />
                <h1 className="text-3xl text-navBg">John Doe</h1>
                <h1 className="text-xl text-navBg/60">PT. John Doe Anjay</h1>
                <button className="btn btn-block btn-sm mt-3 bg-mikado-yellow hover:text-white text-navBg font-bold border-navBg/20">
                  edit
                </button>
              </div>
            </div>
            <div className="w-4/6 h-full flex flex-col gap-2 py-5 px-10 shadow-md border border-light-silver rounded-lg">
              <div className="flex gap-10 w-full border-b-2 py-3">
                <p className="text-navBg w-1/4 font-semibold text-3xl">Nama Depan</p>
                <p className="text-3xl font-semibold">John</p>
              </div>
              <div className="flex gap-10 w-full border-b-2 py-3">
                <p className="text-navBg w-1/4 font-semibold text-3xl">Nama Belakang</p>
                <p className="text-3xl font-semibold">Doe</p>
              </div>
              <div className="flex gap-10 w-full border-b-2 py-3">
                <p className="text-navBg w-1/4 font-semibold text-3xl">Email</p>
                <p className="text-3xl font-semibold">johndoe@gmail.com</p>
              </div>
              <div className="flex gap-10 w-full border-b-2 py-3">
                <p className="text-navBg w-1/4 font-semibold text-3xl">Handphone</p>
                <p className="text-3xl font-semibold">+62821224242</p>
              </div>
              <div className="flex gap-10 w-full border-b-2 py-3">
                <p className="text-navBg w-1/4 font-semibold text-3xl">Alamat</p>
                <p className="text-3xl font-semibold">Jl. Berhias 12c</p>
              </div>

            </div>
          </div>
        </div>

        <div className="flex mx-16 pt-10 ">
            <div className="w-full flex flex-col gap-2 py-10 px-16 shadow-md border border-light-silver rounded-lg">
                {/* TITLE */}
                <div className="pb-4">
                    <h1 className="text-navBg text-3xl font-bold">History Reservation</h1>
                </div>

                {/* CONTENT */}
                <div className="w-full grid grid-cols-2 gap-5 text-navBg">
                    <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                        <div className="flex flex-col w-3/4 ">
                            <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                            <p className="mt-3 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fugit qui quas iste nesciunt esse dolorem inventore est blanditiis, laboriosam expedita </p>
                        </div>
                        <div className="w-1/4 flex justify-center item-center">
                            <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">Detail</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                        <div className="flex flex-col w-3/4 ">
                            <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                            <p className="mt-3 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fugit qui quas iste nesciunt esse dolorem inventore est blanditiis, laboriosam expedita </p>
                        </div>
                        <div className="w-1/4 flex justify-center item-center">
                            <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">Detail</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                        <div className="flex flex-col w-3/4 ">
                            <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                            <p className="mt-3 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fugit qui quas iste nesciunt esse dolorem inventore est blanditiis, laboriosam expedita </p>
                        </div>
                        <div className="w-1/4 flex justify-center item-center">
                            <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">Detail</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                        <div className="flex flex-col w-3/4 ">
                            <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                            <p className="mt-3 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fugit qui quas iste nesciunt esse dolorem inventore est blanditiis, laboriosam expedita </p>
                        </div>
                        <div className="w-1/4 flex justify-center item-center">
                            <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">Detail</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                        <div className="flex flex-col w-3/4 ">
                            <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                            <p className="mt-3 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fugit qui quas iste nesciunt esse dolorem inventore est blanditiis, laboriosam expedita </p>
                        </div>
                        <div className="w-1/4 flex justify-center item-center">
                            <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">Detail</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                        <div className="flex flex-col w-3/4 ">
                            <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                            <p className="mt-3 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fugit qui quas iste nesciunt esse dolorem inventore est blanditiis, laboriosam expedita </p>
                        </div>
                        <div className="w-1/4 flex justify-center item-center">
                            <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">Detail</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center rounded-lg p-3 shadow-lg ring-1 ring-light-silver">
                        <div className="flex flex-col w-3/4 ">
                            <h1 className="text-xl">00001 - 23 Januari 2019</h1>
                            <p className="mt-3 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fugit qui quas iste nesciunt esse dolorem inventore est blanditiis, laboriosam expedita </p>
                        </div>
                        <div className="w-1/4 flex justify-center item-center">
                            <button className="transition ease-in-out delay-90 hover:-translate-y-1 hover:scale-110 my-5 px-12 h-16 hover:bg-navBg hover:text-white bg-mikado-yellow font-semibold text-lg rounded-lg">Detail</button>
                        </div>
                    </div>
                    
                </div>
              </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
