"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

/**
 * Aksi per baris pada tabel Daftar Settlement.
 *
 * Untuk sekarang cuma tautan langsung ke halaman detail
 * ("/settlement/detail/[id]"), bukan dropdown menu — karena bentuk
 * compound API Menu/Dropdown dari @heroui/react di project ini belum
 * dikonfirmasi (beda dengan `ActionProductButton` yang sudah ada,
 * tapi isinya belum aku lihat). Kalau kamu punya komponen dropdown
 * yang sama polanya dengan `ActionProductButton`, kirim isinya dan
 * aku samakan supaya bisa nampung aksi lain (mis. "Proses Settlement",
 * "Kirim Laporan") dalam satu menu.
 */
export default function ActionSettlementButton({ id }: { id: string }) {
  return (
    <Link
      href={`/settlement/detail/${id}`}
      aria-label="Lihat detail settlement"
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-surface-tertiary hover:text-gray-700"
    >
      <FontAwesomeIcon icon={faEllipsisVertical} />
    </Link>
  );
}