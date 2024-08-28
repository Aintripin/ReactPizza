import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { Sort } from "./filterSlice";

// !
interface MyData {
  // ...
}

// type FetchPizzasArgs = Record<string, string>;

// OR:
export interface FetchPizzasParams {
  // sortBy: Sort;
  sortBy: string;
  order: string;
  // category: string;
  category: number;
  search: string;
  currentPage: number;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

// export type SearchPizzaParams = {
//   sortBy: string;
//   order: string;
//   category: string;
//   search: string;
//   currentPage: number;
// };

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
  status: Status;
}

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
        // console.log("pending");
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        // console.log(state, "E'thang A-Okay");
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        // console.log("Hol' up... Waita minute! Sum' ain't right!");
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export const selectPizzaData = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;
