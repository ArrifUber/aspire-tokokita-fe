"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useGetAllProduct } from "@/hooks/product/useGetAllProduct"; // sesuaikan path
import { useCreateTransaction } from "@/hooks/transaction/useCreateTransaction"; // sesuaikan path
import { CreateTransactionReq } from "@/types/api/transaction.types";
import { ProductsWithCategoryName } from "@/types/api/product.types";

import { CustomerInfoCard } from "./CustomerInfoCard";
import { PaymentSummaryCard } from "./PaymentSummaryCard";
import { CartItem, PaymentMethodOption } from "@/types/transactions/transaction-form.types";
import { calculateTransactionTotals } from "@/lib/transactions/calculateTransactionTotal";
import { ProductListCard } from "./ProductListCart";
import { userStorage } from "@/lib/storage";

export default function TransactionFormSection() {
  const router = useRouter();

  const currentUserId = userStorage.get()?.id;
  const currentCompanyId: string | undefined = undefined;

  const { products, isLoading: isLoadingProducts } = useGetAllProduct();
  const {
    postTransaction,
    isLoading: isSubmitting,
    error: submitError,
    isSuccess,
    clearError,
  } = useCreateTransaction();

  const [customerName, setCustomerName] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodOption | null>(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);

  const { subtotal, totalCapital, totalPrice, totalProfit, effectivePaymentAmount, changeAmount } =
    calculateTransactionTotals({ cartItems, discount, paymentMethod, paymentAmount });

  function addProductToCart(product: ProductsWithCategoryName) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [
        ...prev,
        {
          productId: product.id!,
          code: product.code,
          name: product.name,
          buyPrice: product.buyPrice,
          sellPrice: product.sellPrice,
          quantity: 1,
          stock: product.stock,
          image: product.image
        },
      ];
    });
  }

  function increaseQuantity(productId: string) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
          : item,
      ),
    );
  }

  function decreaseQuantity(productId: string) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item,
      ),
    );
  }

  function removeItem(productId: string) {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  function resetForm() {
    setCustomerName("");
    setCartItems([]);
    setDiscount(0);
    setPaymentMethod(null);
    setPaymentAmount(0);
  }

  async function handleSubmit() {
    setFormError(null);
    clearError();

    if (cartItems.length === 0) {
      setFormError("Tambahkan minimal 1 produk sebelum menyimpan transaksi.");
      return;
    }
    if (!paymentMethod) {
      setFormError("Pilih metode pembayaran terlebih dahulu.");
      return;
    }
    if (paymentMethod === "CASH" && paymentAmount < totalPrice) {
      setFormError("Jumlah bayar kurang dari total tagihan.");
      return;
    }

    const payload: CreateTransactionReq = {
      userId: currentUserId,
      companyId: currentCompanyId,
      customerName: customerName || undefined,
      totalPrice,
      status: "PENDING",
      detail: {
        totalCapital,
        totalProfit,
        discount,
        paymentAmount: effectivePaymentAmount,
        changeAmount,
        paymentMethod,
        products: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    };

    const result = await postTransaction(payload);
    if (result) {
      resetForm();
      router.push("/penjualan"); // sesuaikan route list transaksi kamu
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 flex flex-col gap-5">
        <CustomerInfoCard customerName={customerName} onChangeCustomerName={setCustomerName} />
        <ProductListCard
          products={products}
          isLoadingProducts={isLoadingProducts}
          cartItems={cartItems}
          onAddProduct={addProductToCart}
          onIncreaseQuantity={increaseQuantity}
          onDecreaseQuantity={decreaseQuantity}
          onRemoveItem={removeItem}
        />
      </div>

      <div className="flex flex-col gap-5">
        <PaymentSummaryCard
          subtotal={subtotal}
          discount={discount}
          onChangeDiscount={setDiscount}
          totalPrice={totalPrice}
          paymentMethod={paymentMethod}
          onChangePaymentMethod={setPaymentMethod}
          paymentAmount={paymentAmount}
          onChangePaymentAmount={setPaymentAmount}
          changeAmount={changeAmount}
          isSubmitting={isSubmitting}
          errorMessage={formError ?? submitError}
          isSuccess={isSuccess}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      </div>
    </div>
  );
}