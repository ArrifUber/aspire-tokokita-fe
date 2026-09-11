'use client'
import ErrorProductSection from "@/components/features/product/ErrorProductSection";
import ProductSection from "@/components/features/product/ProductSection";
import NavBanner from "@/components/Shared/NavBanner";
import { useGetAllProduct } from "@/hooks/product/useGetAllProduct";

export default function ProductPage() {


  return (
    <div className="w-full flex flex-col gap-4 mx-auto">
      <section id="navBanner" className="w-full">
        <NavBanner bannerTitle="Daftar Produk" />
      </section>
      <section id="productTable" className="w-full">

          <ProductSection/>
      </section>
    </div>
  );
}
