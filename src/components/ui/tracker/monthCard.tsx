interface MonthCardProps {
  month: string;
  amount: number;
  numOfTransactions: number;
}

export default function MonthCard({ month, amount, numOfTransactions }: MonthCardProps) {
  return (
    <div className="font-montserrat bg-background text-left flex flex-row justify-between items-center space-x-3 border border-gray-400 w-[325px] rounded-xl px-8 py-3">
      <h1 className="font-bold text-base">{month}</h1>
      <div>
        <h2 className="font-bold text-sm">Rp. {amount}</h2>
        <h3 className="text-xs">{numOfTransactions} Transaksi</h3>
      </div>
    </div>
  );
}
