import React from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const pizzaCategories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {pizzaCategories.map((pizzaObj, idx) => (
          <li
            key={idx}
            className={activeIndex === idx ? "active" : ""}
            onClick={() => setActiveIndex(idx)}
          >
            {pizzaObj}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
