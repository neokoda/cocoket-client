"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import ArticleCard from "@/components/ui/articleCard";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  store: string;
  imagePath: string;
}

export default function PaymentInfo() {
  const [accountNumber, setAccountNumber] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("0");
  const [image, setImage] = useState("");
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  useEffect(() => {
    const fetchPaymentDetails = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const storedAccountNumber = queryParams.get("accountNumber") || "";
      const storedImage = queryParams.get("image") || "";
      const amount = queryParams.get("amount") || "";
      const paymentDateTime = queryParams.get("paymentDateTime");

      setAccountNumber(storedAccountNumber);
      setImage(storedImage);
      setPaymentAmount(amount);

      if (paymentDateTime) {
        const paymentDate = new Date(paymentDateTime);
        const expiry = new Date(paymentDate.getTime() + 24 * 60 * 60 * 1000);
        setExpiryDate(expiry);
      }
    };

    fetchPaymentDetails();
  }, []);

  useEffect(() => {
    const updateTimeLeft = () => {
      if (expiryDate) {
        const now = new Date();
        const timeDiff = expiryDate.getTime() - now.getTime();
        if (timeDiff > 0) {
          const hours = Math.floor((timeDiff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
          const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
          const seconds = Math.floor((timeDiff % (60 * 1000)) / 1000);
          setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          setTimeLeft("00:00:00");
        }
      }
    };

    const timerId = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(timerId);
  }, [expiryDate]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const cartItems: CartItem[] = JSON.parse(storedCart);
        const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        setCartItemCount(totalItems);
      }
    }
  }, [])

  return (
    <main className="flex flex-col h-screen justify-center items-center">
      <div className="flex flex-row justify-between items-center px-6 py-4">
        <div className="flex flex-row items-center space-x-3">
          <Link href="../.">
            <Image
              src="/images/arrow.svg"
              alt="Back"
              width={41}
              height={41}
              className="bg-background rounded-full py-3 px-2 shadow-sm shadow-gray-700 hover:bg-gray-200 transition-all"
            />
          </Link>
          <Input placeholder="Cari Barang"></Input>
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
          <Image src="/images/menu.svg" alt="Menu" height={16} width={25} className="cursor-pointer"/>
        </div>
      </div>

      <div className="relative max-w-[500px] w-screen font-montserrat text-black text-left text-sm flex flex-col bg-gray-200 space-y-[1px] shadow-custom-inset rounded-[35px] transition-all overflow-y-auto">
        <div className="flex flex-row justify-between items-center py-3 bg-background px-8">
          <div className="font-montserrat">
            <h1 className="text-sm font-bold">Bayar Sebelum</h1>
            {expiryDate && <h2 className="text-xs">{expiryDate.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })} WIB</h2>}
          </div>
          <div className="flex flex-row items-center">
            <Image src="/images/redClock.png" alt="Clock" height={32} width={32}/>
            <h1 className="font-bold text-red-600">{timeLeft}</h1>
          </div>
        </div>

        <div>
          <div className="flex flex-row justify-between items-center text-sm bg-background p-4">
            <div>
              <h2>Nomor Virtual Account</h2>
              <h1 className="font-bold">{accountNumber}</h1>
            </div>
            <Image src={image} alt="Bank Image" height={30} width={75}/>
          </div>
          <div className="flex flex-row justify-between items-center text-sm bg-background p-4">
            <div>
              <h2>Total Tagihan</h2>
              <h1 className="font-bold">Rp {paymentAmount}</h1>
            </div>
            <h1 className="font-bold text-cckGreen">Lihat Detail</h1>
          </div>
          <ul className="bg-background px-4 text-xs list-disc list-inside space-y-2">
            <li><strong>Penting: </strong> Transfer Virtual Account hanya bisa dilakukan dari <strong>bank yang kamu pilih</strong></li>
            <li>Transaksi kamu baru akan diteruskan ke penjual setelah pembayaran berhasil diverifikasi.</li>
          </ul>
          <div className="flex flex-row justify-between items-center text-sm bg-background p-4">
            <Link href="" className="font-dmSans text-sm font-medium text-cckGreen bg-background border-2 border-cckGreen rounded-xl px-4 py-2">Lihat Cara Bayar</Link>
          </div>
        </div>

        <div className="flex flex-col bg-background py-3">
          <h1 className="px-4 py-2 font-bold text-sm">Rekomendasi untuk Anda</h1>
          <div className="flex flex-row px-4 py-2 space-x-6 overflow-x-scroll">
            <Link href="./products" className="p-1 border border-gray-200 rounded-xl">
              <Image src="/images/products/bricketExport.png" alt="Product" height={110} width={110} className="max-w-[110px]"/>
            </Link>
            <Link href="./products" className="p-1 border border-gray-200 rounded-xl">
              <Image src="/images/products/bricketA.png" alt="Product" height={110} width={110} className="max-w-[110px]"/>
            </Link>
            <Link href="./products" className="p-1 border border-gray-200 rounded-xl">
              <Image src="/images/products/bricketHex.jpeg" alt="Product" height={110} width={110} className="max-w-[110px]"/>
            </Link>
            <Link href="./products" className="p-1 border border-gray-200 rounded-xl">
              <Image src="/images/products/serabutKelapa.png" alt="Product" height={110} width={110} className="max-w-[110px]"/>
            </Link>
          </div>
        </div>

        
        <div className="flex flex-col justify-center h-full bg-background px-4 py-2 overflow-x-scroll overflow-y-scroll">
          <h1 className="pb-4 font-bold text-sm">Berita Harian</h1>
          <div className="flex flex-row space-x-6">
            <ArticleCard title="Life Of Tree" content="Kelapa merupakan tanaman multimanfaat. Di beberapa negara, kelapa juga sering disebut..." link="https://www.tribunnews.com/metropolitan/2021/05/20/kepala-perpustakaan-nasional-kelapa-merupakan-tanaman-multimanfaat"/>
            <ArticleCard title="BRIKET SEBAGAI ENERGI ALTERNATIF" content="Keunggulan briket antara lain lebih murah dan ekonomis, panas yang tinggi..." link="https://journal.ubb.ac.id/index.php/lppm/article/download/141/124#:~:text=Keunggulan%20briket%20antara%20lain%20lebih,menggunakan%20bahan%20kimia%20dan%20aman"/>
          </div>
        </div>
      </div>
    </main>
  );
}
