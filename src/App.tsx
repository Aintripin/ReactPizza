import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import React from "react";
import { selectSearchValue } from "./redux/slices/filter/selectors";

// i18:
import "./utils/i18n";
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

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

const Cart = React.lazy(() => import("./pages/Cart"));
const FullPizza = React.lazy(() => import("./pages/FullPizza"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const App = () => {
  const searchValue = useSelector(selectSearchValue);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* <Route path="" element={<Home searchValue={searchValue} />} /> */}
        <Route
          path=""
          element={
            <div>
              {t("welcomeMessage")}
              <Home searchValue={searchValue} />
            </div>
          }
        />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
