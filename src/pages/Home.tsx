import React, { useEffect, useState } from "react";
import { PizzaItem, SearchContext } from "../App";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = useState<PizzaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [chosenSortOption, setChosenSortOption] = useState({
    optionName: "популярности",
    sortProperty: "rating",
  });

  console.log(categoryId, chosenSortOption.sortProperty);

  useEffect(() => {
    setIsLoading(true);

    const sortBy = chosenSortOption.sortProperty.replace("-", "");
    const order = chosenSortOption.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    setTimeout(() => {
      fetch(
        // `https://66b082be6a693a95b538f92c.mockapi.io/items?${
        //   categoryId > 0 ? `category=${categoryId}` : ""
        // }&sortBy=${chosenSortOption.sortProperty.replace(
        //   "-",
        //   ""
        // )}&order=${order}`
        `https://66b082be6a693a95b538f92c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
        .then((res) => res.json())
        .then((fetchedStuff) => {
          if (Array.isArray(fetchedStuff)) {
            setItems(fetchedStuff);
          } else {
            console.error("Unexpected response format:", fetchedStuff);
            setItems([]);
          }
          setIsLoading(false);
        });
      window.scrollTo(0, 0);
    }, 1000);
  }, [categoryId, chosenSortOption, searchValue, currentPage]);

  const skeletonPlaceholders = [...new Array(8)].map((_, idx) => (
    <PizzaSkeleton key={idx} />
  ));

  // const pizzas = items
  //   .filter((obj) => {
  //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   .map((pizzaItem: PizzaItem) => (
  //     <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
  //   ));

  const pizzas = items.map((pizzaItem: PizzaItem) => (
    <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
  ));

  return (
    <div className="container">
      {" "}
      <div className="content__top">
        <Categories
          chosenCategoryId={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
          // onClickCategory={setCategoryId}
        />
        <Sort
          chosenSortOption={chosenSortOption}
          onClickSortOption={(sortOptionObj) => {
            setChosenSortOption(sortOptionObj);
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletonPlaceholders : pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
