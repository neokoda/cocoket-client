import { useState, useEffect } from "react";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  store: string;
  imagePath: string;
}

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  rating: number;
  numOfReviewers: number;
  imagePath: string;
  store: string;
  updateCartItemCount: (change: number) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  rating,
  numOfReviewers,
  imagePath,
  store,
  updateCartItemCount,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cart: CartItem[] = JSON.parse(storedCart);
      const item = cart.find((item) => item.id === id);
      if (item) {
        setQuantity(item.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, [id]);

  const addToCart = () => {
    const storedCart = localStorage.getItem("cart");
    let cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    const existingItemIndex = cart.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1, store, imagePath });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQuantity(quantity + 1);
    updateCartItemCount(1);
  };

  const removeFromCart = () => {
    if (quantity > 0) {
      const storedCart = localStorage.getItem("cart");
      let cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

      const existingItemIndex = cart.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity -= 1;

        if (cart[existingItemIndex].quantity === 0) {
          cart = cart.filter((item) => item.id !== id);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setQuantity(quantity - 1);
        updateCartItemCount(-1);
      }
    }
  };

  return (
    <div className="font-dmSans bg-background flex flex-col m-1 space-x-3 space-y-1 w-[160px] h-[270px] rounded-xl px-2 pb-4 relative">
      <Image src={imagePath} alt="Product Image" width={160} height={160} />

      <h1 className="font-semibold text-sm">{name}</h1>
      <h2 className="font-bold text-xs text-red-500">Rp. {price}</h2>

      <div className="flex flex-row text-xs space-x-2">
        <div className="flex flex-row space-x-1">
          <Image src="/images/ratingStar.svg" alt="Rating" height={11} width={11} />
          <span className="text-xs">{rating}</span>
        </div>
        <span>{numOfReviewers} Reviews</span>
      </div>

      <div className="flex flex-row justify-end pt-2 absolute bottom-2 right-2">
        <div className="flex flex-row space-x-3 justify-end items-center border border-gray-200 px-2 rounded-md">
          <button onClick={removeFromCart}>-</button>
          <span>{quantity}</span>
          <button onClick={addToCart}>+</button>
        </div>
      </div>
    </div>
  );
}
