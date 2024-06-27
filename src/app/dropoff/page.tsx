"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import DropOffCard from "@/components/ui/dropoff/dropOffCard";

interface DropOffLocation {
  placeName: string;
  address: string;
}

export default function DropOff() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleCardClick = (index: number) => {
    setSelectedCard(selectedCard === index ? null : index);
  };

  const dropOffLocations: DropOffLocation[] = [
    { placeName: "Bank Sampah", address: "Kebon Jeruk Indah Utama 6 No.8, RT.4/RW.7, Srengseng, Kec. Kembangan, Kota Jakarta Baratn" },
    { placeName: "PT Yusril Trash", address: "Jl. Rawasari Sel. No.35, RT.16/RW.2, Cemp. Putih Tim., Kec. Cemp. Putih, Kota Jakarta Pusat" },
    { placeName: "Eco Kalyca", address: "Jl. Anggrek Raya No.30, RT.1/RW.2, Malaka Sari, Kec. Duren Sawit, Kota Jakarta Timur" },
    { placeName: "Bank Sampah Bithaya", address: "Jl. Swadarma Raya Jl. Kp. Baru 2, RT.8/RW.2, Ulujami, Kec. Pesanggrahan, Kota Jakarta Selatan" },
    { placeName: "Bank Sampah 2", address: "Kebon Jeruk Indah Utama 6 No.8, RT.4/RW.7, Srengseng, Kec. Kembangan, Kota Jakarta Baratn" },
    { placeName: "PT Yusril Trash (Cabang Kemanggisan)", address: "Jl. Kemanggisan Raya. No.35, RT.16/RW, Kec. Kemanggisan, Kota Jakarta Barat" },
    { placeName: "Eco Kalyca New", address: "Jl. Anggrek Raya No.31, RT.1/RW.2, Malaka Sari, Kec. Duren Sawit, Kota Jakarta Timur" },
    { placeName: "Bank Sampah Bithaya 2", address: "Jl. Swadarma Raya Jl. Kp. Baru 3, RT.8/RW.2, Ulujami, Kec. Pesanggrahan, Kota Jakarta Selatan" },
  ];

  const filteredLocations = useMemo(() => {
    if (!searchQuery) return dropOffLocations;
    return dropOffLocations.filter((location) =>
      location.placeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, dropOffLocations]);

  return (
    <main className="flex flex-col h-screen items-center justify-center space-y-5 pt-8">
      <div className="flex flex-row items-center justify-between w-[325px]">
        <Link href="../." className="w-1/4">
          <Image
            src="/images/arrow.svg"
            alt="Back"
            width={27}
            height={27}
            className="bg-background rounded-full py-2 px-1 shadow-md shadow-gray-700 hover:bg-gray-200 transition-all"
          />
        </Link>
        <Image src="/images/cocoText.png" alt="Cocoket" width={120} height={50} />
        <div className="flex flex-row space-x-3 w-1/4 justify-end"></div>
      </div>

      <Input
        placeholder="Cari Lokasi"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="h-4/5 w-[375px] text-black text-left text-sm flex flex-col bg-gray-200 px-2 pt-6 pb-1 shadow-custom-inset rounded-[35px] transition-all overflow-y-auto">
        <h1 className="px-4 pb-2 font-bold font-montserrat">Daftar Lokasi Drop Off</h1>
        <div className="space-y-2 py-4 overflow-y-scroll rounded-3xl">
          {filteredLocations.map((location, index) => (
            <DropOffCard
              key={index}
              placeName={location.placeName}
              address={location.address}
              selected={selectedCard === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
        <Link
          href={selectedCard !== null ? "../confirmation" : "#"}
          className={`font-montserrat font-bold text-sm text-center text-black py-5 rounded-[50px] bg-cckGreen hover:bg-cckGreen hover:brightness-90 transition-all ${selectedCard === null ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={(e) => {
            if (selectedCard === null) {
              e.preventDefault();
            }
          }}
        >
          Pilih Tujuan Ini
        </Link>
      </div>
    </main>
  );
}
