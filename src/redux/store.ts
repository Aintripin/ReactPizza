import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizzas from "./slices/pizzasSlice";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  filter: filterReducer,
  cart,
  pizzas,
});

export const store = configureStore({
  // reducer: { filter: filterReducer, cart, pizzas },
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
