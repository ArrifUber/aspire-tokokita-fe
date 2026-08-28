"use client";

interface CustomerInfoCardProps {
  customerName: string;
  onChangeCustomerName: (value: string) => void;
}

export function CustomerInfoCard({ customerName, onChangeCustomerName }: CustomerInfoCardProps) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="font-semibold text-gray-900 mb-3">Informasi Pelanggan</h2>
      <input
        type="text"
        value={customerName}
        onChange={(e) => onChangeCustomerName(e.target.value)}
        placeholder="Nama pelanggan (opsional)"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/40"
      />
    </section>
  );
}