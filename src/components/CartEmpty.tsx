import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, Вы ещё не заказывали пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейдите на{" "}
        <Link to="/">
          <b>Главную Страницу</b>
        </Link>{" "}
        .
      </p>
      <img src="../../public/cart_imgs/emptyCart.png" alt="Empty Cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
