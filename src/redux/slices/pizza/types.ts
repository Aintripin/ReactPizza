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

export type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string; // dough type: "тонкое" OR "традиционное"
  size: number;
  count: number;
};

export interface CartState {
  items: CartItem[];
  status: Status;
}
