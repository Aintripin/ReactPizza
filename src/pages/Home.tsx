import React, { useEffect, useState } from "react";
import qs from "qs";

import axios from "axios";
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
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { SearchContext } from "../App";

// ! types or whatever else is here:
import { PizzaItem } from "../App";
import { sortList } from "../components/Sort";
import { RootState } from "../redux/store";
import {
  fetchPizzas,
  selectPizzaData,
  setItems,
} from "../redux/slices/pizzasSlice";
import { AppDispatch } from "../redux/store";
import CartEmpty from "../components/CartEmpty";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  // extracting pizzas from Redux
  // const { items, status } = useSelector((state) => state.pizzas);
  const { items, status } = useSelector(selectPizzaData);
  // const { categoryId, sort, currentPage } = useSelector(
  //   (state: RootState) => state.filter
  // );
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  // const { searchValue } = React.useContext(SearchContext);
  // const [items, setItems] = useState<PizzaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const getPizzas = async () => {
    setIsLoading(true);

    const sortBy = sort?.sortProperty?.replace("-", "");
    const order = sort?.sortProperty?.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    // await axios
    //   .get(
    //     `https://66b082be6a693a95b538f92c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    //   )
    //   .then((response) => {
    //     setItems(response.data);
    //     // console.log("FETCHED ITEMS:", response.data);
    //     setIsLoading(false);
    //   });

    // try {
    // const { data } = await axios.get(
    //   `https://66b082be6a693a95b538f92c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    // );
    // dispatch(setItems(data));

    // no need for the 'try/catch/finally/ block anymore as we're making a request to the API using 'fetchPizzas' that already handles all that logic
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );
    // } catch (err) {
    //   console.log("!ERROR!: ", err);
    // }
    // finally {
    //   setIsLoading(false);
    // }
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortPropery: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort?.sortProperty, searchValue, currentPage]);

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
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла Ошибка</h2>
          <p>Не удалось получить пиццы. Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletonPlaceholders : pizzas}
        </div>
      )}
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
};

export default Home;
