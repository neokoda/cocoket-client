import Image from "next/image";
import Link from "next/link";

interface PickupCardProps {
  name: string,
  address: string,
}

export default function PickupCard({name, address}: PickupCardProps) {
  return (
    <Link href="./confirmation" className="font-montserrat bg-background text-left items-center space-x-3 border border-gray-400 flex flex-row w-[350px] rounded-xl p-4 hover:bg-cckLightBrown hover:bg-opacity-50 transition-all">
      <Image src="/images/locationPin.png" alt="Location Pin" height={38} width={38}></Image>
      <div>
        <h1 className="text-sm font-bold">{name}</h1>
        <p className="text-xs">{address}</p>
      </div>
    </Link>
  );
}
