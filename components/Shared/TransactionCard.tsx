import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBoxOpen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function TransactionCard() {
  // Nanti akan difetch?
  const transaction = 42;
  const pendapatan = "42.500.000";
  const keranjang = "101.190";

  const cardInfo = [
    {
      title: "Transaksi Hari ini",
      description: `${transaction} Transaksi`,
      icon: faCartShopping,
      gradient: "bg-linear-to-b from-primary-600 to-primary-500",
    },
    {
      title: "Total Pendapatan",
      description: `Rp.${pendapatan}`,
      icon: faBoxOpen,
      gradient: "bg-linear-to-b from-lime-600 to-lime-700",
    },
    {
      title: "Rata-rata Keranjang",
      description: `Rp.${keranjang}`,
      icon: faUser,
      gradient: "bg-linear-to-b from-lime-500 to-lime-400",
    },
  ];

  return (
    <section className="grid grid-cols-3 gap-4 w-full">
      {cardInfo.map((info, index) => {
        return (
          <div
            key={index}
            className="flex items-center bg-surface border border-gray-200 rounded-2xl p-4 gap-6"
          >
            <div
              className={`${info.gradient} text-background text-2xl rounded-2xl flex items-center justify-center shadow w-18 h-18`}
            >
              <FontAwesomeIcon icon={info.icon} className="relative" />
            </div>
            <span>
              <p >{info.title}</p>
              <strong className="text-xl">{info.description}</strong>
            </span>
          </div>
        );
      })}
    </section>
  );
}
