import React, { FC, KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { PageSizeList } from '../../utils/constants';
import Button from './button';
import { StyledPagination } from './styles';

interface PaginationProps {
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

  const handleGoToPageInput = (value: string) => {
    const page = value ? Number(value) - 1 : 0;
    gotoPage(page);
  };

  const selectPageSize = (value: number) => {
    setPageSize(value);
    gotoPage(0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === 'e' || e.key === '.') {
      e.preventDefault();
    }
  };

  return (
    <StyledPagination>
      <Button
        title="<<"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      />
      <Button
        title="<"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      />
      <Button title=">" onClick={() => nextPage()} disabled={!canNextPage} />
      <Button
        title=">>"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      />
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
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => handleGoToPageInput(e.target.value)}
        />
      </span>
      <select
        className="page-size-select"
        value={pageSize}
        onChange={(e) => selectPageSize(Number(e.target.value))}
      >
        {PageSizeList.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {t('defaultMenu.show')} {pageSize}
          </option>
        ))}
      </select>
    </StyledPagination>
  );
};

export default Pagination;
