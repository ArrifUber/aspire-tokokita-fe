'use client'
import Filtering from "@/components/features/stok/Filtering";
import SectionStocks from "@/components/features/stok/NewTable/SectionStock";
import StockTable from "@/components/features/stok/Table";
import NavBanner from "@/components/Shared/NavBanner";
import { useGetAllStock } from "@/hooks/stock/useGetAllStock";

export default function Stok() {
  const { error, isLoading, stocks } = useGetAllStock();

  return (
    <div className="w-full flex flex-col gap-4 mx-auto">
      <section className="mb-4">
        <NavBanner bannerTitle="Stok Barang"/>
      </section>

      <section className="w-full">
        <SectionStocks stocks={isLoading || !stocks ? [] : stocks}/>
      </section>

      {/* <section className="Table border w-full rounded-xl my-4 p-0 bg-background">
        <Filtering />
        <StockTable />
      </section> */}
    </div>
  );
}
