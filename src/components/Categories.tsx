import React from "react";

function Categories({ chosenCategoryId, onClickCategory }) {
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
        {pizzaCategories.map((categoryName, idx) => (
          <li
            key={idx}
            className={chosenCategoryId === idx ? "active" : ""}
            onClick={() => onClickCategory(idx)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
