"use client";

import { Vendor } from "@/types/api/vendor.types";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, buttonVariants, Modal } from "@heroui/react";
import Link from "next/link";

interface VendorDetailModalProps {
  id: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function VendorDetailModal({
  id,
  isOpen,
  setIsOpen,
}: VendorDetailModalProps) {
//   const { error, isLoading, vendor } = useVendorDetail(id);

  const vendor: Vendor = {
    id: "123a",
    jumlahProduk: 14,
    kontak: "085737054415",
    name: "Kopi Hitam",
    noRekening: "3792829181",
    rekening: "BCA",
    status: "Aktif"
  }

//   if (isLoading || !vendor) return null;

  const LabelAndDesc = [
    {
      label: "Nama Vendor",
      desc: vendor.name,
    },
    {
      label: "Contact / No. WhatsApp",
      desc: vendor.kontak,
    },
    {
      label: "Bank",
      desc: vendor.rekening,
    },
    {
      label: "No. Rekening",
      desc: vendor.noRekening,
    },
    {
      label: "Jumlah Produk Titipan",
      desc: `${vendor.jumlahProduk} produk`,
    },
    {
      label: "Status",
      desc: vendor.status,
    },
  ];

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-[600px] rounded-xl bg-surface p-0 h-[90vh]">
            {/* Close */}
            <Modal.CloseTrigger className="flex items-center justify-center bg-transparent text-white">
              <FontAwesomeIcon icon={faX} />
            </Modal.CloseTrigger>

            {/* Header */}
            <Modal.Header className="gap-0 bg-linear-to-r from-primary via-primary-500 via-53% to-primary-600 to-89% p-5 text-white">
              <h3 className="text-sm font-medium text-white/80">
                Detail Vendor
              </h3>

              <Modal.Heading className="text-2xl font-bold text-white">
                {vendor.name}
              </Modal.Heading>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="m-0 px-8 py-6">
              <div className="flex flex-col gap-6">
                {/* Vendor Information */}
                <div>
                  <h2 className="mb-4 text-base font-semibold text-foreground">
                    Informasi Vendor
                  </h2>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                    {LabelAndDesc.map((item) => (
                      <div key={item.label}>
                        <h3 className="text-sm font-semibold text-foreground">
                          {item.label}
                        </h3>

                        {item.label === "Status" ? (
                          <div className="mt-1">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                vendor.status === "Aktif"
                                  ? "bg-success-100 text-success-700"
                                  : "bg-default-100 text-default-600"
                              }`}
                            >
                              <span
                                className={`mr-2 h-2 w-2 rounded-full ${
                                  vendor.status === "Aktif"
                                    ? "bg-success"
                                    : "bg-default-400"
                                }`}
                              />
                              {vendor.status}
                            </span>
                          </div>
                        ) : (
                          <p className="mt-1 text-sm text-default-600">
                            {item.desc}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <hr />

                {/* Product Summary */}
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    Produk Titipan
                  </h2>

                  <p className="mt-1 text-sm text-default-600">
                    Vendor ini memiliki{" "}
                    <span className="font-semibold text-foreground">
                      {vendor.jumlahProduk} produk
                    </span>{" "}
                    yang terdaftar sebagai produk titipan.
                  </p>
                </div>

                <hr />

                {/* Settlement Information */}
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    Informasi Pembayaran
                  </h2>

                  <p className="mt-1 text-sm text-default-600">
                    Pembayaran hasil penjualan produk titipan akan diproses
                    berdasarkan data settlement vendor.
                  </p>
                </div>
              </div>
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer className="m-0 border-t p-4">
              <Button
                slot="close"
                variant="tertiary"
                className="rounded-md shadow-sm"
              >
                Tutup
              </Button>

              <Link
                href={`/vendor/${id}/edit`}
                className={`${buttonVariants({
                  variant: "primary",
                })} rounded-md border-0 bg-primary text-white shadow-sm hover:bg-primary-700`}
              >
                Edit Vendor
              </Link>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}