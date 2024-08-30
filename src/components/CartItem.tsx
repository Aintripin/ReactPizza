import { useDispatch } from "react-redux";

// heroicons
import { PlusIcon } from "@heroicons/react/24/outline";
// import { MinusIcon } from "@heroicons/react/24/outline";
// import { MinusIcon } from "@heroicons/react/16/solid";
import { MinusIcon } from "@heroicons/react/24/solid";

import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

// ? Styles:
import styles from "./styles/CartItem.module.scss";
import { addItem, minusItem, removeItem } from "../redux/slices/cart/slice";

interface CartItemProps {
  item: {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
  };
}

const CartItemBlock: React.FC<CartItemProps> = ({ item }) => {
  // console.log("item count: ", item.count);

  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        imageUrl: item.imageUrl,
        type: item.type,
        size: item.size,
        count: item.count,
      })
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem(item));
  };

  const onClickRemove = () => {
    if (
      window.confirm(
        "Trooper, are you really ready to discharge this pizza from active duty?!"
      )
    )
      dispatch(removeItem(item.id));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={item.imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{item?.title}</h3>
        <p>
          {`${item.type} тесто, `}
          {`${item.size} см. `}
        </p>
      </div>
      <div className="cart__item-count">
        <button
          disabled={item.count === 1}
          onClick={onClickMinus}
          className={clsx(
            "button button--outline button--circle cart__item-count-minus",
            { [styles.cartItemCountMinusDisabled]: item.count === 1 }
          )}
          // style={{
          //   background: "none",
          //   border: "none",
          //   padding: 0,
          //   display: "inline-block",
          //   margin: 0,
          // }}
        >
          <span>
            {/* – */}
            <MinusIcon
              style={{ fill: "#fe5f1e", width: "24px", height: "24px" }}
            />
          </span>
          {/* //? won't render? */}
        </button>
        <b>{item.count}</b>
        <div
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <PlusIcon />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{item?.price * item?.count} ₽</b>
      </div>
      <div
        className="cart__item-remove"
        style={{ transform: "rotate(45deg)" }}
        onClick={() => {}}
      >
        <div
          onClick={onClickRemove}
          className="button button--outline button--circle"
        >
          <XMarkIcon />
        </div>
      </div>
    </div>
  );
};

export default CartItemBlock;
