"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

interface NavBannerProps {
  bannerTitle: string;
}

export default function NavBanner({ bannerTitle }: NavBannerProps) {
  const fullPath = usePathname();
  const paths = fullPath.split("/").filter(Boolean);
  return (
    <div className="flex bg-linear-to-r from-primary via-primary-400 via-53% to-primary-500 to-89% rounded-xl py-4 px-12 flex-col text-white shadow">
      <div className="flex gap-2 items-center text-slate-300 text-sm  truncate">
        <Link href={"/"}>Manajemen Toko</Link>
        {paths.map((path, i) => {
          const href = `/${paths.slice(0, i + 1).join("/")}`;
          const isLast = i === paths.length - 1;
          return (
            <Fragment key={i}>
              <p>/</p>
              {isLast ? (
                <p className="capitalize text-white font-bold">{path}</p>
              ) : (
                <Link href={href} className={`capitalize text-slate-300`}>
                  {path}
                </Link>
              )}
            </Fragment>
          );
        })}
      </div>
      <div>
        <h2 className="font-semibold text-3xl">{bannerTitle}</h2>
      </div>
    </div>
  );
}
