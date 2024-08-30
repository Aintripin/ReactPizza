// export type CartItem = {
//   id: number;
//   title: string;
//   price: number;
//   imageUrl: string;
//   type: string; // dough type: "тонкое" OR "традиционное"
//   size: number;
//   count: number;
// };

// export type CartItem = {
//   id: string;
//   imageUrl: string;
//   title: string;
//   types: number[];
//   sizes: number[];
//   prices: Record<number, number>;
//   category: number;
//   rating: number;
//   description: string;
// };

export type CartItem = {
  id: string;
  imageUrl: string;
  title: {
    ru: string;
    en: string;
  };
  doughType: string;
  size: number;
  price: number;
  prices: Record<string, Record<number, number>>; // prices in different currencies
  category: number;
  rating: number;
  description: {
    ru: string;
    en: string;
  };
  count: number;
};

export interface CartState {
  totalPrice: number;
  items: CartItem[];
}
