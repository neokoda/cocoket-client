import React from "react";
import Image from "next/image";

interface CartCardProps {
  name: string;
  price: number;
  quantity: number;
  imagePath: string;
}

export default function DeliveryCard({
  name,
  price,
  quantity,
  imagePath,
}: CartCardProps) {
  return (
    <div className={`font-montserrat font-medium bg-background text-left flex flex-row items-center p-3 space-x-3 hover:brightness-95 transition-all`}>
      <Image src={imagePath} alt={name} height={70} width={70} />
      <div className="w-full">
        <h1 className="text-gray-400">{name}</h1>
        <p>{quantity} x Rp. {price}</p>
      </div>
    </div>
  );
};