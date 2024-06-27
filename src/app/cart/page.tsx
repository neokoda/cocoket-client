"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ShopCard from "@/components/ui/cart/shopCard";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  store: string;
  imagePath: string;
}

interface Shop {
  shopName: string;
  cartItems: CartItem[];
}

export default function Cart() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]); // Update state to store CartItem objects

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cartItems: CartItem[] = JSON.parse(storedCart);

      const groupedByStore = cartItems.reduce((acc: Record<string, CartItem[]>, item) => {
        if (!acc[item.store]) {
          acc[item.store] = [];
        }
        acc[item.store].push(item);
        return acc;
      }, {});

      const shopsArray: Shop[] = Object.keys(groupedByStore).map((storeName) => ({
        shopName: storeName,
        cartItems: groupedByStore[storeName],
      }));

      setShops(shopsArray);
    }
  }, []);

  const handleItemIncrease = (itemName: string) => {
    updateCartItem(itemName, 1);
  };

  const handleItemDelete = (itemName: string) => {
    updateCartItem(itemName, 0, true);
  };

  const handleProceedToDelivery = () => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    window.location.href = "./delivery";
  };

  const handleItemSelect = (itemName: string) => {
    const selectedItem = shops.flatMap(shop => shop.cartItems).find(item => item.name === itemName);
    if (selectedItem) {
      setSelectedItems(prevSelectedItems =>
        prevSelectedItems.some(item => item.name === itemName)
          ? prevSelectedItems.filter(item => item.name !== itemName)
          : [...prevSelectedItems, selectedItem]
      );
    }
  };

  const handleSelectAll = () => {
    const allSelected = shops.every(shop =>
      shop.cartItems.every(item => selectedItems.some(selectedItem => selectedItem.name === item.name))
    );
    if (allSelected) {
      setSelectedItems([]);
    } else {
      const allItems = shops.flatMap(shop => shop.cartItems);
      setSelectedItems(allItems);
    }
  };

  const updateCartItem = (itemName: string, change: number, isDelete = false) => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      let cartItems: CartItem[] = JSON.parse(storedCart);

      if (isDelete) {
        cartItems = cartItems.filter(item => item.name !== itemName);
      } else {
        cartItems = cartItems.map(item => {
          if (item.name === itemName) {
            const newQuantity = item.quantity + change;
            return { ...item, quantity: newQuantity };
          }
          return item;
        }).filter(item => item.quantity > 0);
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));

      const groupedByStore = cartItems.reduce((acc: Record<string, CartItem[]>, item) => {
        if (!acc[item.store]) {
          acc[item.store] = [];
        }
        acc[item.store].push(item);
        return acc;
      }, {});

      const shopsArray: Shop[] = Object.keys(groupedByStore).map((storeName) => ({
        shopName: storeName,
        cartItems: groupedByStore[storeName],
      }));

      setShops(shopsArray);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    selectedItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const allItemsSelected = shops.every(shop =>
    shop.cartItems.every(item => selectedItems.some(selectedItem => selectedItem.name === item.name))
  );

  return (
    <main className="flex flex-col h-screen items-center py-10">
      <div className="relative max-w-[500px] w-screen h-screen font-montserrat text-black text-left text-sm flex flex-col bg-gray-200 shadow-custom-inset rounded-[35px] transition-all overflow-y-auto">
        <div className="flex flex-row justify-between items-center bg-background px-6 py-4">
          <div className="flex flex-row items-center space-x-3 w-1/2">
            <Link href="../." className="w-1/4">
              <Image
                src="/images/arrow.svg"
                alt="Back"
                width={41}
                height={41}
                className="bg-background rounded-full py-3 px-2 shadow-sm shadow-gray-700 hover:bg-gray-200 transition-all"
              />
            </Link>
            <h1 className="text-lg font-bold">Keranjang</h1>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <Image src="/images/search.svg" alt="Search" height={16} width={16} className="cursor-pointer"/>
            <Image src="/images/menu.svg" alt="Menu" height={16} width={16} className="cursor-pointer"/>
          </div>
        </div>

        <div className="flex flex-col space-y-2 py-2 overflow-y-scroll mb-24">
          {shops.map((shop, index) => (
            <ShopCard
              key={index}
              shopName={shop.shopName}
              cartItems={shop.cartItems}
              onItemIncrease={handleItemIncrease}
              onItemDelete={handleItemDelete}
              onItemSelect={handleItemSelect}
              selectedItems={selectedItems.map(item => item.name)}
            />
          ))}
        </div>

        <div className="flex flex-row justify-between bg-background w-full px-3 py-8 absolute bottom-0">
          <div
            className="flex flex-row space-x-2 items-center font-dmSans cursor-pointer"
            onClick={handleSelectAll}
          >
            <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
              <div className={`w-3 h-3 rounded-full ${allItemsSelected ? "bg-green-500" : "bg-white"}`}></div>
            </div>
            <span className="font-medium">Semua</span>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="flex flex-col text-right">
              <span>Total</span>
              <span>Rp. {calculateTotal()}</span>
            </div>
            <Button
              onClick={handleProceedToDelivery}
              className={`rounded-xl ${selectedItems.length > 0 ? 'bg-cckGreen text-black' : 'bg-gray-400 text-gray-600 cursor-not-allowed'} font-bold px-6 transition-all`}
              disabled={selectedItems.length === 0}
            >
              Beli
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
