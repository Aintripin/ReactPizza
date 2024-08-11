import { useState } from "react";
import styles from "../scss/Sort.module.scss";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);

  const [open, setOpen] = useState<boolean>(false);
  // const [optionActive, setOptionActive] = useState<number>(0);
  // const sortByOptions = ["популярности", "цене", "алфавиту"];
  const sortByOptions = [
    { optionName: "популярности (DESC)", sortProperty: "rating" },
    { optionName: "популярности (ASC)", sortProperty: "-rating" },
    { optionName: "цене (DESC)", sortProperty: "price" },
    { optionName: "цене (ASC)", sortProperty: "-price" },
    { optionName: "алфавиту (DESC)", sortProperty: "title" },
    { optionName: "алфавиту (ASC)", sortProperty: "-title" },
  ];

  // const sortByDisplay = sortByOptions[optionActive];
  // const sortByDisplay = sortByOptions[chosenSortOption].optionName;
  // const sortByDisplay =
  //   sortByOptions.find((option) => option.sortProperty === chosenSortOption)
  //     ?.optionName || "популярности";

  const handleOptionPick = (sortObject) => {
    // setOptionActive(idx);
    onClickSortOption(sortObject);
    setOpen(false);
  };

  const onCliclListItem = (obj) => {
    dispatch(setSort);
    setOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={open ? styles.rotate : ""}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.optionName}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortByOptions.map((sortObject, idx) => (
              <li
                key={idx}
                onClick={() => handleOptionPick(sortObject)}
                // onClick={() => onClickSortOption(sortByOptions[idx])}
                className={
                  sort.sortProperty === sortObject.sortProperty ? "active" : ""
                }
              >
                {sortObject.optionName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
