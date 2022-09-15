import { FC } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/filter/slice";
import { RootState } from "../../redux/store";

import styles from "./Pagination.module.scss";

export const Pagination: FC = () => {
  const currentPage = useSelector(
    (state: RootState) => state.filter.currentPage
  );
  const dispatch = useDispatch();
  const onChangePage = (id: number) => {
    dispatch(setPage(id));
  };
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel="+"
      previousLabel="-"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
    />
  );
};
