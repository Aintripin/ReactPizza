import React, { useEffect, useState } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// ?
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
// ?

// import {selectFilter}
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import axios from "axios";
import { SearchContext } from "../App";

// ! types or whatever else is here:
import { PizzaItem } from "../App";
import { sortList } from "../components/Sort";
import { RootState } from "../redux/store";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categoryId, sort, currentPage } = useSelector(
    (state: RootState) => state.filter
  );

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = useState<PizzaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(setFilters({ ...params, sort }));
    }
  }, []);

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sort?.sortProperty?.replace("-", "");
    const order = sort?.sortProperty?.includes("-") ? "asc" : "desc";
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
  }, [categoryId, sort?.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortPropery: sort.sortProperty,
      categoryId,
      currentPage,
    });

    navigate(`?${queryString}`);
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = items.map((pizzaItem: PizzaItem) => (
    <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
  ));

  const skeletonPlaceholders = [...new Array(8)].map((_, idx) => (
    <PizzaSkeleton key={idx} />
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
