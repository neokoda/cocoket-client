import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="font-dmSans font-semibold text-black flex flex-row items-end justify-center bg-background px-3 py-1 shadow-custom-inset space-x-8 fixed inset-x-0 bottom-0 z-10">
      <Link href="./products" className="flex flex-col items-center justify-center rounded-xl p-1 hover:bg-gray-200 transition-all">
        <Image src="/images/localMall.svg" alt="Product" height={41} width={41}></Image>
        <h1>Product</h1>
      </Link>

      <Link href="../" className="flex flex-col items-center justify-center rounded-xl p-1 hover:bg-gray-200 transition-all">
        <Image src="/images/logo.png" alt="Product" height={41} width={41}></Image>
        <h1>Home</h1>
      </Link>

      <Link href="./tracker" className="flex flex-col items-center justify-center rounded-xl p-1 hover:bg-gray-200 transition-all">
        <Image src="/images/barChart.svg" alt="Product" height={41} width={41}></Image>
        <h1>Tracker</h1>
      </Link>

      <Link href="./games" className="flex flex-col items-center justify-center rounded-xl p-1 hover:bg-gray-200 transition-all">
        <Image src="/images/joystick.svg" alt="Product" height={41} width={41}></Image>
        <h1>Game</h1>
      </Link>
    </div>
  );
}
