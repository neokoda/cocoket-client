"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import GoogleMapDisplay from "@/components/ui/googleMapDisplay";
import PickupCard from "@/components/ui/pickup/pickupCard";

interface PickupLocation {
  name: string,
  address: string,
}

export default function Pickup() {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [bottomDivVisible, setBottomDivVisible] = useState(true);

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
  };

  const pickupLocations: PickupLocation[] = [
    { name: "Pedagang Santan", address: "Jl. Musyawarah No.50, RW.2, Kb. Jeruk, Kec. Kb. Jeruk, Kota Jakarta Barat" },
    { name: "WARUNG ES KELAPA MUDA", address: "Jl. Angsana No.49, RT.6, RW.5, Kebon Jeruk, Kebonjeruk, Kota Jakarta Barat" },
  ];

  
  const containerStyle = {
    width: "375px",
    height: "375px",
    borderRadius: "30px",
  };

  const toggleBottomDiv = () => {
    setBottomDivVisible(!bottomDivVisible);
  };

  return (
    <main className="flex flex-col h-fit-content items-center justify-center space-y-5 pt-8">
      <div className="flex flex-row items-center justify-between w-[325px]">
        <Link href="../." className="w-1/4">
          <Image src="/images/arrow.svg" alt="Back" width={27} height={27} className="bg-background rounded-full py-2 px-1 shadow-md shadow-gray-700 hover:bg-gray-200 transition-all"/>
        </Link>
        <Image src="/images/cocoText.png" alt="Cocoket" width={120} height={50}/>
        <div className="w-1/4">
        </div>
      </div>

      <Input placeholder="Cari Lokasi"></Input>

      <div className="rounded-xl">
        <GoogleMapDisplay onLocationSelect={handleLocationSelect} containerStyle={containerStyle}/>
      </div>

      <div className={`text-black flex flex-col items-center justify-center bg-background px-4 pt-2 pb-2 shadow-custom-inset rounded-t-2xl fixed bottom-0 transition-all ${bottomDivVisible ? 'translate-y-0' : 'translate-y-[90%]'} overflow-y-auto max-h-[30vh]`}>
        <button onClick={toggleBottomDiv} className="border p-1 w-[55px] rounded-lg bg-gray-500 shadow-md"></button>
        <div className="pt-6 space-y-2 overflow-y-scroll">
          {pickupLocations.map((location, index) => (
              <PickupCard
                key={index}
                name={location.name}
                address={location.address}
              />
          ))}
        </div>
      </div>
    </main>
  );
}
