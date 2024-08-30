import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { RootState } from "../redux/store";
import CartEmpty from "../components/CartEmpty";
import { clearItems } from "../redux/slices/cart/slice";
import CartIcon from "../SVGs/CartIcon";
import ClearCartIcon from "../SVGs/ClearCartIcon";
import GoBackIcon from "../SVGs/GoBackIcon";

const Cart: React.FC = () => {
  const dispatch = useDispatch();

  // fetching all the pizzas from the state
  const { totalPrice, items } = useSelector((state: RootState) => state.cart);

  const onClickClear = () => {
    if (window.confirm("Yo, you really tryna wipe out the stash?")) {
      dispatch(clearItems());
    }
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.count, 0);

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <CartIcon />
            Корзина
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <ClearCartIcon />
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              {" "}
              Всего пицц: <b>{`${totalItemsCount} шт.`}</b>{" "}
            </span>
            <span>
              {" "}
              Сумма заказа: <b>{`${totalPrice} ₽`}</b>{" "}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <GoBackIcon />
              <GoBackIcon />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
