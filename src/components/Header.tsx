import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import logoSvg from "../assets/img/pizza-logo.svg";
import Search from "./Search";
import { useEffect, useRef } from "react";

import { selectCart } from "../redux/slices/cart/selectors";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const Header: React.FC = () => {
  const { items, totalPrice } = useSelector(selectCart);
  const location = useLocation();
  const isMounted = useRef(false);

  // Calculate the total number of items
  const totalItemsCount = items.reduce(
    (sum: number, item) => sum + item.count,
    0
  );

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <Link to={"/"}>
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца :)</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          {/* Hide the shopping cart part in the header if we're already in the 'cart' section */}
          {location.pathname !== "/cart" && (
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <ShoppingCartIcon
                height={18}
                style={{ transform: "scaleX(-1)", marginBottom: "-2px" }}
              />
              <span>{totalItemsCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
