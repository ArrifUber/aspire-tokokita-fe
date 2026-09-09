import StaffFormSection from "@/components/features/staff/staffForm/StaffFormSection";
import NavBanner from "@/components/Shared/NavBanner";

export default function AddStaffPage() {
  return (
    <div className="w-full flex flex-col gap-4 mx-auto">
      <section id="navBanner" className="w-full">
        <NavBanner bannerTitle="Tambah Staff Baru" />
      </section>
      <section id="addStaffForm" className="w-full">
        <StaffFormSection />
      </section>
    </div>
  );
}