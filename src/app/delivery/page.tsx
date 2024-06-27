"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ShopCard from "@/components/ui/delivery/shopCard";
import { Button } from "@/components/ui/button";
import axios from "axios";

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

export default function Delivery() {
  const router = useRouter();
  const [userData, setUserData] = useState({full_name: "", address: ""});
  const [shops, setShops] = useState<Shop[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          router.push('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/login', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });
        setUserData(response.data.body.body);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("selectedItems");
    if (!storedCart) {
      router.push("./");
      return;
    }

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

    const newSubtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setSubtotal(newSubtotal);
  }, []);

  return (
    <main className="flex flex-col h-screen items-center py-10">
      <div className="relative max-w-[500px] w-screen h-screen font-montserrat text-black text-left text-sm flex flex-col bg-gray-200 space-y-[1px] shadow-custom-inset rounded-[35px] transition-all overflow-y-auto">
        <div className="flex flex-row justify-between items-center bg-background px-6 py-4">
          <div className="flex flex-row items-center space-x-3 w-1/2">
            <Link href="../cart" className="w-1/4">
              <Image
                src="/images/arrow.svg"
                alt="Back"
                width={41}
                height={41}
                className="bg-background rounded-full py-3 px-2 shadow-sm shadow-gray-700 hover:bg-gray-200 transition-all"
              />
            </Link>
            <h1 className="text-lg font-bold">Pengiriman</h1>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <Image src="/images/menu.svg" alt="Menu" height={16} width={16} className="cursor-pointer"/>
          </div>
        </div>

        <div className="bg-background px-5 py-3 text-sm space-y-1">
          <p className="font-dmSans font-medium">Alamat Pengiriman</p>
          <div className="flex flex-row space-x-2">
            <Image src="/images/greenLocationPin.svg" alt="Location" width={13} height={10}></Image>
            <p className="font-bold">{userData.full_name}</p>
          </div>
          <p className="text-xs">{userData.address}</p>
        </div>

        <div className="h-1/2 flex flex-col space-y-2 py-1 overflow-y-scroll">
          {shops.map((shop, index) => (
            <ShopCard
              key={index}
              shopName={shop.shopName}
              cartItems={shop.cartItems}
            />
          ))}
        </div>

        <div className="flex flex-row items-center bg-background px-5 py-2 justify-between font-dmSans text-sm">
          <h1 className="font-medium">Pesan untuk Penjual</h1>
          <input className="focus:outline-none text-right" placeholder="Tulis Pesan"/>
        </div>

        <div className="px-5 py-2 bg-cckLightGreen border border-cckGreen flex flex-row justify-between">
          <div className="flex flex-row items-center font-dmSans text-sm font-medium space-x-2">
            <Image src="/images/ticket.svg" alt="Voucher" width={26} height={26}/>
            <p>Voucher Toko</p>
          </div>
          <Image src="/images/arrowHead.svg" alt="Click" width={8} height={10} className="cursor-pointer"/>
        </div>

        <div className="bg-background px-5 py-3">
          <div className="flex flex-row items-center justify-between border border-gray-200 rounded-xl p-3 cursor-pointer">
            <p className="font-dmSans text-sm font-medium">Pilih Pengiriman</p>
            <Image src="/images/arrowHead.svg" alt="Click" width={8} height={10}/>
          </div>
        </div>

        <div className="bg-background font-dmSans font-medium text-sm items-center px-5 py-3">
          <h1 className="text-black">Ringkasan Pembayaran</h1>
          <div className="text-gray-400 flex flex-row justify-between">
            <h2>Subtotal Produk</h2>
            <p>Rp {subtotal}</p>
          </div>
          <div className="text-gray-400 flex flex-row justify-between">
            <h2>Subtotal Pengiriman</h2>
            <p>Rp 10.000</p>
          </div>
        </div>

        <div className="px-5 py-2 bg-cckLightGreen border border-cckGreen flex flex-row justify-between">
          <div className="flex flex-row items-center font-dmSans text-sm font-medium space-x-2">
            <Image src="/images/ticket.svg" alt="Voucher" width={26} height={26}/>
            <p>Voucher</p>
          </div>
          <Image src="/images/arrowHead.svg" alt="Click" width={8} height={10} className="cursor-pointer"/>
        </div>

        <div className="flex flex-row justify-end space-x-3 px-4 py-4 bg-background">
          <div className="text-right">
            <h1 className="font-dmSans text-xs font-medium">Total Pembayaran</h1>
            <h2 className="font-dmSans text-base font-bold">Rp. {subtotal + 10000}</h2>
          </div>
          <Link href="./payment" className="flex items-center bg-cckGreen font-montserrat text-xs font-bold text-black px-5 py-2 rounded-xl hover:brightness-90 transition-all">
            Pilih Pembayaran
          </Link>
        </div>
      </div>
    </main>
  );
}
