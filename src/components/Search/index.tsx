import debounce from "lodash.debounce";
import { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSearch } from "../../redux/filter/slice";
import { RootState } from "../../redux/store";

import styles from "./Search.module.scss";

export const Search: FC = () => {
  const [value, setValue] = useState<string>("");

  const searchValue = useSelector(
    (state: RootState) => state.filter.searchValue
  );
  const dispatch = useDispatch();
  const setSearchValue = (search: string) => {
    dispatch(setSearch(search));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((str: string) => {
      setSearchValue(str);
    }, 250),
    []
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setValue("");
    setSearchValue("");
    inputRef.current.focus();
  };
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={value}
        onChange={onChangeInput}
      />
      {searchValue ? (
        <svg
          onClick={() => onClickClear()}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      ) : null}
    </div>
  );
};
