import DetailVendorSection from "@/components/features/vendor/detailVendor/DetailVendorSection";
import NavBanner from "@/components/Shared/NavBanner";

export default function DetailVendorPage(){
    return(
                    <div className="w-full flex flex-col gap-4 mx-auto">
                      <section id="navBanner" className="w-full">
                        <NavBanner bannerTitle="Detail Vendor" />
                      </section>
                      <section id="detailVendorSection" className="w-full">
                        <DetailVendorSection />
                      </section>
                    </div>
    )
}