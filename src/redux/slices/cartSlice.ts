import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string; // dough type: "тонкое" OR "традиционное"
  size: number;
  count: number;
};

interface CartState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      // console.log("Action Payload:", action.payload);
      // console.log("Current Items in State:", state.items);

      // const findItem = state.items.find((obj) => obj.id === action.payload.id);

      // console.log("adding item: ", state.items);

      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      // debugger;

      // state.items.map((item) => console.log(item.id));
      // state.items.map((item) => console.log("here's the item: ", item));

      if (findItem) {
        ++findItem.count;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      // console.log("adding item: ", findItem);

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    plusItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        ++findItem.count;
      }
    },
    // minusItem: (state, action: PayloadAction<number>) => {
    //   const findItem = state.items.find((obj) => obj.id === action.payload.id);

    //   if (findItem) {
    //     --findItem.count;
    //   }
    // },
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
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      // ? state.totalPrice = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, plusItem, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
