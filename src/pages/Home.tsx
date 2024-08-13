import React, { useEffect, useState } from "react";
import axios from "axios";
import { PizzaItem, SearchContext } from "../App";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = useState<PizzaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(
    (state: RootState) => state.filter
  );

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sort.sortProperty?.replace("-", "");
    const order = sort.sortProperty?.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    setTimeout(() => {
      axios
        .get(
          `https://66b082be6a693a95b538f92c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        .then((response) => {
          setItems(response.data);
          setIsLoading(false);
        });
      window.scrollTo(0, 0);
    }, 300);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeletonPlaceholders = [...new Array(8)].map((_, idx) => (
    <PizzaSkeleton key={idx} />
  ));

  const pizzas = items.map((pizzaItem: PizzaItem) => (
    <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
  ));

  return (
    <div className="container">
      {" "}
      <div className="content__top">
        <Categories
          chosenCategoryId={categoryId}
          onChangeCategory={onChangeCategory}
          // onClickCategory={setCategoryId}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletonPlaceholders : pizzas}
      </div>
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
};

export default Home;
