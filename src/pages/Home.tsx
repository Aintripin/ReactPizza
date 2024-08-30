import React, { useState } from "react";
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

// ! types or whatever else is here:
// import { PizzaItem } from "../App";
import { sortList } from "../components/Sort";
import { AppDispatch } from "../redux/store";
import { selectFilter } from "../redux/slices/filter/selectors";
import { selectPizzaData } from "../redux/slices/pizza/selectors";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filter/slice";
import { fetchPizzas } from "../redux/slices/pizza/asyncActions";
import { CartItem, FetchPizzasParams } from "../redux/slices/pizza/types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isSearch = React.useRef<boolean>(false);
  const isMounted = React.useRef<boolean>(false);

  // extracting pizzas from Redux
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onChangeCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch]
  );

  const onChangePage = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const getPizzas = async () => {
    setIsLoading(true);

    console.log("sort.sortProperty: ", sort.sortProperty);

    const sortBy = sort?.sortProperty?.sortProperty?.replace("-", "");
    // const sortBy = sort?.sortProperty?.replace("-", "");
    const order = sort?.sortProperty?.sortProperty?.includes("-")
      ? "asc"
      : "desc";
    // const order = sort?.sortProperty?.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "1";
    const search = searchValue ? `&search=${searchValue}` : "";

    // TODO: Ensure sort.sortProperty is an object with a sortProperty key
    // const sortProperty = sort.sortProperty as { sortProperty: string };
    // const sortBy = sortProperty?.sortProperty?.replace("-", "");
    // const order = sortProperty?.sortProperty?.includes("-") ? "asc" : "desc";
    // const category = categoryId > 0 ? `category=${categoryId}` : "1";
    // const search = searchValue ? `&search=${searchValue}` : "";

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
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FetchPizzasParams;

      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: categoryId,
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );
      isSearch.current = true;
    }
  }, [categoryId, dispatch]);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort?.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((pizzaItem: CartItem) => (
    <PizzaBlock {...pizzaItem} key={pizzaItem.id} />
  ));
  console.log("pizzas: ", pizzas);

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
        />
        <Sort sort={sort} />
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
