import { ColumnDef } from "@/components/Shared/ReusableTable";
import { Switch } from "@heroui/react";
import ActionProductButton from "./ActionProductButton";
import { Product } from "@/types/api/product.types";
import { formatPrice } from "@/lib/formatPrice";
import ProductImageCell from "./ProductImageCell";
import { useToggleProductStatus } from "@/hooks/product/useToggleProductStatus";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const StatusCell = ({ product }: { product: Product }) => {
  const { trigger, isMutating } = useToggleProductStatus();

  const handleToggle = async () => {
    try {
      await trigger(product.id);
    } catch (error) {
      console.error("Gagal mengubah status produk:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        isSelected={product.isActive}
        isDisabled={isMutating}
        onChange={handleToggle}
        aria-label={`Status produk ${product.name}`}
        size="md"
      >
        {({ isSelected }) => (
          <Switch.Content>
            <Switch.Control className={isSelected ? "bg-success" : "bg-danger"}>
              <Switch.Thumb>
                <Switch.Icon>
                  {isSelected ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="size-3 text-success-foreground opacity-100"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="size-3 text-danger-foreground opacity-70"
                    />
                  )}
                </Switch.Icon>
              </Switch.Thumb>
            </Switch.Control>
          </Switch.Content>
        )}
      </Switch>

      <span
        className={`text-xs font-semibold ${
          product.isActive ? "text-success-foreground" : "text-danger-foreground"
        }`}
      >
        {product.isActive ? "Aktif" : "Nonaktif"}
      </span>
    </div>
  );
};

export const productColumns: ColumnDef<Product>[] = [
  {
    key: "produk",
    label: "Produk",
    minWidth: 220,
    renderCell: (row) => (
      <div className="flex items-center gap-2">
        <div className="flex justify-center items-center w-12 h-12 bg-primary-50 rounded-md shrink-0 overflow-hidden border">
          <ProductImageCell filename={row.image} />
        </div>
        <div className="truncate">
          <p className="truncate font-semibold">{row.name}</p>
          <p className="text-sm text-gray-500">SKU: {row.code}</p>
        </div>
      </div>
    ),
  },
  {
    key: "categoryName",
    label: "Kategori",
    minWidth: 160,
    renderCell: (row) => <p>{row.category.name}</p>,
  },
{
    key: "stock",
    label: "stok",
    renderCell: (row) => {
      const isLowStock = row.stock <= row.minimumStock;
      return (
        <div className="flex flex-col">
          <span className={`font-semibold ${isLowStock ? "text-danger-600" : "text-default-700"}`}>
            {row.stock}
          </span>
          {isLowStock ? (
            <span className="text-xs text-danger-foreground font-medium">
              Stok Menipis (Min. {row.minimumStock})
            </span>
          ) :             <span className="text-xs text-success-foreground font-medium">
              Tersedia (Min. {row.minimumStock})
            </span>}
        </div>
      );
    },
  },
  {
    key: "buyPrice",
    label: "Harga Beli",
    minWidth: 140,
    renderCell: (row) => <p>{formatPrice(row.buyPrice)}</p>,
  },
  {
    key: "sellPrice",
    label: "Harga Jual",
    minWidth: 140,
    renderCell: (row) => <p>{formatPrice(row.sellPrice)}</p>,
  },
  {
    key: "isActive",
    label: "Status",
    renderCell: (product: Product) => (<StatusCell product={product} />),
  },
  {
    key: "aksi",
    label: "Aksi",
    minWidth: 160,
    renderCell: (row) => (
      <div className="flex items-center gap-2">
        <ActionProductButton id={row.id} code={row.code} />
      </div>
    ),
  },
];
