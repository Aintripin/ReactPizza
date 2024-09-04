import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlusIcon from "../../SVGs/PlusIcon";
import { addItem } from "../../redux/slices/cart/slice";
import { selectCartItemById } from "../../redux/slices/cart/selectors";
import { CartItem } from "../../redux/slices/pizza/types";



interface PizzaBlockProps extends CartItem {}

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  imageUrl,
  title,
                                                 doughTypes,
  sizes,
  prices,
  category,
  rating,
  description,
}: PizzaBlockProps) => {

  // ! temporary stuff that's finna get removed
  const selectedLanguage = "ru"
  const selectedCurrency = "rubles"; // or "dollars" / "euros"
  const selectedSize = "26"; // or "30" / "40"
  const price = prices[selectedCurrency]?.[selectedSize];
  // !


  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  const [doughType, setDoughType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      imageUrl,
      title,
      doughTypes,
      sizes,
      prices,
      category,
      rating,
      description,
      count: 1
    };
    const selectedCurrency = "rubles"

    // dispatch(addItem(item, currency: selectedCurrency));

    dispatch(addItem({ item, currency: selectedCurrency }));

  };




  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />

          <h4 className="pizza-block__title">
            {/*{title ? title : "Чизбургер-пицца"}*/}
            {title[selectedLanguage] ? title[selectedLanguage] : "Чизбургер-пицца"}
          </h4>
        </Link>
        <div className="pizza-block__selector">
          {/*<ul>*/}
          {/*  {doughTypes.map((type, idx) => (*/}
          {/*    <li*/}
          {/*      key={idx}*/}
          {/*      className={doughType === idx ? "active" : ""}*/}
          {/*      onClick={() => setDoughType(idx)}*/}
          {/*    >*/}
          {/*      {type === 0 ? "тонкое" : "традиционное"}*/}
          {/*    </li>*/}
          {/*  ))}*/}
          {/*</ul>*/}
          <ul>
            {doughTypes[selectedLanguage].map((type, idx) => (
                <li
                    key={idx}
                    className={doughType === idx ? "active" : ""}
                    onClick={() => setDoughType(idx)}
                >
                  {type}
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
