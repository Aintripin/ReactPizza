import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// !
interface MyData {
  // ...
}

interface FetchPizzasParams {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
}

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params: FetchPizzasParams, thunkAPI) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://66b082be6a693a95b538f92c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue("Пиццы Пустые");
    }

    return thunkAPI.fulfillWithValue(data);
  }
);

// !

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
  items: CartItem[];
  status: string;
}

const initialState: CartState = {
  items: [],
  status: "loading", // isLoading: loading | success | error
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchPizzas.pending, (state) => {
        // console.log("pending");
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        // console.log(state, "E'thang A-Okay");
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        // console.log("Hol' up... Waita minute! Sum' ain't right!");
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export const selectPizzaData = (state) => state.pizzas;

export default pizzasSlice.reducer;
