import React from "react";
import DeliveryCard from "@/components/ui/delivery/deliveryCard";
import Delivery from "@/app/delivery/page";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  imagePath: string;
}

interface ShopCardProps {
  shopName: string;
  cartItems: CartItem[];
}

const ShopCard: React.FC<ShopCardProps> = ({
  shopName,
  cartItems,
}) => {
  return (
    <div className="bg-background font-montserrat font-bold p-3 rounded-lg shadow-md">
      <div className="flex flex-row space-x-2 items-center mb-3">
        <h1>{shopName}</h1>
      </div>
      {cartItems.map((item, index) => (
        <DeliveryCard
          key={index}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          imagePath={item.imagePath}
        />
      ))}
    </div>
  );
};

export default ShopCard;
