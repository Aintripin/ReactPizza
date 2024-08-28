// default imports:
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types:
import { CartState, Status, CartItem } from "./types";

// asynchronous actions:
import { fetchPizzas } from "./asyncActions";

// actual code
const initialState: CartState = {
  items: [],
  status: Status.LOADING, // isLoading: loading | success | error
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
