import styled from 'styled-components';

import { Palette } from '../../palette';
import { SCALES } from '../../utils/constants';

export const StyledPagination = styled.div`
  min-width: 470px;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 10px;

  .pagination-btn {
    cursor: pointer;
    min-height: 32px;
    width: 100px;
    border-radius: ${SCALES.borderRadius};
  }

  .pagination-btn:hover:not(:disabled) {
    background: ${Palette.greyLight};
  }

  .pagination-btn:disabled {
    cursor: not-allowed;
  }

  .page-select {
    width: 70px;
    cursor: pointer;
  }

  .page-size-select {
    cursor: pointer;
  }
`;
