"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BottomCard from "./BottomCard";
import { isPathMatch, menuConfig } from "@/lib/permission/menuConfig";
import { useProfile } from "@/hooks/profile/useProfile";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useProfile();

  const visibleMenus = menuConfig.filter(
    (item) => !user || item.roles.includes(user.role),
  );

  return (
    <aside className="bg-surface p-4 w-60 flex flex-col sticky top-0 left-0 h-screen shadow">
      <div className="flex flex-col gap-8 h-full">
        {/* Logo */}
        <div className="flex items-center pt-3 ">
          <div className="w-16">
            <img
              src="/brand-icon.svg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-bold text-2xl/tight">
              Toko<span className="text-primary">Kita</span>
            </h1>
            <p className="text-slate-600 text-base/tight">Manajemen Toko</p>
          </div>
        </div>

        {/* Nav List */}
        <nav className="flex flex-col gap-4 overflow-y-scroll scrollbar-thin">
          {visibleMenus.map((item) => {
            const isActive = isPathMatch(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-xl gap-6 transition-all ${
                  isActive
                    ? "bg-primary-100 text-primary shadow"
                    : "hover:bg-primary-50 hover:text-primary"
                }`}
              >
                <span>
                  <FontAwesomeIcon icon={item.icon} className="text-xl" />
                </span>{" "}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <BottomCard />
      </div>
    </aside>
  );
}