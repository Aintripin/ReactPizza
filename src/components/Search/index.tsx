import React from "react";
import { SearchContext } from "../../App";
import styles from "./Search.module.scss";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  return (
    <div className={styles.root}>
      <MagnifyingGlassIcon className={styles.icon_magnifyingGlass} />
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
        placeholder="Поиск Пиццы..."
        type="text"
      />
      {searchValue && (
        <XMarkIcon
          className={styles.icon_XMark}
          onClick={() => setSearchValue("")}
        />
      )}
    </div>
  );
};

export default Search;
