import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";
import Sort from "./components/Sort";
import pizzas from "./assets/pizzas.json";
import React, { Children, useEffect, useState } from "react";
import PizzaSkeleton from "./components/PizzaBlock/Skeleton";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Outlet, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";
import { selectSearchValue } from "./redux/slices/filterSlice";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

export type PizzaItem = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

// export const SearchContext = React.createContext();

// console.log(SearchContext);

const App = () => {
  // const [searchValue, setSearchValue] = useState("");

  const searchValue = useSelector(selectSearchValue);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home searchValue={searchValue} />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
