import React from "react";

interface DropOffCardProps {
  placeName: string;
  address: string;
  selected: boolean;
  onClick: () => void;
}

export default function DropOffCard({ placeName, address, selected, onClick }: DropOffCardProps){
  return (
    <button onClick={onClick} className="font-montserrat bg-background text-left flex flex-row justify-between items-center w-[350px] rounded-[35px] p-5 shadow-md hover:brightness-95 transition-all relative">
      <div className="w-5/6">
        <h1 className="text-sm font-bold">{placeName}</h1>
        <p className="text-xs">{address}</p>
      </div>
      <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
        {selected && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
      </div>
    </button>
  );
};