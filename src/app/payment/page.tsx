"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  store: string;
  imagePath: string;
}

const bankOptions = [
  { id: 1, name: "BCA Virtual Account", image: "/images/bca.png", accountNumber: "1234567890" },
  { id: 2, name: "Mandiri Virtual Account", image: "/images/mandiri.png", accountNumber: "2345678901" },
  { id: 3, name: "BSI Virtual Account", image: "/images/bsi.png", accountNumber: "3456789012" },
  { id: 4, name: "BNI Virtual Account", image: "/images/bni.png", accountNumber: "4567890123" },
];

export default function Payment() {
  const router = useRouter();
  const [subtotal, setSubtotal] = useState<number>(0);
  const [userData, setUserData] = useState<any>({ points: "" });
  const [selectedBank, setSelectedBank] = useState<number>(1);
  const [usePoints, setUsePoints] = useState<boolean>(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("selectedItems");

    if (!storedCart) {
      router.push("./");
      return;
    }

    if (storedCart) {
      const cartItems: CartItem[] = JSON.parse(storedCart);

      const newSubtotal = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setSubtotal(newSubtotal);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          router.push("/login");
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/auth/user`, {
          params: {
            username: username,
          },
        });
        setUserData(response.data.body.body);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePointsToggle = () => {
    setUsePoints(!usePoints);
  };

  const handlePayment = async () => {
    try {
      const userId = localStorage.getItem("userId");
  
      if (userId && usePoints) {
        console.log("Updating user points...");
        const response = await axios.patch(
          `http://localhost:5000/api/auth/userPoints`,
          {
            id: parseInt(userId),
            pointsToAdd: "0",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
  
      const selectedItemsString = localStorage.getItem("selectedItems");
      if (!selectedItemsString) {
        console.error("No selected items found in localStorage.");
        return;
      }
  
      const selectedItems: CartItem[] = JSON.parse(selectedItemsString);
      const cartString = localStorage.getItem("cart");
  
      if (!cartString) {
        console.error("No cart items found in localStorage.");
        return;
      }
  
      let cart: CartItem[] = JSON.parse(cartString);
  
      cart = cart.filter(cartItem => !selectedItems.some(selectedItem => selectedItem.id === cartItem.id));
  
      localStorage.setItem("cart", JSON.stringify(cart));
  
      const selectedBankInfo = bankOptions.find((bank) => bank.id === selectedBank);
      const queryParams = new URLSearchParams({
        bankName: selectedBankInfo?.name || "",
        accountNumber: selectedBankInfo?.accountNumber || "",
        image: selectedBankInfo?.image || "",
        paymentDateTime: new Date().toISOString(),
      });
  
      localStorage.removeItem("selectedItems");
  
      router.push(`/payment-info?${queryParams.toString()}`);
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };
  

  return (
    <main className="flex flex-col h-screen items-center py-10">
      <div className="relative max-w-[500px] w-screen h-screen font-montserrat text-black text-left text-sm flex flex-col bg-gray-200 space-y-[1px] shadow-custom-inset rounded-[35px] transition-all overflow-y-auto">
        <div className="flex flex-row justify-between items-center bg-background px-6 py-4">
          <div className="flex flex-row items-center space-x-3 w-1/2">
            <Link href="../delivery" className="w-1/4">
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

        <div className="flex flex-row justify-between py-3 bg-background pr-4">
          <div className="flex flex-row items-center">
            <Image src="/images/coin.png" alt="Coin" height={10} width={70} />
            <div className="font-montserrat text-sm">
              <h1 className="font-bold">Points</h1>
              <p>{userData.points} Points</p>
            </div>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={usePoints}
              onChange={handlePointsToggle}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cckGreen">
            </div>
          </label>
        </div>

        <div className="flex flex-col bg-background p-4 h-full">
          <h1 className="text-sm font-bold">Metode Pembayaran</h1>
          {bankOptions.map((bank) => (
            <div
              key={bank.id}
              className="flex flex-row justify-between items-center w-full py-4"
              onClick={() => setSelectedBank(bank.id)}
            >
              <div className="flex flex-row items-center space-x-4">
                <Image src={bank.image} alt={bank.name} height={30} width={75} />
                <h1 className="font-bold">{bank.name}</h1>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${selectedBank === bank.id ? 'border-cckBrown' : 'border-gray-400'} flex items-center justify-center cursor-pointer`}>
                <div className={`w-3 h-3 rounded-full ${selectedBank === bank.id ? 'bg-cckBrown' : ''}`}></div>
              </div>
            </div>
          ))}
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
          { usePoints &&          
          <div className="text-gray-400 flex flex-row justify-between">
            <h2>Poin</h2>
            <p>-Rp {userData.points}</p>
          </div>
          }

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
            <h2 className="font-dmSans text-base font-bold">Rp. {subtotal + 10000 - (usePoints ? userData.points : 0)}</h2>
          </div>
          <button onClick={handlePayment} className="flex items-center bg-cckGreen font-montserrat text-xs font-bold text-black px-5 py-2 rounded-xl hover:brightness-90 transition-all">
            Bayar
          </button>
        </div>
      </div>
   </main>
  );
}  
