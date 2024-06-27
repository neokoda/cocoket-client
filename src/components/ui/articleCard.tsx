import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  title: string;
  content: string;
  link: string;
}

export default function ArticleCard({title, content, link}: ArticleCardProps) {
  return (
    <Link className="bg-[url(/images/coconutArticle.png)] w-[325px] h-[150px] rounded-xl hover:brightness-90 transition-all min-w-[325px]" href={link}>
      <div className="flex flex-col justify-center h-[150px] bg-cckBrown w-[70%] px-5 py-8 rounded-l-xl rounded-r-[100px] font-dmSans">
        <h1 className="text-lg font-semibold text-white pb-3">{title}</h1>
        <p className="text-[10px] text-white">{content}</p>
      </div>
      <div>
      </div>
    </Link>
  );
}
