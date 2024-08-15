export type Option = { title: string };

export type Product = {
  name: string;
  options?: Option[];
};

export type OrderDetail = {
  id: number;
  total: number;
  paymentType: "apelsin" | "cash" | "click" | "credit-card" | "payme";
  isDelivery: boolean;
  products: {
    count: number;
    product: Product;
  }[];
  createdAt: Date;
};
