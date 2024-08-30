import React from "react";

interface CategoriesProps {
  chosenCategoryId: number;
  onChangeCategory: (i: number) => void;
}

const pizzaCategories = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ chosenCategoryId, onChangeCategory }) => {
    return (
      <div className="categories">
        <ul>
          {pizzaCategories.map((categoryName, idx) => (
            <li
              key={idx}
              className={chosenCategoryId === idx ? "active" : ""}
              onClick={() => onChangeCategory(idx)}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
