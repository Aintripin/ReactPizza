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
  id: string;
  imageUrl: string;
  title: Record<string, string>;
  doughTypes: Record<string, string[]>;
  sizes: number[];
  prices: Record<string, Record<number, number>>;
  category: number;
  rating: number;
  description: Record<string, string>;
  count: number;
};

export interface CartState {
  items: CartItem[];
  status: Status;
}
