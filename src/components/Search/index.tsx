import React from "react";
import { SearchContext } from "../../App";
import styles from "./Search.module.scss";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "../../customHooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchValue,
  setSearchValue,
} from "../../redux/slices/filterSlice";

const Search = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchValue);
  // console.log("searchValue :", searchValue);
  // const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const [value, setValue] = React.useState<string>(searchValue); // local state for the search value
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setValue("");
    // setSearchValue("");
    dispatch(setSearchValue(""));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const debouncedUpdateSearchValue = useDebounce((newValue: string) => {
    dispatch(setSearchValue(newValue));
  }, 500);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedUpdateSearchValue(newValue);
  };

  return (
    <div className={styles.root}>
      <MagnifyingGlassIcon className={styles.icon_magnifyingGlass} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск Пиццы..."
        type="text"
      />
      {searchValue && (
        <XMarkIcon
          className={styles.icon_XMark}
          onClick={() => onClickClear()}
        />
      )}
    </div>
  );
};

export default Search;
