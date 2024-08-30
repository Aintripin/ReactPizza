import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
import { Outlet, Route, Routes } from "react-router-dom";
// import Cart from "./pages/Cart";
import { useSelector } from "react-redux";
import { selectSearchValue } from "./redux/slices/filterSlice";
// import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";
import React from "react";

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
  // const [searchValue, setSearchValue] = useState("");

  const searchValue = useSelector(selectSearchValue);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home searchValue={searchValue} />} />
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
