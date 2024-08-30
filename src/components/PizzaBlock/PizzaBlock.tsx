import { useState } from "react";
import { PizzaItem } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlusIcon from "../../SVGs/PlusIcon";
import { addItem } from "../../redux/slices/cart/slice";
import { selectCartItemById } from "../../redux/slices/cart/selectors";

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
            <PlusIcon />
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
