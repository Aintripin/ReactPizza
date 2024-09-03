// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { FilterSliceState, Sort, SortPropertyEnum } from "./types";

// const initialState: FilterSliceState = {
//   searchValue: "",
//   categoryId: 0,
//   currentPage: 1,
//   sort: {
//     name: "популярности (DESC)",
//     sortProperty: SortPropertyEnum.RATING_DESC,
//   },
// };

// const filterSlice = createSlice({
//   name: "filter",
//   initialState,
//   reducers: {
//     setCategoryId(state, action: PayloadAction<number>) {
//       state.categoryId = Number(action.payload);
//     },
//     setSearchValue(state, action: PayloadAction<string>) {
//       state.searchValue = action.payload;
//     },
//     setSort(state, action: PayloadAction<Sort>) {
//       state.sort = action.payload;
//     },
//     setCurrentPage(state, action: PayloadAction<number>) {
//       state.currentPage = action.payload;
//     },
//     // the value in the URL bar of the browser
//     // setFilters(state, action: PayloadAction<FilterSliceState>) {
//     //   if (Object.keys(action.payload).length) {
//     //     state.sort.sortProperty = action.payload.sort;
//     //     state.currentPage = Number(action.payload.currentPage);
//     //     state.categoryId = Number(action.payload.categoryId);
//     //   } else {
//     //     state.currentPage = 1;
//     //     state.categoryId = 0;
//     //     state.sort = {
//     //       name: SortPropertyEnum.RATING_DESC,
//     //     };
//     //   }
//     // },
//     setFilters(state, action: PayloadAction<FilterSliceState>) {
//       if (Object.keys(action.payload).length) {
//         state.sort.sortProperty = action.payload.sort.sortProperty;
//         state.currentPage = Number(action.payload.currentPage);
//         state.categoryId = Number(action.payload.categoryId);
//       } else {
//         state.currentPage = 1;
//         state.categoryId = 0;
//         state.sort = {
//           name: SortPropertyEnum.RATING_DESC,
//           sortProperty: SortPropertyEnum.RATING_DESC,
//         };
//       }
//     },
//   },
// });

// export const {
//   setCategoryId,
//   setSort,
//   setCurrentPage,
//   setFilters,
//   setSearchValue,
// } = filterSlice.actions;

// export default filterSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Sort {
  name: string;
  sortProperty: string;
}

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
  language: "ru" | "en"; // Add language support
  currency: "rubles" | "dollars" | "euros"; // Add currency support
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  language: "ru",
  currency: "rubles",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setLanguage: (state, action: PayloadAction<"ru" | "en">) => {
      state.language = action.payload;
    },
    setCurrency: (
      state,
      action: PayloadAction<"rubles" | "dollars" | "euros">
    ) => {
      state.currency = action.payload;
    },
  },
});

export const {
  setSearchValue,
  setCategoryId,
  setCurrentPage,
  setSort,
  setLanguage,
  setCurrency,
} = filterSlice.actions;

export default filterSlice.reducer;
