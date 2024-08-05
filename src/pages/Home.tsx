import { useEffect, useState } from "react";
import { PizzaItem } from "../App";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = useState<PizzaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://66b082be6a693a95b538f92c.mockapi.io/items")
      .then((res) => res.json())
      .then((fetchedStuff) => {
        setItems(fetchedStuff);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, idx) => <PizzaSkeleton key={idx} />)
          : items.map((pizzaItem: PizzaItem) => (
              <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
            ))}
      </div>
    </>
  );
};

export default Home;
