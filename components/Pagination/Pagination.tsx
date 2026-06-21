import ReactPaginate from "react-paginate";

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: Props) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={(e: { selected: number }) =>
        onPageChange(e.selected + 1)
      }
    />
  );
}