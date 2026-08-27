"use client";
import Combox from           "@/components/features/transaction/tambah-transaksi/Combox";
import SimpanTransaksi from  '@/components/features/transaction/tambah-transaksi/Modal';
import PilihTransaksi from   '@/components/features/transaction/tambah-transaksi/PilihTransaksi';
import { PaymentSummary } from "@/components/features/transaction/tambah-transaksi/PaymentSummary";
import TipsPopup from "@/components/features/transaction/tambah-transaksi/TipsPopup";
import { formatRupiah } from "@/components/Functions/FormatRupiah";
import { ProductCartItem } from "@/components/features/transaction/tambah-transaksi/ProductCartItem";

import {
  Key, 
  Button, 
  SearchField,
  Surface,
  useOverlayState,
  ScrollShadow
} from                       "@heroui/react";
import { 
  faMoneyBillWave, 
  faQrcode, 
  faBuildingColumns
} from                       "@fortawesome/free-solid-svg-icons";
import { 
  CirclePlusFill 
} from                       "@gravity-ui/icons";
import Link from             "next/link";
import { useState } from     "react";
import ProdukDrawer from "@/components/features/transaction/tambah-transaksi/Drawer";
import { ProdukType, SelectProductType } from '@/components/features/transaction/tambah-transaksi/Props/ProdukProps'
import clsx from 'clsx'
import NavBanner from "@/components/Shared/NavBanner";

export default function TambahTransaksi() {
  const [metode, setMetode] = useState<Key | null>();
  const [Produk, TambahProduk] = useState<SelectProductType[]>([]);
  const drawerState = useOverlayState();

  const subTotal = Produk.reduce((sum, item) => sum + (item.harga * item.quantity), 0);
  const tax = subTotal * 0.11;
  const discount = subTotal * 0.20;
  const totalHarga = subTotal + tax - discount;
  const defaultQuantity = 1;

  const list = [
    { id: 'Tunai', value:'Tunai', desc: 'Bayar langsung di kasir', icon: faMoneyBillWave}, 
    { id: 'Qris', value:'Qris', desc: 'Gopay, OVO, Dana, ShopeePay', icon: faQrcode},
    { id: 'Transfer', value:'Transfer', desc: 'BCA, Mandiri, BNI, BRI', icon: faBuildingColumns},
  ];

  const AddItem = (item: ProdukType) => {
    const isAvailable = Produk.find(Produk => Produk.nama === item.nama)
    const FormatedItem = {...item, quantity: defaultQuantity}
    if (!isAvailable) {
      TambahProduk(i => [...i, FormatedItem])
    }
  };

  const RemoveItem = (item: SelectProductType) => {
    TambahProduk(Produk.filter((element) => element !== item))
  };

  const incrementQuantity = (nama: string) => {
    TambahProduk(prevCart =>
      prevCart.map(item =>
        item.nama === nama && item.quantity < item.stok
          ? { ...item, quantity: item.quantity + 1} 
          : item
      )
    );
  };

  const decrementQuantity = (nama: string) => {
    TambahProduk(prevCart =>
      prevCart.map(item =>
        item.nama === nama && item.quantity > 1
          ? { ...item, quantity: item.quantity + -1} 
          : item
      )
    );
  };

  return (
    <div>
      <NavBanner bannerTitle="Tambah Transaksi"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">    

        {/* left side */}
        <section className="md:col-span-2 flex flex-col gap-5">
          <Surface className="bg-surface p-5 rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Informasi Pelanggan</h2>
            <Combox title="Cari atau pilih pelanggan..." list={['John Doe', 'Jane Smith', 'Bob Johnson']} />
          </Surface>
          
          <Surface className="bg-surface p-5 rounded-xl border border-gray-200  ">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">Daftar Produk</h2>
              <SearchField name="search" aria-label='Search Field' className="border rounded-md">
                <SearchField.Group className="rounded-md">
                  <SearchField.SearchIcon />
                  <SearchField.Input
                    className="w-[280px]"
                    placeholder="Cari Produk..."
                  />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
            </div>
            <br />
            <ScrollShadow className="max-h-150 w-full">
            <article className="grid grid-cols-3 gap-4 items-stretch">
                { Produk.map((item, idx) => (
                  <ProductCartItem
                    key={idx}
                    imageUrl={item.image}
                    name={item.nama}
                    unitPrice={item.harga}
                    quantity={item.quantity}
                    onIncrement={incrementQuantity}
                    stok={item.stok}
                    // onIncrement={() => {}}
                    onDecrement={decrementQuantity}
                    item={item}
                    onRemove={RemoveItem}
                  />
                ))}
                <div 
                  className={clsx(
                    "hover:opacity-50 hover:cursor-pointer transition",
                    "bg-surface border-2 opacity-25 border-green-800 border-dashed text-green-800",
                    "flex flex-col items-center justify-center",
                    "w-full min-h-96 rounded-xl"
                  )}
                  onClick={drawerState.open}
                >
                  <CirclePlusFill className="size-8 shrink-0"/>
                  <h3 className="font-bold text-center">Tambah Produk<br/>Dari Katalog</h3>   
                </div>
            </article>
            </ScrollShadow>
            <br />
            <ProdukDrawer state={drawerState} AddItem={AddItem} Produk={Produk} RemoveItem={RemoveItem} />
          </Surface>
        </section>

        {/* right side */}
        <section className="md:col-span-1 flex flex-col gap-5">
          <Surface className="bg-surface p-5 rounded-xl border border-gray-200 text-gray-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ringkasan Pembayaran</h2>
            <PaymentSummary 
              subtotal={subTotal}
              taxRate={0.11}
              discount={discount}
              promoLabel="PROMO 20"
            />
            <hr className="my-4" />

            <div className="flex justify-between items-center py-2">
              <h2 className="text-lg font-semibold text-gray-800">Total Bayar</h2>
              <span className="text-2xl text-green-800 font-black">{formatRupiah(totalHarga)}</span>
            </div>

            <br />
            <PilihTransaksi metode={metode} setMetode={setMetode} list={list}/>
            <br />
            <SimpanTransaksi metode={metode} setMetode={setMetode} list={list} bayar={totalHarga}/>
            <Link href='/penjualan'>
              <Button fullWidth className="my-1 p-6 rounded-lg bg-background border font-bold text-green-800">
                Batal!
              </Button>
            </Link>
          </Surface>

          <TipsPopup message="Gunakan kode promo 'PROMO20' untuk mendapatkan potongan harga Rp.20.000 untuk transaksi di atas Rp. 200.000."/>
        </section>
      </div>
    </div>
  )
}