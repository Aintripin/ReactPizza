import { useEffect, useState } from "react";
import { PizzaItem } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCartItemById } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const typeNames = ["тонкое", "традиционное"];
const sizeNames = [26, 30, 40];

interface PizzaBlockProps
  extends Omit<PizzaItem, "id" | "title">,
    Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  title: string;
  id: number;
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}: PizzaBlockProps) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  useEffect(() => {
    // console.log("cartItem: ", cartItem);
  }, [cartItem]);

  const [doughType, setDoughType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[doughType],
      size: sizeNames[activeSize],
      count: 1,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />

          <h4 className="pizza-block__title">
            {title ? title : "Чизбургер-пицца"}
          </h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, idx) => (
              <li
                key={idx}
                className={doughType === idx ? "active" : ""}
                onClick={() => setDoughType(idx)}
              >
                {type === 0 ? "тонкое" : "традиционное"}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, idx) => (
              <li
                key={idx}
                className={activeSize === idx ? "active" : ""}
                onClick={() => {
                  setActiveSize(idx);
                }}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">
            от {price ? `${price} ₽` : "395 ₽"}
          </div>
          <button
            className="button button--outline button--add"
            onClick={onClickAdd}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
