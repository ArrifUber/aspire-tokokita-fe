import { VendorForm } from "@/components/features/vendor/vendorForm/vendorForm";
import NavBanner from "@/components/Shared/NavBanner";

export default function AddVendorPage(){
    return(
            <div className="w-full flex flex-col gap-4 mx-auto">
              <section id="navBanner" className="w-full">
                <NavBanner bannerTitle="Edit Data Vendor" />
              </section>
              <section id="editVendorForm" className="w-full">
                <VendorForm mode="edit"/>
              </section>
            </div>
    )
}