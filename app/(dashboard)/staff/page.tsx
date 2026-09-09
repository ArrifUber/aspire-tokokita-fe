import StaffTableSection from "@/components/features/staff/StaffTableSections";
import NavBanner from "@/components/Shared/NavBanner";

export default function StaffPage(){
    return(
            <div className="w-full flex flex-col gap-4 mx-auto">
              <section id="navBanner" className="w-full">
                <NavBanner bannerTitle="Daftar Staff" />
              </section>
              <section id="staffTable" className="w-full">
                <StaffTableSection/>
              </section>
            </div>
    )
}