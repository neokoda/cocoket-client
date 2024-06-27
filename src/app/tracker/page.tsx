"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import MonthCard from "@/components/ui/tracker/monthCard";
import CircularChart from "@/components/ui/tracker/circularChart";

export default function Tracker() {
  const [dataView, setDataView] = useState<'income' | 'spendings'>('income');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(getTotalAmount());
  }, []);

  const handleToggle = (view: 'income' | 'spendings') => {
    setDataView(view);
    setTotalAmount(getTotalAmount());
  };
  
  const getTotalAmount = () => {
    return monthsData.reduce((acc, curr) => {
      return acc + (dataView === 'income' ? curr.income.amount : curr.spendings.amount);
    }, 0);
  };

  const monthsData = [
    { month: "Januari", income: { amount: 600000, numOfTransactions: 10 }, spendings: { amount: 400000, numOfTransactions: 5 } },
    { month: "Februari", income: { amount: 700000, numOfTransactions: 12 }, spendings: { amount: 500000, numOfTransactions: 6 } },
    { month: "Maret", income: { amount: 650000, numOfTransactions: 11 }, spendings: { amount: 450000, numOfTransactions: 7 } },
    { month: "April", income: { amount: 620000, numOfTransactions: 9 }, spendings: { amount: 430000, numOfTransactions: 4 } },
    { month: "Mei", income: { amount: 600000, numOfTransactions: 8 }, spendings: { amount: 350000, numOfTransactions: 3 } },
    { month: "Juni", income: { amount: 580000, numOfTransactions: 7 }, spendings: { amount: 400000, numOfTransactions: 4 } },
    { month: "Juli", income: { amount: 600000, numOfTransactions: 9 }, spendings: { amount: 420000, numOfTransactions: 5 } },
    { month: "Agustus", income: { amount: 670000, numOfTransactions: 11 }, spendings: { amount: 480000, numOfTransactions: 6 } },
    { month: "September", income: { amount: 640000, numOfTransactions: 10 }, spendings: { amount: 440000, numOfTransactions: 5 } },
    { month: "Oktober", income: { amount: 720000, numOfTransactions: 13 }, spendings: { amount: 530000, numOfTransactions: 7 } },
    { month: "November", income: { amount: 750000, numOfTransactions: 14 }, spendings: { amount: 550000, numOfTransactions: 7 } },
    { month: "Desember", income: { amount: 780000, numOfTransactions: 15 }, spendings: { amount: 570000, numOfTransactions: 8 } },
  ];

  return (
    <main className="flex flex-col h-screen items-center space-y-5 pt-8">
      <h1 className="text-xl font-bold font-montserrat">Tracker</h1>

      <div className="h-5/6 w-[375px] text-black flex flex-col bg-background p-6 shadow-custom-inset rounded-[35px] transition-all space-y-3">
        <div className="w-[110px] font-montserrat text-sm font-bold flex flex-row space-x-2 bg-gray-300 border border-gray-400 px-3 pt-1 rounded-3xl">
          <Image src="/images/calendar.svg" alt="Calendar" height={24} width={24}/>
          <span>2024</span>
        </div>

        <CircularChart data={monthsData} dataView={dataView} totalValue={getTotalAmount()}/>

        <div className="font-montserrat bg-gray-300 rounded-[35px] p-1 flex">
          <Button
            className={`w-1/2 p-2 h-auto text-xs font-bold rounded-[35px] ${dataView === 'income' ? 'text-black bg-white' : 'text-white bg-gray-300'}`}
            onClick={() => handleToggle('income')}
          >
            Pemasukan
          </Button>
          <Button
            className={`w-1/2 p-2 h-auto text-xs font-bold rounded-[35px] ${dataView === 'spendings' ? 'text-black bg-white' : 'text-white bg-gray-300'}`}
            onClick={() => handleToggle('spendings')}
          >
            Pengeluaran
          </Button>
        </div>

        <div className="space-y-1 overflow-y-scroll overflow-x-clip">
          {monthsData.map((data, index) => (
            <MonthCard
              key={index}
              month={data.month}
              amount={dataView === 'income' ? data.income.amount : data.spendings.amount}
              numOfTransactions={dataView === 'income' ? data.income.numOfTransactions : data.spendings.numOfTransactions}
            />
          ))}
        </div>
      </div>

      <Navbar />
    </main>
  );
}
