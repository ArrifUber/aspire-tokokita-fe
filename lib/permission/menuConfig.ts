import { User } from "@/types/api/auth.types";
import {
  faHouse,
  faSackDollar,
  faWarehouse,
  faPeopleGroup,
  faTruckFast,
  faCartShopping,
  faBoxesPacking,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export type AppRole = User["role"];

export interface MenuConfigItem {
  name: string;
  href: string;
  icon: IconDefinition;
  roles: AppRole[];
}

const ALL_ROLES: AppRole[] = ["OWNER", "CASHIER", "WAREHOUSE"];

export const menuConfig: MenuConfigItem[] = [
  { name: "dashboard", href: "/", icon: faHouse, roles: ALL_ROLES },
  { name: "produk", href: "/produk", icon: faBoxesPacking, roles: ["OWNER", "WAREHOUSE"] },
  { name: "penjualan", href: "/penjualan", icon: faSackDollar, roles: ["OWNER", "CASHIER"] },
  { name: "pembelian", href: "/pembelian", icon: faCartShopping, roles: ["OWNER", "WAREHOUSE"] },
  { name: "stok", href: "/stock", icon: faWarehouse, roles: ["OWNER", "WAREHOUSE"] },
  { name: "pelanggan", href: "/pelanggan", icon: faPeopleGroup, roles: ["OWNER", "CASHIER"] },
  { name: "supplier", href: "/supplier", icon: faTruckFast, roles: ["OWNER", "WAREHOUSE"] },
];

export function isPathMatch(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * Path yang tidak terdaftar di menuConfig (misal /login, /profile)
 * dianggap tidak dibatasi role — return true.
 */
export function canAccessPath(role: AppRole | undefined, pathname: string): boolean {
  if (!role) return false;
  const matched = menuConfig.find((item) => isPathMatch(item.href, pathname));
  if (!matched) return true;
  return matched.roles.includes(role);
}