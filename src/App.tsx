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

export const SearchContext = React.createContext();

console.log(SearchContext);

const App = () => {
  const [searchValue, setSearchValue] = useState("");

  // console.log(typeof pizzas[0].imageUrl);

  // const [items, setItems] = useState<PizzaItem[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   fetch("https://66b082be6a693a95b538f92c.mockapi.io/items")
  //     .then((res) => res.json())
  //     .then((fetchedStuff) => {
  //       setItems(fetchedStuff);
  //       setIsLoading(false);
  //     });
  // }, []);

  // console.log(items);

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        {/* <Header searchValue={searchValue} setSearchValue={setSearchValue} /> */}
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <div className="content__top">
            <Categories />
            {Sort()}
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items"> */}
          {/* {isLoading
              ? [...new Array(8)].map((_, idx) => <PizzaSkeleton key={idx} />)
              : items.map((pizzaItem: PizzaItem) => (
                  <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
                ))} */}
          {/* {items.map((pizzaItem: PizzaItem) => (
              <PizzaSkeleton key={pizzaItem.id} {...pizzaItem} />
            ))} */}
          {/* {items.map((pizzaItem: PizzaItem) => (
              <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
            ))} */}
          {/* {pizzas.map((pizzaObj, idx) => (
              <PizzaBlock
                key={idx}
                {...pizzaObj}
                // key={idx}
                // imageUrl={pizzaObj.imageUrl}
                // title={pizzaObj.title}
                // types={pizzaObj.types}
                // sizes={pizzaObj.sizes}
                // price={pizzaObj.price}
                // category={pizzaObj.category}
                // rating={pizzaObj.rating}
              />
            ))} */}
          {/* <PizzaBlock title="Мексиканская" price="345" />
            {PizzaBlock({
              title: "BBQ",
              price: "449",
            })}
            <PizzaBlock />
            <PizzaBlock /> */}
          {/* </div> */}
        </div>
      </SearchContext.Provider>
    </div>
  );
};

export default App;
