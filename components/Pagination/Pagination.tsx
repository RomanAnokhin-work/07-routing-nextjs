import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (pageNum: number) => void;
}

function Pagination({ page, totalPages, setPage }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}

export default Pagination;
