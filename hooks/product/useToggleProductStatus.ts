import useSWRMutation from "swr/mutation";
import { toggleProductStatus } from "@/lib/api/product";
import { SWR_KEYS } from "@/lib/swr-keys";
import { useSWRConfig } from "swr";

export function useToggleProductStatus() {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    SWR_KEYS.product.all,
    async (_, { arg: id }: { arg: string }) => {
      const updated = await toggleProductStatus(id);
      // Revalidate/refresh semua list produk yang ter-cached
      mutate((key) => Array.isArray(key) && key[0] === SWR_KEYS.product.all);
      return updated;
    }
  );
}