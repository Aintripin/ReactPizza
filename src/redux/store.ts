import { configureStore } from "@reduxjs/toolkit";
import setCategoryId from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    filter: setCategoryId,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
