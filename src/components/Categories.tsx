import React from "react";

// import { useWhyDidYouUpdate } from "ahooks";

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
    // const [activeIndex, setActiveIndex] = React.useState<number>(0);

    // ? don't need this nomo'
    // useWhyDidYouUpdate("Categories", { chosenCategoryId, onChangeCategory });

    return (
      <div className="categories">
        <ul>
          {pizzaCategories.map((categoryName, idx) => (
            <li
              key={idx}
              className={chosenCategoryId === idx ? "active" : ""}
              // className="active"
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
