import { SettlementStatus } from "@/types/api/settlement.types";

const STATUS_STYLE: Record<SettlementStatus, string> = {
  lunas: "bg-success-50 text-success-700",
  pending: "bg-warning-50 text-warning-700",
  menunggu: "bg-default-100 text-default-600",
};

const STATUS_LABEL: Record<SettlementStatus, string> = {
  lunas: "Lunas",
  pending: "Pending",
  menunggu: "Menunggu",
};

export default function SettlementStatusBadge({
  status,
}: {
  status: SettlementStatus;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}