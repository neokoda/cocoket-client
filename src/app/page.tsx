"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import ArticleCard from "@/components/ui/articleCard";
import Navbar from "@/components/ui/navbar";
import axios from "axios";

interface UserData {
  id: number;
  username: string;
  points: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  store: string;
  imagePath: string;
}

const Home = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  const articles = [
    {
      title: "Life Of Tree",
      content: "Kelapa merupakan tanaman multimanfaat. Di beberapa negara, kelapa juga sering disebut...",
      link: "https://www.tribunnews.com/metropolitan/2021/05/20/kepala-perpustakaan-nasional-kelapa-merupakan-tanaman-multimanfaat",
    },
    {
      title: "Briket Sebagai Energi Alternatif",
      content: "Keunggulan briket antara lain lebih murah dan ekonomis, panas yang tinggi...",
      link: "https://journal.ubb.ac.id/index.php/lppm/article/download/141/124#:~:text=Keunggulan%20briket%20antara%20lain%20lebih,menggunakan%20bahan%20kimia%20dan%20aman",
    },
  ];

  const handlePrev = () => {
    setCurrentArticleIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : articles.length - 1));
  };

  const handleNext = () => {
    setCurrentArticleIndex((prevIndex) => (prevIndex < articles.length - 1 ? prevIndex + 1 : 0));
  };

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
        const userId = response.data.body.body.id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", response.data.body.body.username);

        const username = response.data.body.body.username;
        const userResponse = await axios.get(`http://localhost:5000/api/auth/user?username=${username}`);
        setUserData(userResponse.data.body.body);

        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          const cartItems: CartItem[] = JSON.parse(storedCart);
          const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
          setCartItemCount(totalItems);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="flex flex-col h-fit-content items-center justify-center space-y-5 pt-8">
        <div className="flex flex-row items-center justify-between w-[325px]">
          <div className="w-1/4"></div>
          <Image src="/images/cocoText.png" alt="Cocoket" width={120} height={50} />
          <div className="flex flex-row space-x-3 w-1/4 justify-end">
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
            <Link href="">
              <Image src="/images/accountCircle.svg" alt="Account" width={30} height={29} />
            </Link>
          </div>
        </div>

        <Input placeholder="Cari Nama Produk"></Input>

        <div className="flex flex-row items-center space-x-2">
          <button onClick={handlePrev} className="flex items-center justify-center pr-2 py-2 pl-1 w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-all">
            <Image src="/images/arrowLeft.svg" alt="Previous" width={16} height={16} className="p-1"/>
          </button>
          <div className="flex-1 flex justify-center overflow-hidden">
            <ArticleCard {...articles[currentArticleIndex]} />
          </div>
          <button onClick={handleNext} className="flex items-center justify-center pl-2 py-2 pr-1 w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-all">
            <Image src="/images/arrowRight.svg" alt="Next" width={16} height={16} className="p-1"/>
          </button>
        </div>

        {userData && (
          <div className="font-jua text-black flex flex-row items-center justify-between w-[325px] rounded-lg border border-cckDarkGreen bg-background px-5 py-3 shadow-sm shadow-black">
            <span className="text-xl">Halo cocomate!</span>
            <div className="flex flex-row space-x-[4px] items-center text-base">
              <Image src="/images/coin.png" alt="Coin" width={25} height={29} />
              <span>{userData.points}</span>
              <span>points</span>
            </div>
          </div>
        )}

        <div className="font-montserrat font-bold text-black flex flex-col w-[325px] rounded-lg border border-cckDarkGreen bg-background px-3 py-3 shadow-sm shadow-black space-y-2">
          <span className="text-sm">Jual Serabut dan Batok Kelapa</span>
          <div className="flex flex-row items-center text-base space-x-1">
            <Link href="./pickup" className="flex flex-row items-center w-1/2 border border-cckDarkGreen rounded-xl px-2 py-2 space-x-2 hover:bg-gray-200 transition-all">
              <Image src="/images/pickup.png" alt="Pick Up" height={50} width={25} />
              <span>Pick Up</span>
            </Link>
            <Link href="./dropoff" className="flex flex-row items-center w-1/2 border border-cckDarkGreen rounded-xl px-2 py-2 space-x-2 hover:bg-gray-200 transition-all">
              <Image src="/images/dropPoint.png" alt="Drop Point" height={50} width={25} />
              <span>Drop Point</span>
            </Link>
          </div>
        </div>

        <Link href="./products?type=kelapa" className="font-montserrat font-bold text-black flex flex-row items-center w-[325px] rounded-lg border border-cckDarkGreen bg-background px-3 py-3 shadow-sm shadow-black space-x-5 hover:bg-gray-200 transition-all">
          <Image src="/images/coconutIcon.png" alt="Coconut Icon" height={37} width={37} />
          <h1>Beli Limbah Serabut dan Batok Kelapa</h1>
        </Link>

        <Link href="./products?type=bricket" className="font-montserrat font-bold text-black flex flex-row items-center w-[325px] rounded-lg border border-cckDarkGreen bg-background px-3 py-3 shadow-sm shadow-black space-x-5 hover:bg-gray-200 transition-all">
          <Image src="/images/brickIcon.png" alt="Brick Icon" height={37} width={37} />
          <h1>Beli Briket</h1>
        </Link>
      </main>

      <Navbar></Navbar>
    </>
  );
};

export default Home;
