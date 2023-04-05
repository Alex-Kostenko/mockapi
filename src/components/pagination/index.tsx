import React, { FC } from 'react';
import { StyledPagination } from './styles';

interface Props {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  handleDefaultParams: () => void;
  canPreviousPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  pageOptions: number[];
  setPageSize: (pageSize: number) => void;
  pageSize: number;
}

const Pagination: FC<Props> = ({
  gotoPage,
  handleDefaultParams,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
  setPageSize,
  pageSize,
}) => {
  const pageSizeList = [5, 10, 20];

  return (
    <StyledPagination>
      <button
        onClick={() => {
          gotoPage(0);
          handleDefaultParams();
        }}
        disabled={!canPreviousPage}
      >
        {'<<'}
      </button>{' '}
      <button
        onClick={() => {
          previousPage();
          handleDefaultParams();
        }}
        disabled={!canPreviousPage}
      >
        {'<'}
      </button>{' '}
      <button
        onClick={() => {
          nextPage();
          handleDefaultParams();
        }}
        disabled={!canNextPage}
      >
        {'>'}
      </button>{' '}
      <button
        onClick={() => {
          gotoPage(pageCount - 1);
          handleDefaultParams();
        }}
        disabled={!canNextPage}
      >
        {'>>'}
      </button>
      {'  '}
      <span>
        Page
        <strong>
          {' '}
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </span>{' '}
      <span>
        | Go to page:{'  '}
        <input
          min={0}
          max={pageCount}
          type="number"
          className="page-select"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
        />
      </span>{' '}
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          handleDefaultParams();
        }}
      >
        {pageSizeList.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </StyledPagination>
  );
};

export default Pagination;
