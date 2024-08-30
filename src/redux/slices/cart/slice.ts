// default imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// utility functions
import { getCartFromLS } from "../../../utils/getCartFromLocalStorage";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";

// types & interfaces
import { CartItem, CartState } from "./types";

// actual code
const { items, totalPrice } = getCartFromLS();

const initialState: CartState = {
  items,
  totalPrice,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        ++findItem.count;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        if (findItem.count > 1) {
          --findItem.count;
        } else {
          // Remove the item if count is 0
          state.items = state.items.filter(
            (item) =>
              !(
                item.id === action.payload.id &&
                item.type === action.payload.type &&
                item.size === action.payload.size
              )
          );
        }
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count - sum;
      }, 0);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
