import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";
import Sort from "./components/Sort";
import pizzas from "./assets/pizzas.json";
import React, { useEffect, useState } from "react";
import PizzaSkeleton from "./components/PizzaBlock/Skeleton";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";
import { selectSearchValue } from "./redux/slices/filterSlice";

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
    <div className="wrapper">
      {/* <Header searchValue={searchValue} setSearchValue={setSearchValue} /> */}
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
