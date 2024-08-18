import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
  reducer: { filter: filterReducer, cart },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
