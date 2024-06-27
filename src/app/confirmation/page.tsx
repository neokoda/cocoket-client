"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Confirmation() {
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  useEffect(() => {
    const generateRandomCode = () => {
      return Math.floor(1000 + Math.random() * 9000).toString();
    };
    setConfirmationCode(generateRandomCode());
  }, []);

  return (
    <main className="flex flex-col h-fit-content items-center justify-center font-dmSans space-y-[48px] pt-8">
      <Image src="/images/cocoText.png" alt="Cocoket" width={120} height={50} />
      
      <div className="flex flex-col w-[250px] text-center space-y-2">
        <h2 className="text-lg text-cckDarkBrown font-black">Kode Konfirmasi</h2>
        <p className="text-sm text-white">4-digit kode konfirmasi diberikan kepada petugas dari Cocoket</p>
      </div>

      <h1 className="text-6xl border border-cckDarkBrown font-montserrat font-bold text-shadow text-cckDarkBrown px-6 py-8 rounded-xl">
        {confirmationCode.split("").join(" ")}
      </h1>

      <div className="flex flex-col w-[300px] text-sm space-y-2">
        <p className="text-white">Kode yang diberikan salah? <Link href="" className="text-blue-700">Perbaharui kode</Link></p>
        <Link href="" className="text-blue-700">Informasi lebih lanjut</Link>
      </div>

      <div className="w-[300px] space-y-2">
        <h2 className="text-cckDarkBrown text-base font-black">Disclaimer:</h2>
        <p className="text-white text-sm">Kode konfirmasi bersifat rahasia dan pribadi untuk keperluan transaksi dengan pihak Cocoket</p>
      </div>
    </main>
  );
}
