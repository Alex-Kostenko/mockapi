import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PAGE_SIZE_LIST } from '../../utils/constants';
import { StyledPagination } from './styles';

interface PaginationProps {
  handleDefaultParams: () => void;
  canPreviousPage: boolean;
  previousPage: () => void;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  pageOptions: number[];
  pageSize: number;
  nextPage: () => void;
  setPageSize: (pageSize: number) => void;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
}

const Pagination: FC<PaginationProps> = ({
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
  const { t } = useTranslation();

  const handleGoToStartPage = () => {
    gotoPage(0);
    handleDefaultParams();
  };

  const handlePreviousPage = () => {
    previousPage();
    handleDefaultParams();
  };
  const handleNextPage = () => {
    nextPage();
    handleDefaultParams();
  };

  const handleGoToEndPage = () => {
    gotoPage(pageCount - 1);
    handleDefaultParams();
  };

  const handleGoToPageInput = (value: string) => {
    const page = value ? Number(value) - 1 : 0;
    gotoPage(page);
  };

  const handlePageSizeSelect = (value: string) => {
    setPageSize(Number(value));
    handleDefaultParams();
  };

  return (
    <StyledPagination>
      <button
        className="pagination-btn"
        onClick={handleGoToStartPage}
        disabled={!canPreviousPage}
      >
        {'<<'}
      </button>
      <button
        className="pagination-btn"
        onClick={handlePreviousPage}
        disabled={!canPreviousPage}
      >
        {'<'}
      </button>
      <button
        className="pagination-btn"
        onClick={handleNextPage}
        disabled={!canNextPage}
      >
        {'>'}
      </button>
      <button
        className="pagination-btn"
        onClick={handleGoToEndPage}
        disabled={!canNextPage}
      >
        {'>>'}
      </button>
      <span>
        {t('defaultMenu.page')}
        <strong>
          {pageIndex + 1} {t('defaultMenu.of')} {pageOptions.length}
        </strong>
      </span>
      <span>
        | {t('defaultMenu.goToPage')}:{'  '}
        <input
          min={0}
          max={pageCount}
          type="number"
          className="page-select"
          defaultValue={pageIndex + 1}
          onChange={(e) => handleGoToPageInput(e.target.value)}
        />
      </span>
      <select
        className="page-size-select"
        value={pageSize}
        onChange={(e) => handlePageSizeSelect(e.target.value)}
      >
        {PAGE_SIZE_LIST.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {t('defaultMenu.show')} {pageSize}
          </option>
        ))}
      </select>
    </StyledPagination>
  );
};

export default Pagination;
