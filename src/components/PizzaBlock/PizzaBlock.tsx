import { useState } from "react";
import { PizzaItem } from "../../App";

// interface PizzaBlockProps extends Omit<PizzaItem, "id"> {
//   //   title?: string;
//   //   price?: number;
//   //   imageUrl: string;
//   //   sizes: number[];
//   //   types: number[];
// }

interface PizzaBlockProps
  extends Omit<PizzaItem, "id" | "title">,
    Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  title: string;
  id: number;
}

// interface PizzaBlockProps
//   extends Omit<PizzaItem, "id" | "title">,
//     React.HTMLAttributes<HTMLDivElement> {
//   title: string;
// }

// interface PizzaBlockProps
//   extends Omit<PizzaItem, "id">,
//     React.HTMLAttributes<HTMLDivElement> {}

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  title,
  price,
  imageUrl,
  sizes,
  types,
}: PizzaBlockProps) => {
  const [pizzaCount, setPizzaCount] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);
  const [doughType, setDoughType] = useState<number>(0);

  const addPizza = () => {
    setPizzaCount(pizzaCount + 1);
  };

  //   console.log(imageUrl);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">
          {title ? title : "Чизбургер-пицца"}
        </h4>
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
            onClick={addPizza}
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
            <i>{pizzaCount}</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
