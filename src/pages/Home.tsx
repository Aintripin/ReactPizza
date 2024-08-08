import { useEffect, useState } from "react";
import { PizzaItem } from "../App";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = useState<PizzaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<number>(0);
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

    setTimeout(() => {
      fetch(
        // `https://66b082be6a693a95b538f92c.mockapi.io/items?${
        //   categoryId > 0 ? `category=${categoryId}` : ""
        // }&sortBy=${chosenSortOption.sortProperty.replace(
        //   "-",
        //   ""
        // )}&order=${order}`
        `https://66b082be6a693a95b538f92c.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
      )
        .then((res) => res.json())
        .then((fetchedStuff) => {
          setItems(fetchedStuff);
          setIsLoading(false);
        });
      window.scrollTo(0, 0);
    }, 1000);
  }, [categoryId, chosenSortOption]);

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
        {isLoading
          ? [...new Array(8)].map((_, idx) => <PizzaSkeleton key={idx} />)
          : items.map((pizzaItem: PizzaItem) => (
              <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
            ))}
      </div>
    </div>
  );
};

export default Home;
