import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filter/slice";
import cartReducer from "./slices/cart/slice";
import pizzasReducer from "./slices/pizza/slice";

const rootReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
  pizzas: pizzasReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
