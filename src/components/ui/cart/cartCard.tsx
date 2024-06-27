import React from "react";
import Image from "next/image";

interface CartCardProps {
  name: string;
  price: number;
  quantity: number;
  imagePath: string;
  onIncrease: () => void;
  onDelete: () => void;
  selected: boolean;
  onSelect: () => void;
}

const CartCard: React.FC<CartCardProps> = ({
  name,
  price,
  quantity,
  imagePath,
  onIncrease,
  onDelete,
  selected,
  onSelect
}) => {
  return (
    <div
      className={`font-montserrat font-medium bg-background text-left flex flex-row items-center p-3 space-x-3 hover:brightness-95 transition-all`}
      onClick={onSelect}
    >
      <div className="w-1/12">
        <div className={`w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center`}>
          <div className={`w-3 h-3 ${selected ? "bg-green-500" : "bg-white"} rounded-full`}></div>
        </div>
      </div>
      <Image src={imagePath} alt={name} height={70} width={70} />
      <div className="w-full">
        <h1 className="text-gray-400">{name}</h1>
        <p>Rp. {price}</p>
        <div className="flex flex-row justify-between items-center">
          <Image
            src="/images/pencil.svg"
            alt="Edit"
            height={24}
            width={24}
            className="cursor-pointer"
            onClick={() => console.log(`Edit ${name}`)}
          />
          <div className="flex flex-row space-x-2 items-center border border-gray-200 px-2 rounded-md">
            <Image
              src="/images/trash.svg"
              alt="Delete"
              height={18}
              width={18}
              className="cursor-pointer pt-[6px]"
              onClick={onDelete}
            />
            <span>{quantity}</span>
            <button onClick={onIncrease} className="focus:outline-none">
              <Image src="/images/plus.svg" alt="Increase" height={15} width={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
