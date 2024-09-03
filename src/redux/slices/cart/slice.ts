// // default imports
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // utility functions
// import { getCartFromLS } from "../../../utils/getCartFromLocalStorage";
// import { calcTotalPrice } from "../../../utils/calcTotalPrice";

// // types & interfaces
// import { CartState } from "./types";
// import { CartItem } from "../pizza/types";

// // actual code
// const { items, totalPrice } = getCartFromLS();

// const initialState: CartState = {
//   items,
//   totalPrice,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // addItem: (state, action: PayloadAction<CartItem>) => {
//     //   const findItem = state.items.find(
//     //     (obj) =>
//     //       obj.id === action.payload.id &&
//     //       obj.type === action.payload.type &&
//     //       obj.size === action.payload.size
//     //   );

//     //   if (findItem) {
//     //     ++findItem.count;
//     //   } else {
//     //     state.items.push({
//     //       ...action.payload,
//     //       count: 1,
//     //     });
//     //   }

//     //   state.totalPrice = calcTotalPrice(state.items);
//     // },
//     addItem: (state, action: PayloadAction<CartItem>) => {
//       const findItem = state.items.find(
//         (obj) =>
//           obj.id === action.payload.id &&
//           obj.doughType === action.payload.doughType &&
//           obj.size === action.payload.size
//       );

//       if (findItem) {
//         ++findItem.count;
//       } else {
//         state.items.push({
//           ...action.payload,
//           count: 1,
//         });
//       }

//       state.totalPrice = calcTotalPrice(state.items);
//     },

//     // minusItem: (state, action: PayloadAction<CartItem>) => {
//     //   const findItem = state.items.find(
//     //     (obj) =>
//     //       obj.id === action.payload.id &&
//     //       obj.type === action.payload.type &&
//     //       obj.size === action.payload.size
//     //   );

//     //   if (findItem) {
//     //     if (findItem.count > 1) {
//     //       --findItem.count;
//     //     } else {
//     //       // Remove the item if count is 0
//     //       state.items = state.items.filter(
//     //         (item) =>
//     //           !(
//     //             item.id === action.payload.id &&
//     //             item.type === action.payload.type &&
//     //             item.size === action.payload.size
//     //           )
//     //       );
//     //     }
//     //   }

//     //   state.totalPrice = state.items.reduce((sum, obj) => {
//     //     return obj.price * obj.count - sum;
//     //   }, 0);
//     // },

//     minusItem: (
//       state,
//       action: PayloadAction<{ id: string; doughType: string; size: number }>
//     ) => {
//       const findItem = state.items.find(
//         (obj) =>
//           obj.id === action.payload.id &&
//           obj.doughType === action.payload.doughType &&
//           obj.size === action.payload.size
//       );

//       if (findItem) {
//         if (findItem.count > 1) {
//           --findItem.count;
//         } else {
//           // Remove the item if count is 0
//           state.items = state.items.filter(
//             (item) =>
//               !(
//                 item.id === action.payload.id &&
//                 item.doughType === action.payload.doughType &&
//                 item.size === action.payload.size
//               )
//           );
//         }
//       }

//       // Recalculate the total price
//       state.totalPrice = state.items.reduce((sum, obj) => {
//         return sum + obj.price * obj.count;
//       }, 0);
//     },

//     // removeItem: (state, action: PayloadAction<number>) => {
//     //   state.items = state.items.filter((item) => item.id !== action.payload);
//     // },
//     removeItem: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },

//     clearItems: (state) => {
//       state.items = [];
//       state.totalPrice = 0;
//     },
//   },
// });

// export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";

// Define types
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

export interface CartSliceState {
  items: CartItem[];
  totalPrice: number;
}

// Initial state
const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        item: CartItem;
        currency: keyof CartItem["prices"];
      }>
    ) => {
      const { item, currency } = action.payload;
      const findItem = state.items.find(
        (obj) =>
          obj.id === item.id &&
          obj.doughTypes["ru"][0] === item.doughTypes["ru"][0] && // Adjust based on the selected language
          obj.sizes[0] === item.sizes[0]
      );

      if (findItem) {
        ++findItem.count;
      } else {
        state.items.push({
          ...item,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items, currency);
    },
    minusItem: (
      state,
      action: PayloadAction<{
        item: CartItem;
        currency: keyof CartItem["prices"];
      }>
    ) => {
      const { item, currency } = action.payload;
      const findItem = state.items.find(
        (obj) =>
          obj.id === item.id &&
          obj.doughTypes["ru"][0] === item.doughTypes["ru"][0] && // Adjust based on the selected language
          obj.sizes[0] === item.sizes[0]
      );

      if (findItem) {
        --findItem.count;
        if (findItem.count <= 0) {
          state.items = state.items.filter((obj) => obj.id !== findItem.id);
        }
      }

      state.totalPrice = calcTotalPrice(state.items, currency);
    },
    removeItem: (
      state,
      action: PayloadAction<{
        itemId: string;
        currency: keyof CartItem["prices"];
      }>
    ) => {
      const { itemId, currency } = action.payload;
      state.items = state.items.filter((obj) => obj.id !== itemId);

      state.totalPrice = calcTotalPrice(state.items, currency);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
