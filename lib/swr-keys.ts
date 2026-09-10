export const SWR_KEYS = {
  product: {
    all: "products",
    detail: (id: string) => `products/${id}`,
  },

  category: {
    all: "categories",
    detail: (id: string) => `/categories/${id}`,
  },

  stock: {
    all: "stocks",
  },

  transaction: {
    all: "transactions",
    detail: (id: string) => `transactions/${id}`,
  },

  profile: {
    me: "profile/me",
  },

  vendor: {
    all: "vendors",
    detail: (id: string) => `vendor/${id}`,
  }
};
