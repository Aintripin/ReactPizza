export interface FetchPizzasParams {
  sortBy: string;
  order: string;
  //   category: number;
  category: string;
  search: string;
  currentPage: number;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

// export type CartItem = {
//   id: number;
//   title: string;
//   price: number;
//   imageUrl: string;
//   types: string; // dough type: "тонкое" OR "традиционное"
//   sizes: number;
//   count: number;
//   category: number;
//   rating: string;
// };

export type CartItem = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  prices: Record<number, number>;
  category: number;
  ratng: number;
};

// export type CartItem = {
//   id: number;
//   title: string;
//   price: number;
//   imageUrl: string;
//   type: string; // dough type: "тонкое" OR "традиционное"
//   size: number;
//   count: number;
// };

export interface CartState {
  items: CartItem[];
  status: Status;
}
