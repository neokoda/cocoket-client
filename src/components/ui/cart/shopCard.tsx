import React from "react";
import CartCard from "@/components/ui/cart/cartCard";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  imagePath: string;
}

interface ShopCardProps {
  shopName: string;
  cartItems: CartItem[];
  onItemIncrease: (itemName: string) => void;
  onItemDelete: (itemName: string) => void;
  onItemSelect: (itemName: string) => void;
  selectedItems: string[];
}

const ShopCard: React.FC<ShopCardProps> = ({
  shopName,
  cartItems,
  onItemIncrease,
  onItemDelete,
  onItemSelect,
  selectedItems
}) => {
  const handleSelectAll = () => {
    const allSelected = cartItems.every(item => selectedItems.includes(item.name));
    cartItems.forEach(item => {
      if (allSelected) {
        onItemSelect(item.name);
      } else if (!selectedItems.includes(item.name)) {
        onItemSelect(item.name);
      }
    });
  };

  const allItemsSelected = cartItems.every(item => selectedItems.includes(item.name));

  return (
    <div className="bg-background font-montserrat font-bold p-3 rounded-lg shadow-md">
      <div className="flex flex-row space-x-2 items-center mb-3">
        <div
          onClick={handleSelectAll}
          className={`w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center cursor-pointer`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              allItemsSelected ? "bg-green-500" : "bg-white"
            }`}
          ></div>
        </div>
        <h1>{shopName}</h1>
      </div>
      {cartItems.map((item, index) => (
        <CartCard
          key={index}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          imagePath={item.imagePath}
          onIncrease={() => onItemIncrease(item.name)}
          onDelete={() => onItemDelete(item.name)}
          selected={selectedItems.includes(item.name)}
          onSelect={() => onItemSelect(item.name)}
        />
      ))}
    </div>
  );
};

export default ShopCard;
