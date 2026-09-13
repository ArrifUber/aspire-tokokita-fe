"use client"
import DetailVendorSection from "@/components/features/vendor/detailVendor/DetailVendorSection";
import NavBanner from "@/components/Shared/NavBanner";
import { useVendorDetail } from "@/hooks/vendor/useVendorDetail";
import { Params } from "next/dist/server/request/params";
import { useParams } from "next/navigation";
interface IdParams extends Params{
  id: string
}

export default function DetailVendorPage(){
    const {id} = useParams<IdParams>();
    
      const { error, isLoading, vendor} = useVendorDetail(id);
    return(
                    <div className="w-full flex flex-col gap-4 mx-auto">
                      <section id="navBanner" className="w-full">
                        <NavBanner bannerTitle="Detail Vendor" />
                      </section>
                      <section id="detailVendorSection" className="w-full">
                        {isLoading || error ? null : <DetailVendorSection vendor={vendor}/>}
                        {/* <DetailVendorSection vendor={vendor}/> */}
                      </section>
                    </div>
    )
}