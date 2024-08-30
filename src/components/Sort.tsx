import React, { useEffect, useRef, useState } from "react";
import styles from "../scss/Sort.module.scss";
import { useDispatch } from "react-redux";
import { Sort, SortPropertyEnum } from "../redux/slices/filter/types";
import { setSort } from "../redux/slices/filter/slice";
import ChevronDownIcon from "../SVGs/ChevronDownIcon";

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

interface SortPopupProps {
  sort: Sort;
}

export const sortList: SortItem[] = [
  { name: "популярности (DESC)", sortProperty: SortPropertyEnum.RATING_DESC },
  { name: "популярности (ASC)", sortProperty: SortPropertyEnum.RATING_ASC },
  { name: "цене (DESC)", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "цене (ASC)", sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: "алфавиту (DESC)", sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: "алфавиту (ASC)", sortProperty: SortPropertyEnum.TITLE_ASC },
];

const SortPopup: React.FC<SortPopupProps> = React.memo(({ sort }) => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <ChevronDownIcon className={open ? styles.rotate : ""} />
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((sortObject, idx) => (
              <li
                key={idx}
                onClick={() => onClickListItem(sortObject)}
                className={
                  sort.sortProperty === sortObject.sortProperty ? "active" : ""
                }
              >
                {sortObject.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
