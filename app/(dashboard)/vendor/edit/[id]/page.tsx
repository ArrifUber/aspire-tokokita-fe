"use client"
import { VendorForm } from "@/components/features/vendor/vendorForm/vendorForm";
import NavBanner from "@/components/Shared/NavBanner";
import { useVendorDetail } from "@/hooks/vendor/useVendorDetail";
import { Params } from "next/dist/server/request/params";
import { useParams } from "next/navigation";

interface IdParams extends Params{
  id: string
}

export default function AddVendorPage(){
  const {id} = useParams<IdParams>();
  
    const { error, isLoading, vendor} = useVendorDetail(id);
    return(
            <div className="w-full flex flex-col gap-4 mx-auto">
              <section id="navBanner" className="w-full">
                <NavBanner bannerTitle="Edit Data Vendor" />
              </section>
              <section id="editVendorForm" className="w-full">
                <VendorForm mode="edit" initialData={vendor}/>
              </section>
            </div>
    )
}