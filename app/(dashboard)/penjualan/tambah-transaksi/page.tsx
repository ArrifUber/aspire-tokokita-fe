"use client";
import NavBanner from "@/components/Shared/NavBanner";
import TransactionFormSection from "@/components/features/transaction/TransactionForm/TransactionFormSection";

export default function TambahTransaksi() {

  return (
        <div className="w-full flex flex-col gap-4 mx-auto">
          <section id="navBanner" className="w-full">
            <NavBanner bannerTitle="Tambah Transaksi" />
          </section>
          <section className="w-full">
      <TransactionFormSection/>

          </section>

    </div>
  )
}