import Link from "next/link";

export default function Main() {
  return (
    <>
      <section className="relative w-full h-[600px] flex items-center bg-gray-200">
        <div className="absolute inset-0 z-0">
          <img src="/mainphoto.jpg" className="w-full h-full object-cover" alt="Furniture" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="">
            <span className="text-white font-bold tracking-widest uppercase text-sm">
              70% ENDİRİM
            </span>
            <h1 className="text-5xl font-extrabold text-white mt-4 leading-tight">
              MEBELLƏRƏ <br /> ŞOK TƏKLİF
            </h1>
            <button className="mt-10 bg-orange-500 text-white px-8 py-4 font-bold cursor-pointer uppercase tracking-wider hover:bg-orange-600 transition">
              <Link href="/more">DAHA ÇOX</Link>
            </button>
          </div>
        </div>
      </section>

      {/* ikinci bolmem */}

      <section className="py-20 text-center">
        <div>

          <h2 className="text-4xl font-bold text-gray-900">POPULYAR MƏHSULLAR</h2>
          <p className="mt-3 text-gray-600 font-medium">"Eviniz üçün xüsusi seçilmiş, həm komfortu, həm də zərifliyi ilə seçilən ən populyar kolleksiyalarımızla tanış olun."</p>

        </div>



      </section>
    </>
  );
}