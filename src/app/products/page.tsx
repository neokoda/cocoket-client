"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import ProductCard from "@/components/ui/products/productCard";
import axios from "axios";

interface Product {
  id: number,
  name: string;
  price: number;
  rating: number;
  num_reviews: number;
  bricket: boolean;
  image_path: string;
  Store: {
    name: string;
  }; 
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  store: string;
  imagePath: string;
}

export default function Products() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showBricket, setShowBricket] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/product");
        setProducts(response.data.body.body);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cartItems: CartItem[] = JSON.parse(storedCart);
      const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      setCartItemCount(totalItems);
    }
  }, []);

  const updateCartItemCount = (change: number) => {
    setCartItemCount((prevCount) => prevCount + change);
  };

  const handleButtonClick = (isBricket: boolean) => {
    const type = isBricket ? "bricket" : "kelapa";
    router.push(`/products?type=${type}`);
    setShowBricket(isBricket);
  };

  return (
    <>
      <main className="flex flex-col h-screen items-center space-y-5 pt-8">
        <div className="flex flex-row items-center space-x-4">
          <Input placeholder="Cari Barang" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Link href="./cart">
            <div className="relative">
              <Image src="/images/shoppingCart.svg" alt="Cart" width={23} height={22} />
              {cartItemCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-cckBrown text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </div>
              )}
            </div>
          </Link>
        </div>

        <div className="font-montserrat bg-gray-300 w-[375px] rounded-xl p-1">
          <Button
            className={`w-1/2 p-2 h-auto text-xs font-bold ${showBricket ? 'text-black bg-white' : 'text-white bg-gray-300'}`}
            onClick={() => handleButtonClick(true)}
          >
            Bricket
          </Button>
          <Button
            className={`w-1/2 p-2 h-auto text-xs font-bold ${!showBricket ? 'text-black bg-white' : 'text-white bg-gray-300'}`}
            onClick={() => handleButtonClick(false)}
          >
            Serabut dan Batok Kelapa
          </Button>
        </div>

        <div className="h-3/4 w-[375px] text-sm flex flex-wrap justify-center bg-gray-200 px-4 pt-6 pb-1 rounded-xl transition-all overflow-y-auto">
          {products
            .filter(product => product.bricket === showBricket)
            .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((product, index) => (
              <ProductCard
                key={index}
                id={product.id}
                name={product.name}
                price={product.price}
                rating={product.rating}
                numOfReviewers={product.num_reviews}
                imagePath={product.image_path}
                store={product.Store.name}
                updateCartItemCount={updateCartItemCount} // Pass the function to update cart item count
              />
            ))}
        </div>
      </main>
      <Navbar />
    </>
  );
};
