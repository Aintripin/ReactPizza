import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import filterReducer from "./slices/filterSlice";
import filterReducer from "./slices/filter/slice";
// import cart from "./slices/cartSlice";
// import cartReducer from "./slices/cartSlice";
import cartReducer from "./slices/cart/slice";
// import pizzas from "./slices/pizzasSlice";
// import pizzasReducer from "./slices/pizzasSlice";
import pizzasReducer from "./slices/pizza/slice";

const rootReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
  pizzas: pizzasReducer,
});

export const store = configureStore({
  // reducer: { filter: filterReducer, cart, pizzas },
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
