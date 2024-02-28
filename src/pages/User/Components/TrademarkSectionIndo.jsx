import React from "react";
import TrademarkCard from "../../../components/Elements/TrademarkCard";

// Image
import Trade1 from "../../../assets/trademark1.png";
import Trade2 from "../../../assets/trademark2.png";
import Trade3 from "../../../assets/car-serve.png";

function TrademarkSectionIndo() {
  return (
    <section id="trademarksection" className="bg-light-gray py-16 text-navBg">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Keunggulan Kami</h2>
        <div className="grid grid-cols-3 gap-5 px-32">
          <TrademarkCard
            image={Trade1}
            title="Perbaikan Mobil 4-7 hari"
            content="Rasakan Servis Cepat yang selesai hanya dalam 4-7 hari, yang akan membantu Anda menghemat waktu dan tenaga berharga Anda saat mengunjungi Bengkel untuk Servis Mobil Anda."
          />
          <TrademarkCard
            image={Trade2}
            title="Teknisi Profesional"
            content="GUNS merekrut Teknisi Perbaikan Mobil Terbaik dengan Pengalaman Minimal 10+ tahun dan Melatih mereka. Setelah mengaktifkannya dengan standar Garage Nation, mereka ditugaskan untuk layanan/perbaikan."
          />
          <TrademarkCard
            image={Trade3}
            title="Penjemputan & Pengantaran Mobil"
            content="Layanan penjemputan dan pengantaran kendaraan tersedia di GUNS. Pelayanan kami didukung oleh Car Service profesional dan driver berpengalaman yang tidak hanya handal dalam pekerjaannya, namun juga dapat dipercaya dalam hal kejujuran."
          />
        </div>
      </div>
    </section>
  );
}

export default TrademarkSectionIndo;
