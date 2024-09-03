import { CartItem } from "../pizza/types";

export interface CartState {
  totalPrice: number;
  items: CartItem[];
}
