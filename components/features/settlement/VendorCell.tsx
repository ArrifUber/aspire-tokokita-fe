/**
 * Palet warna avatar, dipilih deterministik berdasarkan nama vendor
 * supaya tiap vendor konsisten dapat warna yang sama di setiap render.
 */
const AVATAR_COLORS = [
  "bg-primary-800",
  "bg-slate-700",
  "bg-teal-700",
  "bg-emerald-700",
  "bg-cyan-700",
];

function getAvatarColor(seed: string) {
  const sum = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export default function VendorCell({
  name,
  jumlahProduk,
}: {
  name: string;
  jumlahProduk: number;
}) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${getAvatarColor(
          name,
        )}`}
      >
        {initial}
      </div>
      <div className="truncate">
        <p className="truncate font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{jumlahProduk} produk</p>
      </div>
    </div>
  );
}