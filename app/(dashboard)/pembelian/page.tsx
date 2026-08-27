import CardPembelian from '@/components/features/pembelian/Card'
import DropDown from '@/components/Shared/DropDown'
import { SearchField } from '@heroui/react'
import DatePicker from '@/components/Shared/DatePicker'
import Link from 'next/link'
import TabelPembelian from '@/components/features/pembelian/Table'
import NavBanner from '@/components/Shared/NavBanner'

export default function Pembelian() {
  return (
    <>

 <NavBanner bannerTitle="Pembelian"/>
    <section className="grid grid-cols-3 gap-4 w-full my-6">
      <CardPembelian 
        title='Total pengeluaran' 
        value='Rp.9.000.000' 
        icon='gravity-ui:calculator' 
        gradient='bg-linear-to-bl from-rose-600 to-rose-800'
        subTextExpenses='5%'
        changes='up'
      />

      <CardPembelian 
        title='Bom belum lunas'
        value='Rp.850.000'
        icon='gravity-ui:persons'
        gradient='bg-linear-to-b from-amber-600 to-amber-700'
        subText='3 nota belum dibayar'
      />
      <CardPembelian 
        title='Rata-rata Kulakan'
        value='Rp.950.000'
        icon='gravity-ui:boxes-3'
        gradient='bg-linear-to-b from-emerald-600 to-emerald-700'
        subText='Per transaksi belanja'
      />
    </section>

    <section className='bg-surface border-gray-200 rounded-3xl min-h-100 p-8 shadow'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <SearchField name="search" aria-label='Search Field' className="border rounded-md">
            <SearchField.Group className="w-64 rounded-md">
              <SearchField.SearchIcon />
              <SearchField.Input
                className="w-[280px]"
                placeholder="Cari..."
              />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>

          <DatePicker />

          <DropDown 
            title='Kategori'
            list={['Restock', 'Utilitas', 'Transportasi']}
            width='min-w-32'
          />

          <DropDown 
            title='Status'
            list={['Lunas', 'Hutang', 'Jatuh Tempo']}
            width='min-w-32'
          />
        </div>
        <Link
          href='/pembelian/tambah' 
          className="flex items-center justify-center py-3 px-6 text-background font-bold rounded-xl shadow hover:cursor-pointer bg-linear-to-b from-primary-500 to-primary-600 active:bg-linear-to-t active:translate-y-px active:shadow-none"
        >
          <p>+ Catat Pengluaran</p>
        </Link>
      </div>
      <TabelPembelian />
    </section>
    </>
  )
}
