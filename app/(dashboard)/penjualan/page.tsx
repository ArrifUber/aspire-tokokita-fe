"use client";
import TransactionCard from "@/components/Shared/TransactionCard";
import NavBanner from "@/components/Shared/NavBanner";
import TransactionSection from "@/components/features/transaction/TransactionSection";
import { useGetAllTransactions } from "@/hooks/transaction/useGetAllTransactions";

export default function Penjualan() {
   const { error, isLoading, transactions } = useGetAllTransactions();
  return (
    <div className="w-full flex flex-col gap-4 mx-auto">
      <section id="navBanner" className="w-full">
        <NavBanner bannerTitle="Daftar Transaksi Penujualan" />
      </section>

      <section>
        <TransactionCard />
      </section>

      <section>
        <TransactionSection transaction={isLoading || !transactions ? [] : transactions} />
      </section>
    </div>
  );
}
