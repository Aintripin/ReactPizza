import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem, FetchPizzasParams } from "./types";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params: FetchPizzasParams, thunkAPI) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<CartItem[]>(
      `https://66b082be6a693a95b538f92c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue("Пиццы Пустые");
    }

    return thunkAPI.fulfillWithValue(data as CartItem[]);
  }
);
